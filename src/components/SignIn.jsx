import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import AuthStorage from '../utils/authStorage';

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

const SignIn = () => {
  const [signIn] = useSignIn();
  const authStorage = new AuthStorage();

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!'),
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      console.log('aT', await authStorage.getAccessToken());
    } catch (e) {
      console.log(e);
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
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
