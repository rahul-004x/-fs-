import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

export const useSignOut = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  return async () => {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
  }
}