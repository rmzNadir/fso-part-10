import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

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

const SignIn = () => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required!'),
    password: yup.string().required('Password is required!'),
  });

  const onSubmit = (values) => {
    console.log('values', values);
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
