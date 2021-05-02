import React from 'react';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import Text from './Text';
import theme from '../theme';
import RatingCircle from './RatingCircle';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.padding.ml,
  },
  top: {
    flexDirection: 'row',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  topInfo: {
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'column',
    flex: 1,
  },
  profilePicture: {
    padding: 5,
  },
  info: {
    marginBottom: 10,
  },
  username: {
    marginBottom: 5,
  },
});

const ReviewItem = ({ review }) => {
  const { user, createdAt, text, rating } = { ...review };
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <RatingCircle rating={rating} style={styles.profilePicture} />
        <View style={styles.topInfo}>
          <Text fontWeight='bold' style={styles.username}>
            {user.username}
          </Text>
          <Text style={styles.info} color='textSecondary'>
            {moment(createdAt).format('DD/MM/YYYY HH:mm a')}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
