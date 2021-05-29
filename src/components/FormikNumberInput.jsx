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

const FormikNumberInput = ({ name, wrapperStyle, max, min, ...props }) => {
  const [focus, setFocus] = useState(false);
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const handleInputChange = (value) => {
    if ((min && +value < min) || (max && +value > max)) {
      return;
    }
    helpers.setValue(value);
  };

  return (
    <View style={wrapperStyle}>
      <TextInput
        onChangeText={(value) => handleInputChange(value.replace(/[^\d]/g, ''))}
        onBlur={() => {
          helpers.setTouched(true);
          setFocus(false);
        }}
        keyboardType='phone-pad'
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

export default FormikNumberInput;
