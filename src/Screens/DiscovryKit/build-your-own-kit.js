/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  I18nManager,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import {ScrollView} from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';
import Constants from '../../Comman/Constants';
export default function BuildYourOwnBox({navigation}) {
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
        <Text style={styles.navBarText}>{Constants.Laungagues.build_your_own == null ? 'BUILD YOUR OWN' : Constants.Laungagues.build_your_own}</Text>
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
          <Text>{Constants.Laungagues.gifts == null ? 'Gifts' : Constants.Laungagues.gifts}</Text>
          <Text>{Constants.Laungagues.sticker == null ? 'Sticker' : Constants.Laungagues.sticker}</Text>
          <Text>{Constants.Laungagues.review == null ? 'Review' : Constants.Laungagues.review}</Text>
        </View>
        <Progress.Bar
          progress={0.3}
          width={null}
          height={1}
          color={COLORS_NEW.blue}
        />
      </View>
      <ScrollView>
        {/* Scroll View*/}
        <View style={styles.ScrollView}>
          {/* Gift Card Detail View 1*/}
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
                position: 'relative',
              }}>
              <Image
                style={styles.BoxImage}
                source={require('../../../assets/Box-m.png')}
              />
              <View style={styles.itemTagView}>
                <Text style={styles.itemTag}>5 ITEMS</Text>
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
                  Box M
                </Text>
                <Text
                  style={{
                    color: COLORS_NEW.blue,
                    fontSize: Metrics.rfv(10),
                    borderColor: COLORS_NEW.blue,
                    borderWidth: 1,
                    borderRadius: Metrics.rfv(20),
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: Metrics.rfv(5),
                  }}>
                  20х10х8 CM
                </Text>
              </View>
            </View>
          </View>
          {/* Gift Card Detail View 1*/}
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
                position: 'relative',
              }}>
              <Image
                style={styles.BoxImage}
                source={require('../../../assets/Box-m.png')}
              />
              <View style={styles.itemTagView}>
                <Text style={styles.itemTag}>5 ITEMS</Text>
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
                  Box M
                </Text>
                <Text
                  style={{
                    color: COLORS_NEW.blue,
                    fontSize: Metrics.rfv(10),
                    borderColor: COLORS_NEW.blue,
                    borderWidth: 1,
                    borderRadius: Metrics.rfv(20),
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: Metrics.rfv(5),
                  }}>
                  20х10х8 CM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Next Button */}
      <View
        style={{
          marginHorizontal: Metrics.rfv(20),
          marginVertical: Metrics.rfv(30),
        }}>
        <AppButton
          preset="primary"
          text={Constants.Laungagues.next == null ? "Next" : Constants.Laungagues.next}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('BuildYourOwnKitWithProduct')}
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
  BoxImage: {
    width: '100%',
    height: Metrics.rfv(200),
  },
  itemTag: {
    fontSize: Metrics.rfv(10),
    textAlign: 'center',
  },
  itemTagView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderBottomRightRadius: Metrics.rfv(20),
    borderTopLeftRadius: Metrics.rfv(20),
    backgroundColor: COLORS_NEW.itemTagColor,
    width: Metrics.rfv(60),
    height: Metrics.rfv(20),
    padding: Metrics.rfv(2),
  },
});
