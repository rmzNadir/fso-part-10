import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import NumberFormatter from '../utils/numberFormatter';

const styles = StyleSheet.create({
  textTop: {
    marginBottom: 5,
  },
});

const ExtraInfoItem = ({ name, info, noCount, ...props }) => {
  const content = noCount ? info : NumberFormatter(info);

  return (
    <View {...props}>
      <Text textAlign='center' style={styles.textTop} fontWeight='bold'>
        {content}
      </Text>
      <Text textAlign='center'>{name}</Text>
    </View>
  );
};

export default ExtraInfoItem;
