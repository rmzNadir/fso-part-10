import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

import theme from '../theme';

/*
    To do: 
    - Primary style
    - Dynamic underlay color
*/

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: theme.padding.ml,
    borderRadius: theme.borderRadius.s,
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  textSecondary: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  textPrimary: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
});

const Button = ({ children, type, style, textStyle, ...props }) => {
  const buttonStyle = [
    styles.button,
    type && type === 'secondary' && styles.secondary,
    type && type === 'primary' && styles.primary,
    style,
  ];

  const childrenStyle = [
    textStyle,
    type && type === 'secondary' && styles.textSecondary,
    type && type === 'primary' && styles.textPrimary,
  ];

  return (
    <TouchableHighlight
      style={buttonStyle}
      underlayColor={type === 'primary' ? '#d42d4e' : '#0ccccb'}
      {...props}
    >
      <Text style={childrenStyle}>{children}</Text>
    </TouchableHighlight>
  );
};

export default Button;
