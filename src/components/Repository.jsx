import React from 'react';
import { useQuery } from '@apollo/client';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import Button from './Button';
import ReviewItem from './ReviewItem';

const { colors } = theme;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingBottom: theme.padding.s,
    marginBottom: theme.margin.m,
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
  separator: {
    height: 10,
  },
});

const RepositoryInfo = ({ repository }) => {
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

const ItemSeparator = () => <View style={styles.separator} />;

const Repository = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_REPOSITORY, { variables: { id } });
  const { repository } = { ...data };
  const { reviews } = { ...repository };

  const reviewsEdges = reviews ? reviews.edges.map((e) => e.node) : [];

  return (
    <FlatList
      data={reviewsEdges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default Repository;
