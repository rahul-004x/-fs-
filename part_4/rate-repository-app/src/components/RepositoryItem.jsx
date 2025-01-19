import { View, Text, Image, StyleSheet, FlatList, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  contentContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    color: '#666',
    marginBottom: 5,
  },
  language: {
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: 5,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

const StatsItem = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text>{label}</Text>
  </View>
);

const RepositoryItem = ({ item, showGitHubButton }) => {
  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  const statsData = [
    { label: 'Stars', value: formatCount(item.stargazersCount) },
    { label: 'Forks', value: formatCount(item.forksCount) },
    { label: 'Reviews', value: item.reviewCount },
    { label: 'Rating', value: item.ratingAverage }
  ];

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <FlatList
          data={statsData}
          renderItem={({ item }) => <StatsItem label={item.label} value={item.value} />}
          keyExtractor={(item) => item.label}
          horizontal
          contentContainerStyle={{ justifyContent: 'space-around', width: '100%' }}
        />
      </View>
      {showGitHubButton && (
        <Pressable 
          style={styles.githubButton} 
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;