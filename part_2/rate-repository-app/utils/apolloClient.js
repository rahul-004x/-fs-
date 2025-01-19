import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
  });

  const httpLink = new HttpLink({ uri: 'http://192.168.139.85:4000/graphql' });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export default createApolloClient;