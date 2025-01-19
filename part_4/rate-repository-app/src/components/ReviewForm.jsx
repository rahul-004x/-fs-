import { View, StyleSheet, Pressable, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';
import Text from './Text';
import theme from '../../utils/theme';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';

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
  submitError: {
    color: 'red',
    marginBottom: theme.spacing.small,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.small,
    borderRadius: 4,
    alignItems: 'center',
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState('');

  const onSubmit = async (values) => {
    try {
      setSubmitError('');
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: parseInt(values.rating),
            text: values.text,
          },
        },
      });
      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      if (e.message.includes('does not exists')) {
        setSubmitError('Repository does not exist. Please check the owner and repository names.');
      } else {
        setSubmitError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <View>
            {submitError && <Text style={styles.submitError}>{submitError}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Repository owner name"
              value={values.ownerName}
              onChangeText={handleChange('ownerName')}
            />
            {touched.ownerName && errors.ownerName && (
              <Text style={styles.errorText}>{errors.ownerName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Repository name"
              value={values.repositoryName}
              onChangeText={handleChange('repositoryName')}
            />
            {touched.repositoryName && errors.repositoryName && (
              <Text style={styles.errorText}>{errors.repositoryName}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Rating (0-100)"
              value={values.rating}
              onChangeText={handleChange('rating')}
              keyboardType="numeric"
            />
            {touched.rating && errors.rating && (
              <Text style={styles.errorText}>{errors.rating}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Review"
              value={values.text}
              onChangeText={handleChange('text')}
              multiline
            />
            {touched.text && errors.text && (
              <Text style={styles.errorText}>{errors.text}</Text>
            )}

            <Pressable style={styles.button} onPress={handleSubmit}>
              <Text color="textSecondary" fontWeight="bold" style={{ color: 'white' }}>
                Create Review
              </Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;