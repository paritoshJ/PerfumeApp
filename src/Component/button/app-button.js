/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import {mergeAll, flatten} from 'ramda';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';

/**
 * This component is a HOC over the built-in React Native one.
 */

export function AppButton(props) {
  // grab the props
  const {
    preset = 'primary',
    textPreset,
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    txtPreset = buttonTextPresets.BASE_TEXT,
    children,
    isLoading = false,
    onPress = () => {},
    loaderColor = 'white',
    disabled,
    ...rest
  } = props;

  const viewStyle = mergeAll(
    flatten([
      viewPresets.BASE_VIEW,
      viewPresets[preset] || viewPresets.primary,
      styleOverride,
    ]),
  );
  const textStyle = mergeAll(
    flatten([
      buttonTextPresets.BASE_TEXT,
      buttonTextPresets[preset] || buttonTextPresets.primary,
      textStyleOverride,
    ]),
  );

  const content = isLoading ? (
    <ActivityIndicator color={COLORS_NEW[`${loaderColor}`]} size={'small'} />
  ) : (
    children || <Text style={textStyle}>{text ?? tx}</Text>
  );

  return (
    <TouchableOpacity
      disabled={!!disabled || !!isLoading}
      onPress={onPress}
      style={[viewStyle, {opacity: !!disabled || !!isLoading ? 0.5 : 1}]}
      {...rest}>
      {content}
    </TouchableOpacity>
  );
}

const viewPresets = StyleSheet.create({
  BASE_VIEW: {
    paddingVertical: Metrics.rfv(10),
    borderRadius: Metrics.rfv(25),
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Metrics.rfv(48),
  },
  primary: {
    backgroundColor: COLORS_NEW.blue,
  },
  secondary: {
    borderColor: COLORS_NEW.blue,
    backgroundColor: COLORS_NEW.white,
    borderWidth: Metrics.rfv(1),
  },
  tertiary: {
    backgroundColor: COLORS_NEW.skyBlue,
  },
  disable: {
    backgroundColor: COLORS_NEW.nonActiveButton,
  },
  link: {
    paddingVertical: Metrics.rfv(0),
    paddingHorizontal: Metrics.rfv(0),
    alignItems: 'flex-start',
  },
  secondary: {
    backgroundColor: COLORS_NEW.white,
    borderColor: COLORS_NEW.blue,
    borderWidth: Metrics.rfv(1),
  },
  touchable: {},
});

const buttonTextPresets = StyleSheet.create({
  BASE_TEXT: {
    fontSize: Metrics.rfv(18),
    fontWeight: '500',
  },
  primary: {
    color: COLORS_NEW.white,
  },
  secondary: {
    color: COLORS_NEW.blue,
  },
  tertiary: {
    color: COLORS_NEW.blue,
  },
  disable: {
    color: COLORS_NEW.white,
  },
  link: {
    // fontSize: FONT_SIZE.small,
    // fontFamily: FONTS.primaryFont,
    // ...preset_new.LINK_R_18,
    color: COLORS_NEW.blue,
    lineHeight: Metrics.rfv(18),
    paddingVertical: Metrics.rfv(0),
    paddingHorizontal: Metrics.rfv(0),
  },
  touchable: {},
});
