/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';

export default function GiftCard({navigation}) {
  const [feed, setFeed] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      {feed && (
        <>
          <ImageBackground
            source={require('../../../assets/GiftCard-back.png')}
            resizeMode="stretch"
            style={styles.img}>
            <View style={styles.navBarView}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={styles.navBarImage1}
                  source={require('../../../assets/back-white.png')}
                />
              </TouchableOpacity>

              <Text style={styles.navBarText}>{t('Gift Card')}</Text>
              <TouchableOpacity>
                <Image style={styles.navBarImage1} source={''} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <ScrollView
            style={styles.cardView}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  style={styles.scrollViewImage}
                  source={require('../../../assets/gift-card-1.png')}
                />
                <View style={styles.textView}>
                  <Text style={styles.imageText}>40 {t('AED')}</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.scrollViewImage}
                  source={require('../../../assets/gift-card-1.png')}
                />
                <View style={styles.textView}>
                  <Text style={styles.imageText}>40 {t('AED')}</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.scrollViewImage}
                  source={require('../../../assets/gift-card-1.png')}
                />
                <View style={styles.textView}>
                  <Text style={styles.imageText}>40 {t('AED')}</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.scrollViewImage}
                  source={require('../../../assets/gift-card-1.png')}
                />
                <View style={styles.textView}>
                  <Text style={styles.imageText}>40 {t('AED')}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}

      {/* No Return View */}
      {!feed ? (
        <>
          <View style={styles.nullnavBarView}>
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

            <Text style={styles.nullnavBarText}>{t('Gift Card')}</Text>
            <TouchableOpacity>
              <Image style={styles.navBarImage1} source={''} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainView}>
            <Image
              style={styles.emptyCartImage}
              source={require('../../../assets/gift-card-color.png')}
            />
            <Text style={styles.text1}>{t('You have no vouchers yet')}</Text>
            <Text style={styles.text2}>
              {t('You currently have no vouchers linked to your account. Get started by redeeming or buying one now.')}
            </Text>
            <AppButton
              preset="primary"
              text={t('Buy gift card')}
              style={{marginTop: Metrics.rfv(16)}}
              onPress={() => navigation.navigate('BuyGiftCard')}
            />
          </View>
        </>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: COLORS_NEW.lightGray,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: Metrics.rfv(20),
                    color: COLORS_NEW.black,
                    marginTop: Metrics.rfv(15),
                  }}>
                  Card #4562378
                </Text>
              </View>
              <View>
                <Image
                  style={styles.cartImage}
                  source={require('../../../assets/gift-card-1.png')}
                />
              </View>
              <View style={styles.cardFirstView}>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                    {t('DATE')}
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                    December 10, 2022
                  </Text>
                </View>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                    {t('TOTAL')}
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                    117.00 {t('AED')}
                  </Text>
                </View>
              </View>
              <View style={styles.cardSecondView}>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                    Spent
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                    32.00 {t('AED')}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                    {t('Balance')}
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                    16.00 {t('AED')}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    marginTop: Metrics.rfv(70),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
  },
  nullnavBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
    borderBottomWidth: 1,
    borderBottomColor: COLORS_NEW.gray,
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
    color: COLORS_NEW.white,
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
  navBarText: {
    marginTop: Metrics.rfv(20),
    fontSize: Metrics.rfv(25),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  nullnavBarText: {
    color: COLORS_NEW.black,
  },
  cartImage: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(150),
    backgroundColor: COLORS_NEW.beige,
    resizeMode: 'contain',
    borderRadius: Metrics.rfv(20),
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },
  text1: {
    fontSize: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  text2: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(10),
    textAlign: 'center',
    color: COLORS_NEW.black,
  },
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
  },
  upperBarMainView: {
    flexDirection: 'row',
    borderBottomColor: COLORS_NEW.gray,
    borderBottomWidth: 1,
    width: '100%',
  },
  shortView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Metrics.rfv(10),
    width: '50%',
  },
  filtersView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Metrics.rfv(5),
    marginVertical: Metrics.rfv(10),
    width: '50%',
    alignItems: 'center',
  },
  verticlLineView: {
    borderLeftColor: COLORS_NEW.gray,
    borderLeftWidth: 1,
  },
  card: {
    width: '49%',
    backgroundColor: '#F5FAFE',
  },
  discountTagView: {
    backgroundColor: COLORS_NEW.black,
    height: Metrics.rfv(30),
    width: Metrics.rfv(60),
    borderTopLeftRadius: Metrics.rfv(20),
    borderBottomRightRadius: Metrics.rfv(20),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  discountText: {
    color: COLORS_NEW.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    left: 15,
    right: 0,
    bottom: 0,
  },
  favIcon: {
    height: Metrics.rfv(20),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    left: 130,
    right: 0,
    bottom: 0,
  },
  img: {
    width: '100%',
    height: Metrics.rfv(120),
    marginBottom: Metrics.rfv(40),
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.rfv(15),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: Metrics.rfv(1),
    alignItems: 'center',
    paddingVertical: Metrics.rfv(15),
    padding: Metrics.rfv(5),
    borderRadius: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
  },
  dateText: {
    fontSize: Metrics.rfv(12),
    color: COLORS_NEW.gray,
  },
  loginPageComponentview2: {
    color: COLORS_NEW.black,
  },
  feedDiscountImg: {
    height: Metrics.rfv(50),
    width: Metrics.rfv(50),
    resizeMode: 'contain',
    marginHorizontal: Metrics.rfv(10),
  },
  CardPageArrow: {
    width: Metrics.rfv(15),
    height: Metrics.rfv(15),
    marginTop: Metrics.rfv(5),
    resizeMode: 'contain',
    marginHorizontal: Metrics.rfv(10),
  },
  feedCardView: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(200),
    width: '100%',
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
  },
  cardFirstView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSecondView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrics.rfv(10),
    marginBottom: Metrics.rfv(10),
  },
  scrollViewImage: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(150),
    width: Metrics.rfv(250),
    marginHorizontal: Metrics.rfv(10),
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 120,
    left: 120,
    right: 0,
    bottom: 0,
  },
  imageText: {
    fontSize: 20,
    color: COLORS_NEW.black,
    fontWeight: 'bold',
  },
  cardView: {
    position: 'absolute',
    top: Metrics.rfv(50),
    left: 0,
    right: 0,
    bottom: 0,
  },
});
