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
import {AppButton} from '../../Component/button/app-button';
import {useTranslation} from 'react-i18next';
import MyStatusBar from '../../Component/MyStatusBar';
import Moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import Constants from '../../Comman/Constants';


// const ImageData = [
//   {
//     id: 1,
//     name: 'img1',
//     image: require('../../../assets/per-1.png'),
//     title: 'Amber Wood Noir',
//     disc: 'EAU DE PARFUME / 75ML / WOMAN',
//     price: '24',
//     discountPrice: '12',
//   },
//   {
//     id: 2,
//     name: 'img2',
//     image: require('../../../assets/per-2.png'),
//     title: 'Amber Wood Noir',
//     disc: 'EAU DE PARFUME / 75ML / WOMAN',
//     price: '24',
//     discountPrice: '12',
//   },
//   {
//     id: 3,
//     name: 'img3',
//     image: require('../../../assets/per-3.png'),
//     title: 'Amber Wood Noir',
//     disc: 'EAU DE PARFUME / 75ML / WOMAN',
//     price: '24',
//     discountPrice: '12',
//   },
// ];
export default function OrderDetails({route, navigation}) {
  const { page, items } = route.params;
  const {t} = useTranslation();
  const [orderClick, setOrderClick] = useState(false);
  const [refund, setRefund] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      Moment.locale('en');

      return () => { };
    }, []),
  );
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
        <Text style={styles.navBarText}>ORDERS DETAILS</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage2} source={''} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.mainView}>
        <View>
          {/* Order Number View */}
          <View style={styles.orderView}>
            <TouchableOpacity
              style={styles.orderView}
              onPress={() => setOrderClick(!orderClick)}>
              <Text style={styles.orderNumberText}>{Constants.Laungagues.orders == null ? 'orders' : Constants.Laungagues.orders} #{items.increment_id}</Text>
            </TouchableOpacity>
          </View>
          {/* Order Detail View */}
          <View style={styles.orderDetailView}>
            <View style={styles.dateView}>
              <Text style={styles.orderDetailViewLabel}>{Constants.Laungagues.date == null ? 'DATE' : Constants.Laungagues.date}</Text>
              <Text style={styles.orderDetailViewText}>{Moment(items.created_at).format('MMM d, yyyy')}</Text>
            </View>
            <View style={styles.statusView}>
              <Text style={styles.orderDetailViewLabel}>{Constants.Laungagues.status == null ? 'Status' : Constants.Laungagues.status}</Text>
              <Badge style={styles.badge}>{items.is_guest_customer == true ? 'Courier accepted' : 'Courier processing'}</Badge>
            </View>
            <View style={styles.customerView}>
              <Text style={styles.orderDetailViewLabel}>{Constants.Laungagues.customer == null ? 'Customer' : Constants.Laungagues.customer}</Text>
              <Text style={styles.orderDetailViewText}>{items.customer_name}</Text>
            </View>
            <View style={styles.addressView}>
              <Text style={styles.orderDetailViewLabel}>{Constants.Laungagues.address == null ? 'Address' : Constants.Laungagues.address}</Text>
              <Text style={styles.orderDetailViewText}>
                {items.shipping[0].street + ', ' + items.shipping[0].city + ', ' + items.shipping[0].postcode}
              </Text>
            </View>
            <View style={styles.phoneView}>
              <Text style={styles.orderDetailViewLabel}>{Constants.Laungagues.phone == null ? 'Phone' : Constants.Laungagues.phone}</Text>
              <Text style={styles.orderDetailViewText}>{items.shipping[0].telephone}</Text>
            </View>
          </View>
          {/* Refund View */}
          {/* Order Summary View */}
          {page === 'return' ? (
            <View style={styles.orderSummaryView}>
              <View
                style={styles.refundView}
                onPress={() => setOrderClick(!orderClick)}>
                <Text style={styles.orderNumberText}>{Constants.Laungagues.refund_method == null ? 'Refund Method' : Constants.Laungagues.refund_method}</Text>
              </View>
              {/* Total View */}
              <View style={styles.totalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: COLORS_NEW.lightGray,
                    borderBottomWidth: 1,
                  }}>
                  <Text style={styles.creditCardView}>{Constants.Laungagues.credit_card == null ? 'CREDIT CARD' : Constants.Laungagues.credit_card}</Text>
                  <Text style={styles.CreditCardNumberView}>****3546</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: Metrics.rfv(10),
                  }}>
                  <Text style={{fontSize: Metrics.rfv(18), fontWeight: '800'}}>
                    {Constants.Laungagues.order_total == null ? 'Order Total' : Constants.Laungagues.order_total}
                  </Text>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(18),
                      fontWeight: '800',
                      color: COLORS_NEW.black,
                    }}>
                    82.00 {Constants.Laungaguess.aed == null ? 'AED' : Constants.Laungaguess.aed}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.orderSummaryView}>
              <View
                style={styles.orderView}
                onPress={() => setOrderClick(!orderClick)}>
                  <Text style={styles.orderNumberText}>{Constants.Laungagues.order_summary == null ? 'Order summary' : Constants.Laungagues.order_summary}</Text>
              </View>
              <View style={styles.totalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text style={styles.totalViewTitle}>{Constants.Laungagues.subtotal == null ? 'Subtotal' : Constants.Laungagues.subtotal}</Text>
                    <Text style={styles.totalViewPrice}>117.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.totalViewTitle}>PAYMENT FEE (COD)</Text>
                    <Text style={styles.totalViewPrice}>3.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.totalViewTitle}>SHIPPING FEE</Text>
                    <Text style={styles.totalViewPrice}>{Constants.Laungagues.free == null ? 'Free' : Constants.Laungagues.free}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: COLORS_NEW.lightGray,
                    borderBottomWidth: 1,
                  }}>
                    <Text style={styles.totalViewTitle}>{Constants.Laungagues.estimated_vat == null ? 'ESTIMATED VAT' : Constants.Laungagues.estimated_vat}</Text>
                    <Text style={styles.totalViewPrice}>3.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: Metrics.rfv(10),
                  }}>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(20),
                      fontWeight: '700',
                      color: COLORS_NEW.black,
                    }}>
                      {Constants.Laungagues.order_total == null ? 'Order Total' : Constants.Laungagues.order_total}
                  </Text>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(20),
                      fontWeight: '700',
                      color: COLORS_NEW.black,
                    }}>
                      82.00 {Constants.Laungagues.aed == null ? 'AED' : Constants.Laungagues.aed}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Product View */}
          <View
            style={{
              borderBottomColor: COLORS_NEW.lightGray,
              borderBottomWidth: 1,
            }}>
            {items.items.map((item) => {
              return (
                <View style={styles.productView}>
                  <View
                    style={{
                      borderColor: COLORS_NEW.lightGray,
                      borderWidth: 1,
                      borderRadius: Metrics.rfv(10),
                      padding: 5,
                    }}>
                    <Image
                      style={styles.productViewImage}
                      source={{ uri: item.image_url }
                      }
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      flex: 1,
                      marginHorizontal: Metrics.rfv(10),
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '600',
                          color: COLORS_NEW.black,
                        }}>
                        {t(item.title)}
                      </Text>
                      <Text
                        style={{
                          fontSize: Metrics.rfv(14),
                          opacity: 0.5,
                        }}>
                        {item.display_category}
                      </Text>
                    </View>
                    <View style={styles.productViewPrice}>
                      <Text
                        style={{
                          fontSize: Metrics.rfv(18),
                          color: COLORS_NEW.blue,
                          fontWeight: '700',
                        }}>
                        {item.price} 
                      </Text>
                      {/* <Text
                        style={{
                          marginHorizontal: Metrics.rfv(10),
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                          fontSize: Metrics.rfv(18),
                          opacity: 0.3,
                          color: COLORS_NEW.black,
                        }}>
                        {item.price} {t('AED')}
                      </Text> */}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
          {/* reorder Button */}
          <View style={{marginHorizontal: Metrics.rfv(20)}}>
            <AppButton
              preset="primary"
              text={Constants.Laungagues.reorder == null ? 'Reorder' : Constants.Laungagues.reorder}
              style={{marginTop: Metrics.rfv(16)}}
            />
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
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
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
    resizeMode: 'contain',
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
  orderView: {
    marginTop: Metrics.rfv(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderNumberText: {
    fontSize: Metrics.rfv(18),
    fontWeight: '500',
    paddingHorizontal: Metrics.rfv(20),
    color: COLORS_NEW.black,
  },
  badge: {
    backgroundColor: '#FCF9E8',
    color: '#E0BC00',
    height: Metrics.rfv(25),
    width: Metrics.rfv(150),
    fontSize: Metrics.rfv(14),
    marginTop: Metrics.rfv(24),
    position: 'absolute',
    left: 0,
    paddingTop: 5
  },
  orderDetailView: {
    marginTop: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(20),
  },
  orderDetailViewLabel: {
    fontSize: Metrics.rfv(16),
    color: '#C0BBB7',
  },
  totalViewPrice: {
    marginVertical: Metrics.rfv(7),
    fontSize: Metrics.rfv(14),
    color: COLORS_NEW.black,
  },
  totalViewTitle: {
    marginVertical: Metrics.rfv(7),
    fontSize: Metrics.rfv(14),
    color: COLORS_NEW.TEXT_COLOR,
    opacity: 0.2,
  },
  orderDetailViewText: {
    fontSize: Metrics.rfv(16),
    color: COLORS_NEW.black,
  },
  statusView: {
    marginTop: Metrics.rfv(10),
  },
  customerView: {
    marginTop: Metrics.rfv(35),
  },
  addressView: {
    marginTop: Metrics.rfv(10),
  },
  phoneView: {
    marginTop: Metrics.rfv(10),
  },
  orderSummaryView: {
    marginTop: Metrics.rfv(10),
    marginHorizontal: Metrics.rfv(15),
    borderRadius: Metrics.rfv(20),
    backgroundColor: '#F9F5F1',
  },
  totalView: {
    marginHorizontal: Metrics.rfv(20),
  },
  productView: {
    flexDirection: 'row',
    height: Metrics.rfv(120),
    paddingHorizontal: Metrics.rfv(20),
    marginVertical: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },
  productViewPrice: {
    flexDirection: 'row',
  },
  productViewImage: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
  },
  reOrderButton: {
    backgroundColor: '#BC8B57',
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    marginTop: Metrics.rfv(16),
    marginBottom: Metrics.rfv(10),
  },
  reOrderButtonText: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: 'white',
  },
  CreditCardNumberView: {
    fontSize: Metrics.rfv(14),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  refundView: {
    flexDirection: 'row',
    marginVertical: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },
});
