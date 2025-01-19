import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return {
    repositories: data?.repositories,
    loading,
    refetch,
  };
};

export default useRepositories;

// const [repositories, setRepositories] = useState();
// const [loading, setLoading] = useState(false);

// const fetchRepositories = async () => {
//   setLoading(true);

//   const response = await fetch('http://192.168.1.12:5000/api/repositories');
//   const json = await response.json();

//   setLoading(false);
//   setRepositories(json);
// };

// useEffect(() => {
//   fetchRepositories();
// }, []);