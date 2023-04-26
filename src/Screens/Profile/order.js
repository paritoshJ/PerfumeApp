/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {Badge} from 'react-native-paper';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';

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
export default function Order({navigation}) {
  const [orderClick, setOrderClick] = useState(false);
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

        <Text style={styles.navBarText}>{t('orders')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage2} source={''} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainView}>
        <View>
          <View
            style={{
              borderBottomColor: COLORS_NEW.lightGray,
              borderBottomWidth: 1,
            }}>
            {/* Order Number View */}
            <View style={styles.orderView}>
              <TouchableOpacity
                style={styles.orderView}
                onPress={() => setOrderClick(!orderClick)}>
                <Text style={styles.orderNumberText}>
                  {t('orders')} #4562378
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.orderView}
                onPress={() =>
                  navigation.navigate('OrderDetails', {page: 'order'})
                }>
                <Image
                  style={{resizeMode: 'contain'}}
                  source={require('../../../assets/More-button.png')}
                />
              </TouchableOpacity>
            </View>
            {/* Sample Order View */}
            {orderClick && (
              <>
                <View style={styles.sampleOrderView}>
                  <Badge style={styles.badge}>{t('Courier accepted')}</Badge>
                  <View style={styles.dateAndPriceView}>
                    <Text style={styles.textDate}>December 10, 2022</Text>
                    <Text style={styles.textPrice}>172 {t('AED')}</Text>
                  </View>
                </View>
                {/* Image View */}
                <View style={styles.imageView}>
                  {ImageData.map(item => {
                    return (
                      <Image style={styles.productView} source={item.image} />
                    );
                  })}
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
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
  // Main Style
  orderView: {
    paddingVertical: Metrics.rfv(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumberText: {
    fontSize: Metrics.rfv(20),
    fontWeight: '500',
    color: COLORS_NEW.black,
  },
  badge: {
    backgroundColor: '#FCF9E8',
    color: '#E0BC00',
    height: Metrics.rfv(25),
    width: Metrics.rfv(100),
    fontSize: Metrics.rfv(14),
    marginTop: 10,
    position: 'absolute',
    left: 0,
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
    marginVertical: 10,
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
});
