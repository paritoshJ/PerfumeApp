import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS_NEW} from '../Helper/colors.new';
import UIStepper from 'react-native-ui-stepper';
import colorConstant from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';

const UIStepperView = props => {
  return (
    <UIStepper
      displayValue
      backgroundColor={'#BC8B571A'}
      borderRadius={50}
      fontSize={16}
      width={100}
      height={40}
      onValueChange={value => {
        props.setValue(value);
      }}
      initialValue={props.value}
      maximumValue={10}
      minimumValue={props.minimumValue ?? 1}
      fontFamily={fontConstant.satoshi}
      value={props.value}
      borderColor="transparent"
      textColor="rebeccapurple"
      overrideTintColor
      tintColor={colorConstant.BLACK}
      decrementImage={require('./../assets/icon/ic_minus.png')}
      incrementImage={require('./../assets/icon/ic_plus.png')}
    />
  );
};

export default UIStepperView;
