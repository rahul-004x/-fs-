import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../../utils/theme';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';


const styles = StyleSheet.create({
  separator: {
    height: theme.spacing.small,
    backgroundColor: theme.colors.separator,
  }
});

const RepositoryList = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

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

  const repositoryNodes = data && data.repositories
    ? data.repositories.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id || item.fullName} 
    />
  );
};

export default RepositoryList;