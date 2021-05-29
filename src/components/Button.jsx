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
  textSecondary: {
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
});

const Button = ({ children, type, style, textStyle, ...props }) => {
  const buttonStyle = [
    styles.button,
    type && type === 'secondary' && styles.secondary,
    style,
  ];

  const childrenStyle = [
    textStyle,
    type && type === 'secondary' && styles.textSecondary,
  ];

  return (
    <TouchableHighlight style={buttonStyle} underlayColor='#0ccccb' {...props}>
      <Text style={childrenStyle}>{children}</Text>
    </TouchableHighlight>
  );
};

export default Button;
