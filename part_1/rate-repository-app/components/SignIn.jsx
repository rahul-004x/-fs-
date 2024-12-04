import { View, StyleSheet, Pressable, TextInput} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.separator,
    padding: theme.spacing.small,
    marginBottom: theme.spacing.small,
    borderRadius: 4,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
  errorText: {
    color: 'red',
    marginBottom: theme.spacing.small,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: 4,
    alignItems: 'center',
  },
});

const initialValues = {
  username: '',
  password: ''
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const Form = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <View>
          <TextInput 
            style={styles.input}
            placeholder='Username'
            value={values.username}
            onChangeText={handleChange('username')}
          />
          {touched.username && errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}
          
          <TextInput
            style={styles.input}
            placeholder='Password'
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="textSecondary" fontWeight="bold" style={{ color: 'white' }}>
              Sign In
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
};

export default SignIn;