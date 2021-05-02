import React from 'react';
import { StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  badge: {
    backgroundColor: theme.colors.secondary,
    padding: theme.padding.s,
    borderRadius: theme.borderRadius.s,
    alignSelf: 'flex-start',
  },
});

const LanguageBadge = ({ language, style, ...props }) => {
  const BadgeStyle = [styles.badge, style];
  return (
    <Text style={BadgeStyle} {...props}>
      {language}
    </Text>
  );
};

export default LanguageBadge;
