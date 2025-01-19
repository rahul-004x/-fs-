import { useContext } from 'react';
import AuthStorageContext from '../context/authStorageContext';

const useAuthStorage = () => {
  return useContext(AuthStorageContext);
};

export default useAuthStorage;