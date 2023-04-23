import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Metrics from '../Helper/metrics';
import CountryCodePicker from 'react-native-country-picker-modal';
import colorConstant from '../constant/colorConstant';

export default function MobileInput(props) {
  const {
    style,
    placeholder = '',
    placeholderTextColor = 'gray',
    value = '',
    onChangeText,
    keyboardType,
    showRightIcon,
    handleImagePress,
    ih,
    iw,
    imageSource,
    hidePassword,
    countryCode,
    onSelect
  } = props;

  return (
    <View style={{flexDirection: 'row'}}>
      <CountryCodePicker
        containerButtonStyle={{
          marginTop: 5,
          justifyContent: 'center',
          backgroundColor: '#F9F5F1',
          height:Metrics.rfv(45),
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: colorConstant.LIGHT_MIDIUM_GREY,
        }}
        countryCode={countryCode}
        visible={false}
        withFlag={true}
        withCloseButton={true}
        withAlphaFilter={true}
        withCallingCode={true}
        withEmoji={true}
        withCallingCodeButton={true}
        withFilter={true}
        withModal={true}
        onSelect={onSelect}
      />
      {/* <TextInput
        style={{
          borderWidth: 1,
          flex: 1,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          borderColor: colorConstant.LIGHT_MIDIUM_GREY,
          marginTop: 5,
          justifyContent: 'center',
          backgroundColor: 'transparent',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        placeholder={placeholder}
        onChangeText={e => onChangeText(e)}
      /> */}
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
    paddingHorizontal: Metrics.rfv(15),
  },
  TextInputWithIcon: {
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
    paddingRight: Metrics.rfv(45),
  },
});
