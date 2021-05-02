import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import LanguageBadge from './LanguageBadge';
import ExtraInfoItem from './ExtraInfoItem';
import theme from '../theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.padding.ml,
  },
  top: {
    flexDirection: 'row',
    // borderWidth: 4,
    // borderColor: '#20232a',
  },
  bottom: {
    marginTop: 15,
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
    width: 50,
    height: 50,
    borderRadius: theme.borderRadius.m,
    padding: 5,
  },
  info: {
    marginBottom: 10,
  },
});

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    reviewCount,
    ratingAverage,
    ownerAvatarUrl,
  } = { ...item };

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Image style={styles.profilePicture} source={{ uri: ownerAvatarUrl }} />
        <View style={styles.topInfo}>
          <Text fontWeight='bold' style={styles.info} testID='repositoryTitle'>
            {fullName}
          </Text>
          <Text style={styles.info} testID='repositoryDescription'>
            {description}
          </Text>
          <LanguageBadge
            style={styles.info}
            language={language}
            testID='repositoryLang'
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <ExtraInfoItem
          name='Stars'
          info={stargazersCount}
          testID='repositoryStars'
        />
        <ExtraInfoItem
          name='Forks'
          info={forksCount}
          testID='repositoryForks'
        />
        <ExtraInfoItem
          name='Reviews'
          info={reviewCount}
          testID='repositoryReviews'
        />
        <ExtraInfoItem
          noCount
          name='Rating'
          info={ratingAverage}
          testID='repositoryRating'
        />
      </View>
    </View>
  );
};

export default RepositoryItem;
