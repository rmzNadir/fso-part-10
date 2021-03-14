import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.MainBackground,
    color: theme.colors.textPrimary,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <StatusBar style='auto' />
      <Switch>
        <Route exact path='/'>
          <RepositoryList />
        </Route>
        <Route exact path='/signIn'>
          <SignIn />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
