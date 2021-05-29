import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import FormikNumberInput from './FormikNumberInput';
import Button from './Button';
import theme from '../theme';
import { CREATE_REVIEW } from '../graphql/mutations';

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required!'),
  repositoryName: yup.string().required('Repository name is required!'),
  rating: yup
    .number()
    .min(0, 'Min rating for a repository is 0!')
    .max(100, 'Max rating for a repository is 100!')
    .required('Rating is required!'),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: undefined,
  text: '',
};

const NewReview = () => {
  const history = useHistory();
  const [mutate] = useMutation(CREATE_REVIEW, {
    onError: (e) => {
      console.error(e);
    },
  });

  const onSubmit = async (variables) => {
    const {
      data: {
        createReview: { repositoryId },
      },
    } = await mutate({
      variables: { ...variables, rating: +variables.rating },
    });
    history.push(`/repositories/${repositoryId}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name='ownerName'
            placeholder='Repository owner name'
            wrapperStyle={styles.input}
          />
          <FormikTextInput
            name='repositoryName'
            placeholder='Repository name'
            wrapperStyle={styles.input}
          />
          <FormikNumberInput
            name='rating'
            placeholder='Rating between 0 and 100'
            wrapperStyle={styles.input}
            min={0}
            max={100}
          />
          <FormikTextInput
            name='text'
            placeholder='Review'
            wrapperStyle={styles.input}
            multiline
          />
          <Button
            type='secondary'
            style={styles.submitButton}
            textStyle={styles.submitText}
            onPress={handleSubmit}
          >
            Create review
          </Button>
        </View>
      )}
    </Formik>
  );
};

export default NewReview;

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.ml,
  },
  input: {
    marginBottom: 15,
  },
  submitButton: {
    alignSelf: 'stretch',
  },
  submitText: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
  },
});
