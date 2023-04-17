/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, ImageBackground} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import MyStatusBar from '../../Component/MyStatusBar';
export default function GiftCardEnvelope({navigation}) {
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
              source={require('../../../assets/GIFTCARD.png')}
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Metrics.rfv(10),
              paddingVertical: Metrics.rfv(30),
              marginBottom: Metrics.rfv(25),
            }}>
            <View style={{width: '45%'}}>
              <AppButton
                preset="secondary"
                text="Explore more"
                style={{marginTop: Metrics.rfv(16)}}
                onPress={() => navigation.navigate('CustomizedBundle')}
              />
            </View>
            <View style={{width: '45%'}}>
              <AppButton
                preset="primary"
                text="View cart"
                style={{marginTop: Metrics.rfv(16)}}
                onPress={() => navigation.navigate('DiscoveryKitBack')}
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
