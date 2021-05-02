import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    borderColor: theme.colors.secondary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

const RatingCircle = ({ rating, style, ...props }) => {
  const circleStyle = [styles.circle, style];
  return (
    <View style={circleStyle} {...props}>
      <Text textAlign='center' fontWeight='bold' color='secondary'>
        {rating}
      </Text>
    </View>
  );
};

export default RatingCircle;
