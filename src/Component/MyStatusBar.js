import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colorConstant from '../constant/colorConstant';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[style.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}  barStyle={backgroundColor == colorConstant.WHITE ? 'dark-content' : 'dark-content'}/>
    </SafeAreaView>
  </View>
);

const style = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
})
export default MyStatusBar;
