import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client';
import Constants from 'expo-constants';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Main from './src/components/main';
import createApolloClient from './utils/apolloClient';
import AuthStorage from './src/hooks/authStorage';
import AuthStorageContext from './src/context/authStorageContext';

const authStorage = new AuthStorage()
const apolloClient = createApolloClient(authStorage)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  console.log(Constants.expoConfig.extra)
  return (
    <SafeAreaProvider>
      <NativeRouter future={{ v7_relativeSplatPath: true }}>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <View style={styles.container}>
              <Main />
              <StatusBar style="auto" />
            </View>
          </AuthStorageContext.Provider>
        </ApolloProvider>
      </NativeRouter>
    </SafeAreaProvider>
  );
};

export default App;