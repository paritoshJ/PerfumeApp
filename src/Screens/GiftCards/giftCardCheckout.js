/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {StyleSheet, View, Text, Image, TouchableOpacity, I18nManager} from 'react-native';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';

export default function GiftCardCheckOut({navigation}) {
  const { t } = useTranslation();

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
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
        <Text style={styles.navBarText}>{t('Choose delivery')}</Text>
        <TouchableOpacity>
          <Image
            style={styles.navBarImage1}
            source={require('../../../assets/close-button.png')}
          />
        </TouchableOpacity>
      </View>
      {/* Progress Bar */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: Metrics.rfv(20),
          }}>
          <Text>Card</Text>
          <Text>Amount</Text>
          <Text>Delivery</Text>
          <Text>Review</Text>
        </View>
        <Progress.Bar
          progress={1}
          width={null}
          height={1}
          color={COLORS_NEW.blue}
        />
      </View>
      {/* Scroll View*/}
      <View style={styles.ScrollView}>
        <View>
          <Image
            style={styles.scrollViewImage}
            source={require('../../../assets/gift-card-1.png')}
          />
        </View>
        {/* Gift Card Detail View */}
        <View
          style={{
            borderColor: COLORS_NEW.lightGray,
            borderWidth: 1,
            borderRadius: Metrics.rfv(20),
            marginTop: Metrics.rfv(20),
          }}>
          <View
            style={{
              paddingHorizontal: Metrics.rfv(20),
            }}>
            <Text
              style={{
                fontSize: Metrics.rfv(25),
                color: COLORS_NEW.black,
                fontFamily: 'Gambetta-Regular',
              }}>
              {t('Your selection')}
            </Text>
            <View style={styles.messageView}>
              <Text style={{color: COLORS_NEW.gray}}>{t('Message')}</Text>
              <Text style={{color: COLORS_NEW.black}}>
                Merry Christmas, my dear!
              </Text>
            </View>
            <View
              style={{
                borderBottomColor: COLORS_NEW.lightGray,
                borderBottomWidth: 1,
                paddingVertical: Metrics.rfv(10),
              }}>
              <Text style={{color: COLORS_NEW.gray}}>Delivery by Email</Text>
              <Text style={{color: COLORS_NEW.black}}>John</Text>
              <Text style={{color: COLORS_NEW.black}}>
                John@example@gmail.com
              </Text>
              <Text style={{color: COLORS_NEW.black}}>
                Dec 18, 2022, 12:00 AM, GMT Time
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: Metrics.rfv(10),
              }}>
              <Text
                style={{
                  color: COLORS_NEW.black,
                  fontSize: Metrics.rfv(16),
                }}>
                {t('TOTAL')}
              </Text>
              <Text
                style={{
                  color: COLORS_NEW.black,
                  fontSize: Metrics.rfv(16),
                }}>
                40.00 {t('AED')}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* Next Button */}
      <View
        style={{
          marginHorizontal: Metrics.rfv(20),
          marginVertical: Metrics.rfv(30),
        }}>
        <AppButton
          preset="primary"
          text={`${t('Proceed to Checkout')}: ${'40.00'} ${t('AED')}`}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('GiftCardEnvelope')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  mainView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
    padding: Metrics.rfv(10),
    // borderBottomColor: '#EEEDE7',
    // borderBottomWidth: 1,
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
  cartImage: {
    height: Metrics.rfv(60),
    width: Metrics.rfv(60),
  },
  createAccountButton: {
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: '#BC8B57',
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    backgroundColor: '#BC8B57',
  },
  goShopping: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: 'white',
  },
  text1: {
    fontSize: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  text2: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  blueCardView: {
    marginHorizontal: Metrics.rfv(15),
    paddingHorizontal: Metrics.rfv(150),
    paddingVertical: Metrics.rfv(90),
    borderRadius: Metrics.rfv(20),
    backgroundColor: '#F5FAFE',
    position: 'relative',
  },
  giftCardText: {
    fontFamily: 'Gambetta-BoldItalic',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: Metrics.rfv(25),
    color: COLORS_NEW.black,
    top: '60%',
    left: Metrics.rfv(80),
    right: 0,
    bottom: 0,
    marginTop: Metrics.rfv(80),
  },
  showAmountView: {
    flexDirection: 'row',
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    borderRadius: Metrics.rfv(100),
    backgroundColor: '#fff',
    width: Metrics.rfv(100),
    height: Metrics.rfv(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.rfv(10),
  },
  textHeading: {
    fontSize: Metrics.rfv(20),
    color: COLORS_NEW.black,
    fontFamily: 'Gambetta-MediumItalic',
  },
  scrollViewImage: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(200),
    width: '100%',
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
    justifyContent: 'center',
  },
  messageView: {
    marginTop: Metrics.rfv(10),
  },
});
