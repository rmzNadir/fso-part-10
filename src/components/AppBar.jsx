import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useHistory } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const history = useHistory();

  const { data } = useQuery(AUTHORIZED_USER);
  const { authorizedUser } = { ...data };

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/signIn');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab title='Repositories' to='/' />
        {authorizedUser && (
          <AppBarTab title='Create a review' to='/reviews/new' />
        )}
        {authorizedUser ? (
          <AppBarTab type='button' title='Sign out' onPress={onSignOut} />
        ) : (
          <AppBarTab title='Sign in' to='/signIn' />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
