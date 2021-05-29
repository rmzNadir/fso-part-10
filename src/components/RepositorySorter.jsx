import React from 'react';
import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const RepositorySorter = ({ sortMode, setSortMode }) => {
  return (
    <Picker
      style={styles.picker}
      selectedValue={sortMode}
      dropdownIconColor='#FFFFFF'
      onValueChange={(itemValue) => setSortMode(itemValue)}
    >
      <Picker.Item label='Latest repositories' value='CREATEDAT' />
      <Picker.Item label='Highest rated repositories' value='RATING-DESC' />
      <Picker.Item label='Lowest rated repositories' value='RATING-ASC' />
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    color: '#fff',
    marginHorizontal: 10,
  },
});

export default RepositorySorter;
