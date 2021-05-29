import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { CREATE_USER } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    padding: theme.padding.ml,
  },
  button: {
    padding: theme.padding.ml,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    borderRadius: theme.borderRadius.s,
  },
  input: {
    marginBottom: 15,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required!')
    .min(1, 'Username must be at least 1 characters long')
    .max(30, 'Username must be less than 31 characters long'),
  password: yup
    .string()
    .required('Password is required!')
    .min(5, 'Password must be at least 5 characters long')
    .max(50, 'Password must be less than 51 characters long'),
  passwordConfirmation: yup
    .string()
    .required('Password is required!')
    .oneOf([yup.ref('password'), null], 'Passwords do not match!')
    .required('Password confirmation is required!'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

export const SignUp = () => {
  const [mutate] = useMutation(CREATE_USER, {
    onError: (e) => {
      console.error(e);
    },
  });
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await mutate({
      variables: { username, password },
    });

    try {
      const accessToken = await signIn({ username, password });

      accessToken && history.push('/');
    } catch (e) {
      console.error(e);
    }
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
            name='username'
            placeholder='Username'
            wrapperStyle={styles.input}
          />
          <FormikTextInput
            secureTextEntry
            name='password'
            placeholder='Password'
            wrapperStyle={styles.input}
          />
          <FormikTextInput
            secureTextEntry
            name='passwordConfirmation'
            placeholder='Password confirmation'
            wrapperStyle={styles.input}
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text>Sign up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
