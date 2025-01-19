import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { ME } from '../graphql/queries';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    borderColor: '#0366d6',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    color: '#586069',
    marginBottom: 5,
  },
  text: {
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#0366d6',
    marginRight: 10,
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const ReviewActions = ({ onView, onDelete }) => (
  <View style={styles.buttonContainer}>
    <Pressable style={[styles.button, styles.viewButton]} onPress={onView}>
      <Text style={styles.viewButtonText}>View repository</Text>
    </Pressable>
    <Pressable style={[styles.button, styles.deleteButton]} onPress={onDelete}>
      <Text style={styles.deleteButtonText}>Delete review</Text>
    </Pressable>
  </View>
);

const ReviewItem = ({ review, deleteReview, refetch }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: review.id } });
              refetch();
            } catch (e) {
              console.error(e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={{ color: '#0366d6', fontWeight: 'bold' }}>{review.rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.username}>{review.repository.fullName}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      <ReviewActions
        onView={() => navigate(`/repository/${review.repository.id}`)}
        onDelete={handleDelete}
      />
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const reviews = data?.me?.reviews?.edges || [];

  if (reviews.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text>No reviews found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews.map(edge => edge.node)}
      renderItem={({ item }) => (
        <ReviewItem review={item} deleteReview={deleteReview} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;