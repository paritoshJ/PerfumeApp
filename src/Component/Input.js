import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Metrics from '../Helper/metrics';

export default function Input(props) {
  const {
    style,
    placeholder = '',
    placeholderTextColor = 'gray',
    value = '',
    onChangeText,
  } = props;

  return (
    <View>
      <TextInput
        style={[styles.TextInput, style]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        // value={value}
        onChangeText={e => onChangeText(e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    backgroundColor: 'white',
    height: Metrics.rfv(45),
    width: '100%',
    borderRadius: Metrics.rfv(100),
    borderColor: '#EEEDE7',
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: 'black',
    paddingLeft: Metrics.rfv(15),
  },
});
