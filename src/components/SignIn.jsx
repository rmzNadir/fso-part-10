import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

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

export const SignInForm = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!'),
  });

  const initialValues = {
    username: '',
    password: '',
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
            testID='usernameField'
          />
          <FormikTextInput
            secureTextEntry
            name='password'
            placeholder='Password'
            wrapperStyle={styles.input}
            testID='passwordField'
          />
          <Pressable
            onPress={handleSubmit}
            style={styles.button}
            testID='submitButton'
          >
            <Text>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const accessToken = await signIn({ username, password });

      accessToken && history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
