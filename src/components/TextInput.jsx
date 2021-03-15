import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    color: theme.colors.textPrimary,
    padding: theme.padding.ml,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: theme.borderRadius.s,
  },
  buttonFocus: {
    borderColor: theme.colors.secondary,
  },
});

const TextInput = ({ style, error, focus, ...props }) => {
  const textInputStyle = [styles.button, style, focus && styles.buttonFocus];

  return (
    <NativeTextInput
      placeholderTextColor={theme.colors.textSecondary}
      style={textInputStyle}
      {...props}
    />
  );
};

export default TextInput;
