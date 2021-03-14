import React from 'react';
import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = () => {
  return (
    <Pressable>
      <Text type='tabTitle'>Repositories</Text>
    </Pressable>
  );
};

export default AppBarTab;
