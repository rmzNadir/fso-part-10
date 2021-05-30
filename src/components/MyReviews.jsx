import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import ReviewItem from './ReviewItem';
import useAuthorizedUser from '../hooks/useAuthorizedUser';
import Button from './Button';
import theme from '../theme';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  buttonArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    padding: 15,
  },

  button: {
    width: '48.5%',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderItem = ({ item, history, refetch }) => {
  const [mutate] = useMutation(DELETE_REVIEW, {
    onError: (e) => {
      console.error(e);
    },
  });

  const handleDeleteReview = async () => {
    const { data } = await mutate({
      variables: { id: item.id },
    });
    if (data.deleteReview) {
      await refetch();
    }
  };

  const handleAlert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: () => handleDeleteReview(),
        },
      ]
    );
  };
  return (
    <View>
      <ReviewItem review={item} myReview={true} />
      <View style={styles.buttonArea}>
        <Button
          type='secondary'
          style={styles.button}
          textStyle={styles.text}
          onPress={() => history.push(`/repositories/${item.repository.id}`)}
        >
          View repository
        </Button>
        <Button
          type='primary'
          style={styles.button}
          textStyle={styles.text}
          onPress={handleAlert}
        >
          Delete review
        </Button>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { fetchData, authorizedUser, fetchMore, refetch } =
    useAuthorizedUser(true);
  const history = useHistory();

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
      renderItem={({ item }) => (
        <RenderItem item={item} history={history} refetch={refetch} />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyReviews;
