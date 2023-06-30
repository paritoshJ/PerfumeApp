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
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {Badge} from 'react-native-paper';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import Constants from '../../Comman/Constants';

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

export default function Wallet({navigation}) {
  const [feed, setFeed] = useState(true);
  const {t} = useTranslation();

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
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>

        <Text style={styles.navBarText}>{Constants.Laungagues.wallet == null ? 'Wallet' : Constants.Laungagues.wallet}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      {/* No Return View */}
      {!feed ? (
        <View style={styles.mainView}>
          <Image
            style={styles.emptyCartImage}
            source={require('../../../assets/wallet-color.png')}
          />
          <Text style={styles.text1}>{Constants.Laungagues.your_wallet_is_empty == null ? 'Your wallet is empty' : Constants.Laungagues.your_wallet_is_empty}</Text>
          <Text style={styles.text2}>{Constants.Laungagues.make_purchases_and_earn_points == null ? "Make purchases and earn points" : Constants.Laungagues.make_purchases_and_earn_points}</Text>
          <AppButton
            preset="primary"
            text={Constants.Laungagues.go_shopping == null ? "Go Shopping" : Constants.Laungagues.go_shopping}
            style={{marginTop: Metrics.rfv(16)}}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          <View>
            <LinearGradient
              colors={['#FAF6F4', '#d1af88', '#FAF6F4']}
              start={{x: 0, y: -0.2}}
              end={{x: 1, y: 1}}
              style={styles.scrollViewImage}>
              <View
                style={{
                  marginHorizontal: Metrics.rfv(20),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                  <Text style={styles.yourBalanceText}>{Constants.Laungagues.your_balance == null ? 'Your balance' : Constants.Laungagues.your_balance}</Text>
                <Image
                  style={styles.cardWalletImage}
                  source={require('../../../assets/wallet-gray.png')}
                />
              </View>
              <View style={styles.textView}>
                  <Text style={styles.imageText}>19.35 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}</Text>
              </View>
            </LinearGradient>
          </View>
          {/* Wallet Order View */}
          <View
            style={{
              borderBottomColor: COLORS_NEW.lightGray,
              borderBottomWidth: 1,
            }}>
            <View style={styles.orderView}>
              <TouchableOpacity style={styles.orderView}>
                <Text style={styles.orderNumberText}>
                    {Constants.Laungagues.orders == null ? 'orders' : Constants.Laungagues.orders} #4562378
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {/* Image View */}
              <View style={styles.imageView}>
                {ImageData.map(item => {
                  return (
                    <Image style={styles.productView} source={item.image} />
                  );
                })}
              </View>
              {/* Order Detail View */}
              <View style={styles.cardFirstView}>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                      {Constants.Laungagues.date == null ? 'DATE' : Constants.Laungagues.date}
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
                      {Constants.Laungagues.total == null ? 'TOTAL' : Constants.Laungagues.total}
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                      117.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}
                  </Text>
                </View>
              </View>
              <View style={styles.cardSecondView}>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                      {Constants.Laungagues.spent == null ? 'Spent' : Constants.Laungagues.spent}
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                      32.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{color: COLORS_NEW.gray, fontSize: Metrics.rfv(16)}}>
                      {Constants.Laungagues.balance == null ? 'Balance' : Constants.Laungagues.balance}
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.black,
                      fontSize: Metrics.rfv(16),
                    }}>
                      16.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}
                  </Text>
                </View>
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
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: COLORS_NEW.white,
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
    top: 120,
    left: 170,
    right: 0,
    bottom: 0,
  },
  imageText: {
    fontSize: 20,
    color: COLORS_NEW.balanceColor,
    fontWeight: 'bold',
  },
  emptyCartImage: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
    resizeMode: 'contain',
  },
  yourBalanceText: {
    marginTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(16),
    color: COLORS_NEW.gray,
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
    fontWeight: '500',
    color: COLORS_NEW.black,
    marginTop: Metrics.rfv(20),
  },
});
