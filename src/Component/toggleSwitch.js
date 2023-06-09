/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import fontConstant from '../constant/fontConstant';
import { COLORS_NEW } from '../Helper/colors.new';
import Metrics from '../Helper/metrics';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View  style={{marginTop: Metrics.rfv(20)}}>
      <View
        style={{
          height: 44,
          width: '100%',
          backgroundColor: COLORS_NEW.blue,
          borderRadius: getRoundCorner ? 5 : 0,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 1,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 1 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 5 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? 'white' : selectionColor,
              fontSize:16,
              fontFamily: fontConstant.gambetta,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == 2 ? selectionColor : 'white',
            borderRadius: getRoundCorner ? 5 : 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? 'white' : selectionColor,
              fontSize:16,
              fontFamily: fontConstant.gambetta,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
