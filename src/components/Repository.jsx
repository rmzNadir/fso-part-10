import React from 'react';
import { useQuery } from '@apollo/client';
import { View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import Button from './Button';

const { colors } = theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: theme.padding.s,
  },
  button: {
    alignSelf: 'stretch',
    height: 60,
    margin: theme.margin.m,
  },
  text: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: 'bold',
  },
});

const Repository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, { variables: { id } });
  const { repository } = { ...data };

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Button
        type='secondary'
        style={styles.button}
        textStyle={styles.text}
        onPress={() => Linking.openURL(repository.url)}
      >
        Open in GitHub
      </Button>
    </View>
  );
};

export default Repository;
