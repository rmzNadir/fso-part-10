import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
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

  const onSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            style={styles.input}
            name='username'
            placeholder='Username'
          />
          <FormikTextInput
            style={styles.input}
            secureTextEntry
            name='password'
            placeholder='Password'
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
