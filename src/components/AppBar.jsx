import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const { colors } = theme;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.primary,
    color: colors.textPrimary,
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab title='Repositories' to='/' />
      <AppBarTab title='SignIn' to='/signIn' />
    </View>
  );
};

export default AppBar;
