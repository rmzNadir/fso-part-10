import React from 'react';
import { Link } from 'react-router-native';
import Text from './Text';

const AppBarTab = ({ title, to }) => {
  return (
    <Link to={to}>
      <Text type='tabTitle'>{title}</Text>
    </Link>
  );
};

export default AppBarTab;
