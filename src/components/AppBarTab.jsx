import React from 'react';
import { Link } from 'react-router-native';
import { TouchableHighlight } from 'react-native';
import Text from './Text';

const AppBarTab = ({ title, to, type, onPress }) => {
  switch (type) {
    case 'button':
      return (
        <TouchableHighlight onPress={onPress} underlayColor='#d73857'>
          <Text type='tabTitle'>{title}</Text>
        </TouchableHighlight>
      );
    default:
      return (
        <Link to={to} underlayColor='#d73857'>
          <Text type='tabTitle'>{title}</Text>
        </Link>
      );
  }
};

export default AppBarTab;
