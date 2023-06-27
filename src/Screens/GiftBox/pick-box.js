/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager
} from 'react-native';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import Constants from '../../Comman/Constants';


export default function PickBox({navigation}) {
    const { t } = useTranslation()

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
        <Text style={styles.navBarText}>{Constants.Laungagues.pick_a_box == null ? 'PICK A BOX' : Constants.Laungagues.pick_a_box}</Text>
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
          <Text>{Constants.Laungagues.box == null ? 'Box' : Constants.Laungagues.box}</Text>
          <Text>{Constants.Laungagues.gifts == null ? 'Gifts' : Constants.Laungagues.gifts}</Text>
          <Text>{Constants.Laungagues.sticker == null ? 'Sticker' : Constants.Laungagues.sticker}</Text>
          <Text>{Constants.Laungagues.review == null ? 'Review' : Constants.Laungagues.review}</Text>
        </View>
        <Progress.Bar
          progress={0.25}
          width={null}
          height={1}
          color={COLORS_NEW.blue}
        />
      </View>

      <View style={styles.ScrollView}>
        {/* Card View */}
        <View style={styles.mainView}>
          <Image
            style={styles.scrollViewImage}
            source={require('../../../assets/Pic-box.png')}
          />
        </View>
      </View>
      <View
        style={{
          marginHorizontal: Metrics.rfv(20),
          marginVertical: Metrics.rfv(30),
        }}>
        <AppButton
          preset="primary"
          text={Constants.Laungagues.next == null ? "Next" : Constants.Laungagues.next}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('BuildYourOwnGiftBox')}
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
    alignItems: 'center',
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
  scrollViewImage: {
    marginTop: Metrics.rfv(20),
    height: '70%',
    width: Metrics.rfv(300),
    marginHorizontal: Metrics.rfv(10),
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
    justifyContent: 'center',
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
});
