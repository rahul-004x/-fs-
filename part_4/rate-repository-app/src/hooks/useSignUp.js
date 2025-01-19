import { CREATE_USER } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import useSignIn from './useSignIn';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: {
          username,
          password
        }
      });
      
      if (data?.createUser) {
        await signIn({ username, password });
      }
      return data;
    } catch (error) {
      console.log('Signup error:', error.message);
      throw error;
    }
  };

  return [signUp, result];
};

export default useSignUp;
