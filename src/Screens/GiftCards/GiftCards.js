/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  I18nManager,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import { COLORS_NEW } from '../../Helper/colors.new';
import { AppButton } from '../../Component/button/app-button';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';
import fontConstant from '../../constant/fontConstant';

export default function GiftCard({ navigation }) {
  const { t } = useTranslation();
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <>
        <ImageBackground
          source={require('../../../assets/GiftCard-back.png')}
          resizeMode="stretch"
          style={styles.img}>
          <View style={styles.navBarView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{
                  width: Metrics.rfv(15),
                  height: Metrics.rfv(15),
                   resizeMode: 'contain',
                  transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
                }}
                source={require('../../../assets/Back-Arrow.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image style={styles.navBarImage1} source={''} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.mainView}>
          <View>
            <Text style={styles.giftCardText}>{t('Gift Card')}</Text>
            <Text style={{ fontFamily: fontConstant.satoshi, coloe: COLORS_NEW.black, fontSize: Metrics.rfv(14) }}>AJMAL enjoys a prominent presence in the Travel Retail arena, with some of our most notable clients being Dubai Duty Free, Abu Dhabi Duty Free, Muscat Duty Free, Bahrain Duty Free, and Cairo Duty Free. We recently launched perfumes at Cyprus Duty Free, further extending our presence in the region.</Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: Metrics.rfv(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: Metrics.rfv(25),
            width: '100%'
          }}>
          <View style={{ width: '75%' }}>
            <AppButton
              preset="primary"
              text="Explore Now"
              style={{ marginTop: Metrics.rfv(16) }}
              onPress={() => navigation.navigate('PickAmount')}
            />
          </View>
          <View style={{ width: '20%', marginTop: Metrics.rfv(16) }}>
            <Image
              style={styles.playButton}
              source={require('../../../assets/Play-button.png')}
            />
          </View>
        </View>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingHorizontal: 20,
  },
  img: {
    width: '100%',
    height: Metrics.rfv(250),
    marginBottom: Metrics.rfv(40),
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
    color: COLORS_NEW.white,
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
  }, giftCardText: {
    fontSize: Metrics.rfv(25),
    marginBottom: Metrics.rfv(10),
    color: COLORS_NEW.black,
    fontFamily: 'Gambetta-BoldItalic',
  },
  playButton: {
    height: Metrics.rfv(48),
    width: Metrics.rfv(48),
    resizeMode: 'contain',
  },
});
