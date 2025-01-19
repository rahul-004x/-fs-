import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../utils/theme';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.small,
    backgroundColor: theme.colors.separator,
  }
});

export const RepositoryListContainer = ({ repositories, onRepositoryPress }) => {
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => onRepositoryPress(item.id)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id || item.fullName} 
    />
  );
};

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  const navigate = useNavigate();
  
  const onRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    console.error('Error fetching repositories:', error);
    return (
      <View>
        <Text>Error fetching repositories</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return <RepositoryListContainer repositories={data?.repositories} onRepositoryPress={onRepositoryPress} />;
};

export default RepositoryList;