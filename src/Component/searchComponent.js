/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {COLORS_NEW} from '../Helper/colors.new';
import Metrics from '../Helper/metrics';
import SearchBar from 'react-native-dynamic-search-bar';
const CustomSwitch = ({onSelectSwitch, selectionColor}) => {
  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View
      style={{marginHorizontal: Metrics.rfv(20), marginTop: Metrics.rfv(30)}}>
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
            backgroundColor: COLORS_NEW.white,
            justifyContent: 'space-around',
            marginVertical: Metrics.rfv(10),
            width: '80%',
            borderRightColor: COLORS_NEW.lightGray,
            borderRightWidth: 1,
          }}>
          <SearchBar
            placeholder="Search here"
            onPress={() => alert('onPress')}
            onChangeText={text => console.log(text)}
            clearIconImageSource=""
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
            width: '20%',
            alignItems: 'center',
          }}>
          <Image
            style={styles.navBarImage2}
            source={require('../../assets/Microphone.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;

const styles = StyleSheet.create({
  navBarImage2: {
    height: Metrics.rfv(20),
    width: Metrics.rfv(20),
  },
});
