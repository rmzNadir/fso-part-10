import React from 'react';
import { Route, Switch, Redirect } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Repository from './Repository';
import NewReview from './NewReview';
import MyReviews from './MyReviews';

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
      <StatusBar style='light' />
      <AppBar />

      <Switch>
        <Route exact path='/'>
          <RepositoryList />
        </Route>
        <Route exact path='/signIn'>
          <SignIn />
        </Route>
        <Route exact path='/signUp'>
          <SignUp />
        </Route>

        <Route exact path='/myReviews'>
          <MyReviews />
        </Route>

        <Route exact path='/reviews/new'>
          <NewReview />
        </Route>

        <Route exact path='/repositories/:id'>
          <Repository />
        </Route>

        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
