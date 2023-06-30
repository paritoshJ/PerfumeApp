/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, Image, ImageBackground, I18nManager} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import MyStatusBar from '../../Component/MyStatusBar';
import Constants from '../../Comman/Constants';

export default function DiscoveryKitBox({navigation}) {
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <>
        <ImageBackground
          source={require('../../../assets/Back.png')}
          resizeMode="stretch"
          style={styles.img}>
          <View style={styles.ScrollView}>
            <Image
              style={styles.scrollViewImage}
              source={require('../../../assets/discovery-kit-box.png')}
            />
            <Text
              style={{
                color: COLORS_NEW.black,
                fontFamily: 'Gambetta-MediumItalic',
                fontSize: Metrics.rfv(30),
                textAlign: 'center',
              }}>
              {Constants.Laungagues.your_discovery_box_is_ready == null ? 'Your discovery box is ready!' : Constants.Laungagues.your_discovery_box_is_ready}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Metrics.rfv(10),
              marginVertical: Metrics.rfv(30),
            }}>
            <View style={{width: '45%'}}>
              <AppButton
                preset="secondary"
                text={Constants.Laungagues.build_another_box == null ? "Build another box" : Constants.Laungagues.build_another_box}
                style={{marginTop: Metrics.rfv(16)}}
                onPress={() => navigation.navigate('CustomizedBundle')}
              />
            </View>
            <View style={{width: '45%'}}>
              <AppButton
                preset="primary"
                text={Constants.Laungagues.view_cart == null ? "View cart" : Constants.Laungagues.view_cart}
                style={{marginTop: Metrics.rfv(16)}}
                onPress={() => navigation.navigate('CustomizedBundle')}
              />
            </View>
          </View>
        </ImageBackground>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    marginBottom: Metrics.rfv(40),
  },
  scrollViewImage: {
    height: '50%',
    width: '100%',
  },
});
