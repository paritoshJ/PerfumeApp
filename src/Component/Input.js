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

export default function Input(props) {
  const {
    style,
    placeholder = '',
    placeholderTextColor = 'gray',
    value,
    onChangeText,
    keyboardType,
    showRightIcon,
    handleImagePress,
    ih,
    iw,
    imageSource,
    hidePassword,
    maxLength,
    editable,
    ref,
    onSubmitEditing
  } = props;

  return (
    <View>
      <TextInput
        style={[
          showRightIcon ? styles.TextInputWithIcon : styles.TextInput,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={e => onChangeText(e)}
        keyboardType={keyboardType}
        secureTextEntry={hidePassword}
        maxLength={maxLength}
        ref={ref}
        returnKeyType={"next"}
        // onSubmitEditing={e => { onSubmitEditing(e) }}
        editable={editable ?? true}
      />
      {showRightIcon && (
        <TouchableOpacity
          onPress={handleImagePress}
          style={{position: 'absolute', right: 20, bottom: 15}}>
          <Image
            resizeMode="contain"
            width={iw}
            height={ih}
            source={imageSource}
          />
        </TouchableOpacity>
      )}
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
