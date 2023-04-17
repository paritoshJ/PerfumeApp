/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';


const ImageData = [
  {
    id: 1,
    name: 'img1',
    image: require('../../../assets/per-1.png'),
  },
  {
    id: 2,
    name: 'img2',
    image: require('../../../assets/per-2.png'),
  },
  {
    id: 3,
    name: 'img3',
    image: require('../../../assets/per-3.png'),
  },
];

export default function LoyaltyPoint({navigation}) {
  const [feed, setFeed] = useState(true);
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

        <Text style={styles.navBarText}>{t('LOYALTY POINTS')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      {/* No Return View */}
      {!feed ? (
        <View style={styles.mainView}>
          <Image
            style={styles.emptyCartImage}
            source={require('../../../assets/loyalty-color.png')}
          />
          <Text style={styles.text1}>{t('You dont have any loyalty points')}</Text>
          <Text style={styles.text2}>{t('Make purchases and earn points')}</Text>
          <AppButton
            preset="primary"
            text={t('Go shopping')}
            style={{marginTop: Metrics.rfv(16)}}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View>
            <LinearGradient
              colors={['#A4A4A4', '#F0E6DB', '#A4A4A4']}
              start={{x: 0, y: -0.2}}
              end={{x: 1, y: 1}}
              style={styles.scrollViewImage}>
              <View
                style={{
                  marginHorizontal: Metrics.rfv(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.yourBalanceText}>{t('LOYALTY POINTS')}</Text>
                <Image
                  style={styles.cardWalletImage}
                  source={require('../../../assets/loyalty-card-icon.png')}
                />
              </View>
              <View style={styles.cardStarView}>
                <Image
                  style={styles.cardWalletImage}
                  source={require('../../../assets/loyalty-card-star.png')}
                />
                <Text style={styles.yourBalanceText}>13</Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.imageText}>Exparation date: 1 Jan</Text>
              </View>
            </LinearGradient>
            <View style={styles.pointView}>
              <Text style={{fontSize: Metrics.rfv(12), color: COLORS_NEW.blue}}>
                28 points - 1 {t('AED')}
              </Text>
            </View>
          </View>
          {/* Wallet Order View */}
          <View
            style={{
              borderBottomColor: COLORS_NEW.lightGray,
              borderBottomWidth: 1,
              marginBottom: Metrics.rfv(20),
            }}>
            <View style={styles.orderView}>
              <TouchableOpacity style={styles.orderView}>
                <Text style={styles.orderNumberText}>{t('orders')} #4562378</Text>
              </TouchableOpacity>
            </View>
            <View>
              {/* Order Detail View */}
              <View>
                <Text
                  style={{
                    color: COLORS_NEW.gray,
                    fontSize: Metrics.rfv(16),
                    marginTop: Metrics.rfv(10),
                  }}>
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
                  style={{
                    color: COLORS_NEW.gray,
                    fontSize: Metrics.rfv(16),
                    marginTop: Metrics.rfv(10),
                  }}>
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
              <View>
                <Text
                  style={{
                    color: COLORS_NEW.gray,
                    fontSize: Metrics.rfv(16),
                    marginTop: Metrics.rfv(10),
                  }}>
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
                  style={{
                    color: COLORS_NEW.gray,
                    fontSize: Metrics.rfv(16),
                    marginTop: Metrics.rfv(10),
                  }}>
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
              {/* Image View */}
              <View style={styles.imageView}>
                {ImageData.map(item => {
                  return (
                    <Image style={styles.productView} source={item.image} />
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
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
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
    padding: Metrics.rfv(10),
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: 1,
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
    color: COLORS_NEW.black,
  },
  feedCardView: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(250),
    width: '100%',
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
  },
  discountText: {
    fontSize: Metrics.rfv(18),
    color: COLORS_NEW.black,
    marginTop: Metrics.rfv(5),
  },
  dateText: {
    color: COLORS_NEW.lightGray,
    marginTop: Metrics.rfv(5),
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
    height: Metrics.rfv(200),
    width: '100%',
    borderRadius: Metrics.rfv(20),
  },
  textView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: Metrics.rfv(140),
    left: 0,
    right: Metrics.rfv(130),
    bottom: 0,
  },
  imageText: {
    fontSize: 14,
    color: COLORS_NEW.white,
  },
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
  },
  yourBalanceText: {
    marginTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(16),
    color: COLORS_NEW.white,
    marginLeft: Metrics.rfv(10),
  },
  cardWalletImage: {
    marginTop: Metrics.rfv(10),
    height: Metrics.rfv(25),
    width: Metrics.rfv(25),
    resizeMode: 'contain',
  },
  dateAndPriceView: {
    marginTop: Metrics.rfv(40),
  },
  textPrice: {
    fontSize: Metrics.rfv(18),
    margin: 2,
    color: COLORS_NEW.black,
  },
  textDate: {
    margin: 2,
    fontSize: Metrics.rfv(18),
    color: COLORS_NEW.black,
  },
  imageView: {
    flexDirection: 'row',
    marginVertical: Metrics.rfv(10),
    resizeMode: 'contain',
  },
  productView: {
    margin: 5,
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    borderRadius: Metrics.rfv(10),
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
    resizeMode: 'contain',
  },
  orderNumberText: {
    fontSize: Metrics.rfv(20),
    fontWeight: 500,
    color: COLORS_NEW.black,
    marginTop: Metrics.rfv(20),
  },
  cardStarView: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: Metrics.rfv(240),
    bottom: 0,
  },
  pointView: {
    backgroundColor: '#F9F5F1',
    width: Metrics.rfv(110),
    paddingVertical: Metrics.rfv(5),
    paddingHorizontal: Metrics.rfv(5),
    borderBottomEndRadius: Metrics.rfv(10),
    borderBottomStartRadius: Metrics.rfv(10),
    position: 'relative',
    top: 0,
    left: Metrics.rfv(210),
    right: 0,
    bottom: 0,
  },
});
