import React from 'react';
import { View, StyleSheet, Pressable, TextInput} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import theme from '../../utils/theme';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';  

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
  error: {
    color: "red",
    marginBottom: theme.spacing.small,
    textAlign: 'center',
  }
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '' 
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirm: yup.string() 
    .oneOf([yup.ref('password'), null], 'Passwords must match')  
    .required('Password confirmation is required')
})

const Form = ({ onSubmit, submitError }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <View>
          {submitError && <Text style={styles.error}>{submitError}</Text>}
          
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

          <TextInput
            style={styles.input}
            placeholder='Confirm password'
            value={values.passwordConfirm}  
            onChangeText={handleChange('passwordConfirm')}  
            secureTextEntry
          />
          {touched.passwordConfirm && errors.passwordConfirm && (  
            <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
          )}
          
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text color="textSecondary" fontWeight="bold" style={{ color: 'white' }}>
              Sign Up
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
}

const SignUpContainer = ({ onSubmit, submitError }) => {
  return (
    <View style={styles.container}>
      <Form onSubmit={onSubmit} submitError={submitError} />
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = React.useState('');

  const handleSubmit = async (values) => {
    const { username, password } = values;
    try {
      setSubmitError('');
      await signUp({ username, password });
      navigate('/');
    } catch (e) {
      if (e.message.includes('user.password must be at least 5 characters')) {
        setSubmitError('password must be at least 5 characters')
      } else if (e.message.includes('already taken')) {
        setSubmitError('Username already taken')
      } 
      else {
        setSubmitError('Something went wrong');
      }
    }
  };

  return <SignUpContainer onSubmit={handleSubmit} submitError={submitError} />;
};

export default SignUp;