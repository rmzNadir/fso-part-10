import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextPrimary: {
    color: theme.colors.textPrimary,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSecondary: {
    color: theme.colors.secondary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  tabTitle: {
    fontSize: theme.fontSizes.heading,
    padding: theme.padding.ml,
  },
  alignCenter: {
    textAlign: 'center',
  },
});

const Text = ({
  color,
  textAlign,
  type,
  fontSize,
  fontWeight,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    type === 'tabTitle' && styles.tabTitle,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textPrimary' && styles.colorTextPrimary,
    color === 'primary' && styles.colorPrimary,
    color === 'secondary' && styles.colorSecondary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    textAlign === 'center' && styles.alignCenter,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
