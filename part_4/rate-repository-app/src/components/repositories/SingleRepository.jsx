import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../../graphql/queries';
import { StyleSheet, FlatList } from 'react-native';
import RepositoryItem from '../RepositoryItem';
import Review from './Review';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return null;

  const repository = data?.repository;

  return (
    <FlatList
      data={[repository]} // Change: Wrap repository in an array since we only need one item
      renderItem={() => <Review repositoryId={repository.id} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGitHubButton={true} />}
      style={styles.container}
    />
  );
};

export default SingleRepository;