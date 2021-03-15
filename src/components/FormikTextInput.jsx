import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.danger,
  },
});

const FormikTextInput = ({ name, wrapperStyle, ...props }) => {
  const [focus, setFocus] = useState(false);
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={wrapperStyle}>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => {
          helpers.setTouched(true);
          setFocus(false);
        }}
        onFocus={() => setFocus(true)}
        value={field.value}
        error={showError}
        focus={focus}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
