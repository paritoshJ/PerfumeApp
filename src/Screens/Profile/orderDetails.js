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
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';

const ImageData = [
  {
    id: 1,
    name: 'img1',
    image: require('../../../assets/per-1.png'),
    title: 'Amber Wood Noir',
    disc: 'EAU DE PARFUME / 75ML / WOMAN',
    price: '24',
    discountPrice: '12',
  },
  {
    id: 2,
    name: 'img2',
    image: require('../../../assets/per-2.png'),
    title: 'Amber Wood Noir',
    disc: 'EAU DE PARFUME / 75ML / WOMAN',
    price: '24',
    discountPrice: '12',
  },
  {
    id: 3,
    name: 'img3',
    image: require('../../../assets/per-3.png'),
    title: 'Amber Wood Noir',
    disc: 'EAU DE PARFUME / 75ML / WOMAN',
    price: '24',
    discountPrice: '12',
  },
];
export default function OrderDetails({route, navigation}) {
  const {page} = route.params;
  const { t } = useTranslation();
  const [orderClick, setOrderClick] = useState(false);
  const [refund, setRefund] = useState(true);
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
              <Text style={styles.orderNumberText}>{t('orders')} #4562378</Text>
            </TouchableOpacity>
          </View>
          {/* Order Detail View */}
          <View style={styles.orderDetailView}>
            <View style={styles.dateView}>
              <Text style={styles.orderDetailViewLabel}>{t('DATE')}</Text>
              <Text style={styles.orderDetailViewText}>December 10, 2022</Text>
            </View>
            <View style={styles.statusView}>
              <Text style={styles.orderDetailViewLabel}>{t('Status')}</Text>
              <Badge style={styles.badge}>{t('Courier accepted')}</Badge>
            </View>
            <View style={styles.customerView}>
              <Text style={styles.orderDetailViewLabel}>{t('Customer')}</Text>
              <Text style={styles.orderDetailViewText}>Ms. Anna Lin</Text>
            </View>
            <View style={styles.addressView}>
              <Text style={styles.orderDetailViewLabel}>{t('Address')}</Text>
              <Text style={styles.orderDetailViewText}>
                Apt 403, Biulding 7, Design Disctrict, Dubai, UAE
              </Text>
            </View>
            <View style={styles.phoneView}>
              <Text style={styles.orderDetailViewLabel}>{t('Phone')}</Text>
              <Text style={styles.orderDetailViewText}>+971 56787904</Text>
            </View>
          </View>
          {/* Refund View */}
          {/* Order Summary View */}
          {page === 'return' ? (
            <View style={styles.orderSummaryView}>
              <View
                style={styles.refundView}
                onPress={() => setOrderClick(!orderClick)}>
                <Text style={styles.orderNumberText}>Refund Method</Text>
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
                  <Text style={styles.creditCardView}>CREDIT CARD</Text>
                  <Text style={styles.CreditCardNumberView}>****3546</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: Metrics.rfv(10),
                  }}>
                  <Text style={{fontSize: Metrics.rfv(18), fontWeight: 800}}>
                    Order Total
                  </Text>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(18),
                      fontWeight: 800,
                      color: COLORS_NEW.black,
                    }}>
                    82.00 AED
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.orderSummaryView}>
              <View
                style={styles.orderView}
                onPress={() => setOrderClick(!orderClick)}>
                <Text style={styles.orderNumberText}>{t('Order summary')}</Text>
              </View>
              <View style={styles.totalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.totalViewTitle}>{t('Subtotal')}</Text>
                  <Text style={styles.totalViewPrice}>117.00 {t('AED')}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.totalViewTitle}>PAYMENT FEE (COD)</Text>
                  <Text style={styles.totalViewPrice}>3.00 {t('AED')}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.totalViewTitle}>SHIPPING FEE</Text>
                  <Text style={styles.totalViewPrice}>{t('Free')}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: COLORS_NEW.lightGray,
                    borderBottomWidth: 1,
                  }}>
                  <Text style={styles.totalViewTitle}>ESTIMATED VAT</Text>
                  <Text style={styles.totalViewPrice}>3.00 {t('AED')}</Text>
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
                      fontWeight: 800,
                      color: COLORS_NEW.black,
                    }}>
                    Order Total
                  </Text>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(20),
                      fontWeight: 800,
                      color: COLORS_NEW.black,
                    }}>
                    82.00 {t('AED')}
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
            {ImageData.map(item => {
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
                      source={item.image}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      marginHorizontal: Metrics.rfv(10),
                    }}>
                    <View style={styles.productViewDiscription}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: COLORS_NEW.black,
                        }}>
                        {t(item.title)}
                      </Text>
                      <Text
                        style={{
                          fontSize: Metrics.rfv(14),
                          opacity: 0.5,
                        }}>
                        {item.disc}
                      </Text>
                    </View>
                    <View style={styles.productViewPrice}>
                      <Text
                        style={{
                          fontSize: Metrics.rfv(18),
                          color: COLORS_NEW.blue,
                          fontWeight: 800,
                        }}>
                        {item.discountPrice} {t('AED')}
                      </Text>
                      <Text
                        style={{
                          marginHorizontal: Metrics.rfv(10),
                          textDecorationLine: 'line-through',
                          textDecorationStyle: 'solid',
                          fontSize: Metrics.rfv(18),
                          opacity: 0.3,
                          color: COLORS_NEW.black,
                        }}>
                        {item.price} {t('AED')}
                      </Text>
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
              text={t("Reorder")}
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
    fontWeight: 500,
    paddingHorizontal: Metrics.rfv(20),
    color: COLORS_NEW.black,
  },
  badge: {
    backgroundColor: '#FCF9E8',
    color: '#E0BC00',
    height: Metrics.rfv(25),
    width: Metrics.rfv(100),
    fontSize: Metrics.rfv(14),
    marginTop: Metrics.rfv(24),
    position: 'absolute',
    left: 0,
  },
  orderDetailView: {
    marginTop: Metrics.rfv(10),
    paddingHorizontal: Metrics.rfv(20),
  },
  orderDetailViewLabel: {
    fontSize: Metrics.rfv(16),
    color: '#EEEDE5',
  },
  totalViewPrice: {
    marginVertical: Metrics.rfv(7),
    fontSize: Metrics.rfv(14),
    color: COLORS_NEW.black,
  },
  totalViewTitle: {
    marginVertical: Metrics.rfv(7),
    fontSize: Metrics.rfv(14),
    color: COLORS_NEW.gray,
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
