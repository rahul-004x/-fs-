import { StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useSignOut } from '../hooks/useSignOut';
import theme from '../../utils/theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingHorizontal: theme.spacing.medium,
    paddingBottom: theme.spacing.medium,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabText: {
    color: theme.colors.appBarText,
    paddingHorizontal: theme.spacing.small,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  tab: {
    paddingVertical: theme.spacing.small,
  }
});

const AppBar = () => {
  const { data, loading, error } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });
  const signOut = useSignOut();

  if (loading) return null;
  if (error) return null;

  const isAuthenticated = data?.me;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text fontWeight="bold" style={styles.tabText}>Repositories</Text>
        </Link>
        {isAuthenticated ? (
          <Pressable onPress={signOut} style={styles.tab}>
            <Text fontWeight="bold" style={styles.tabText}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable} style={styles.tab}>
            <Text fontWeight="bold" style={styles.tabText}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppBar;