import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  textTop: {
    marginBottom: 5,
  },
});

const ExtraInfoItem = ({ name, info, noCount }) => {
  let formattedInfo = info;
  !noCount && formattedInfo > 1000
    ? (formattedInfo = (formattedInfo / 1000).toFixed(1) + 'k')
    : formattedInfo;
  return (
    <View>
      <Text textAlign='center' style={styles.textTop} fontWeight='bold'>
        {formattedInfo}
      </Text>
      <Text textAlign='center'>{name}</Text>
    </View>
  );
};

export default ExtraInfoItem;
