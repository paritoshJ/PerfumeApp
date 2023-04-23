import React from 'react';
import {ScrollView, SafeAreaView, View, Text} from 'react-native';
import styles from './style';
import {Checkbox} from 'react-native-paper';

export default function CheckBoxSection(props) {
  return (
    <View style={styles.container}>
      <Checkbox.Android
        status={props.checked ? 'checked' : 'unchecked'}
        onPress={() => {
          props.setChecked(!props.checked);
        }}
        uncheckedColor={'#C8C8C8'}
        color={'#BC8B57'}
        theme={{colors: {primary: '#BC8B57'}}}
      />

      <Text style={props.labelStyle}>{props.label}</Text>
    </View>
  );
}
