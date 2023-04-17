/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {COLORS_NEW} from '../Helper/colors.new';
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
    <View>
      <View
        style={{
          height: 44,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 25,
          borderWidth: 1,
          borderColor: selectionColor,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 1,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor: COLORS_NEW.white,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: Metrics.rfv(10),
            width: '50%',
            alignItems: 'center',
            borderRightColor: COLORS_NEW.lightGray,
            borderRightWidth: 1,
          }}>
          <Text
            style={{
              color: COLORS_NEW.black,
            }}>
            {option1}
          </Text>
          <Image
            style={styles.navBarImage2}
            source={require('../../assets/wishlist-sort.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: COLORS_NEW.white,
            borderRadius: 25,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: Metrics.rfv(10),
            width: '50%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS_NEW.black,
            }}>
            {option2}
          </Text>
          <Image
            style={styles.navBarImage2}
            source={require('../../assets/wishlist-filters.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;

const styles = StyleSheet.create({
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
});
