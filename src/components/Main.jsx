import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

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

      <RepositoryList />
    </View>
  );
};

export default Main;
