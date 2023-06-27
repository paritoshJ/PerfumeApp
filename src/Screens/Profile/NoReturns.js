/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {Badge} from 'react-native-paper';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../Component/MyStatusBar';
import Constants from '../../Comman/Constants';
const DATA = [
  {
    id: 1,
    orderNumber: '4562378',
    status: 'Pending',
    date: 'December 10,2022',
    price: '172 AED',
    image: [
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
    ],
  },
  {
    id: 2,
    orderNumber: '4562378',
    status: 'Delivered',
    date: 'December 10,2022',
    price: '172 AED',
    image: [
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
    ],
  },
];

export default function NoReturn({navigation}) {
  const [orderClick, setOrderClick] = useState(false);
  const { t } = useTranslation();
  const [returnOrder, setReturnOrder] = useState([]);

  useEffect(() => {
    setReturnOrder([]);
  }, []);
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

        <Text style={styles.navBarText}>{Constants.Laungagues.returns == null ? 'Returns' : Constants.Laungagues.returns}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      {/* No Return View */}
      {returnOrder.length === 0 ? (
        <View style={styles.mainView}>
          <Image
            style={styles.cartImage}
            source={require('../../../assets/Return-color.png')}
          />
          <Text style={styles.text1}>{Constants.Laungagues.you_currently_have_no_returns == null ? 'You currently have no returns' : Constants.Laungagues.you_currently_have_no_returns}</Text>
          <Text style={styles.text2}>{Constants.Laungagues.you_can_create_a_return_from_orders == null ? 'You can create a return from Orders' : Constants.Laungagues.you_can_create_a_return_from_orders}</Text>
          <AppButton
            preset="primary"
            text={Constants.Laungagues.view_my_orders == null ? 'View my orders' : Constants.Laungagues.view_my_orders}
            style={{marginTop: Metrics.rfv(16)}}
            onPress={() => navigation.navigate('Order')}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {DATA.map(item => {
            return (
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
                        Order #{item.orderNumber}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.orderView}
                      onPress={() =>
                        navigation.navigate('OrderDetails', {page: 'return'})
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
                        <Badge
                          style={
                            item.status === 'Delivered'
                              ? styles.badgeSuccess
                              : styles.badge
                          }>
                          {item.status}
                        </Badge>
                        <View style={styles.dateAndPriceView}>
                          <Text style={styles.textDate}>{item.date}</Text>
                          <Text style={styles.textPrice}>{item.price}</Text>
                        </View>
                      </View>
                      {/* Image View */}
                      <View style={styles.imageView}>
                        {item.image.map(item => {
                          return (
                            <Image
                              style={styles.productView}
                              source={item.image}
                            />
                          );
                        })}
                      </View>
                    </>
                  )}
                </View>
              </View>
            );
          })}
          <AppButton
            preset="primary"
              text={Constants.Laungagues.new_return == null ? "New Return" : Constants.Laungagues.new_return}
            style={{marginTop: Metrics.rfv(16)}}
          />
        </ScrollView>
      )}
      {/* New Return Button */}
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
    height: Metrics.rfv(60),
    width: Metrics.rfv(60),
    resizeMode: 'contain',
  },
  createAccountButton: {
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.blue,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    backgroundColor: COLORS_NEW.blue,
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
  orderView: {
    marginTop: Metrics.rfv(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumberText: {
    fontSize: Metrics.rfv(20),
    fontWeight: 500,
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
  badgeSuccess: {
    backgroundColor: '#DFEDD6',
    color: '#6AA943',
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
  },
  newReturnButton: {
    backgroundColor: COLORS_NEW.blue,
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    marginTop: Metrics.rfv(16),
    marginBottom: Metrics.rfv(10),
  },
  newReturnText: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
});
