import React from 'react';
import { Link } from 'react-router-native';
import { TouchableWithoutFeedback } from 'react-native';
import Text from './Text';

const AppBarTab = ({ title, to, type, onPress }) => {
  switch (type) {
    case 'button':
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          <Text type='tabTitle'>{title}</Text>
        </TouchableWithoutFeedback>
      );
    default:
      return (
        <Link to={to}>
          <Text type='tabTitle'>{title}</Text>
        </Link>
      );
  }
};

export default AppBarTab;
