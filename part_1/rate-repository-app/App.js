import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import Main from './components/main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {
  return (
    <NativeRouter future={{ v7_relativeSplatPath: true }}>
      <View style={styles.container}>
        <Main />
        <StatusBar style="auto" />
      </View>
    </NativeRouter>
  );
};

export default App;