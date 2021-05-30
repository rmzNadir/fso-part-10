import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ReviewItem from './ReviewItem';
import useAuthorizedUser from '../hooks/useAuthorizedUser';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { fetchData, authorizedUser, fetchMore } = useAuthorizedUser(true);

  // Needed for the workaround to this issue
  // https://github.com/apollographql/apollo-client/issues/6816#issuecomment-696988617

  useEffect(() => {
    fetchData();
  }, []);

  const { reviews } = { ...authorizedUser };

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} myReview={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReach={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

export default MyReviews;
