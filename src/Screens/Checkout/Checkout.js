import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  I18nManager,
  FlatList,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyStatusBar from '../../Component/MyStatusBar';
import {COLORS_NEW} from '../../Helper/colors.new';
import i18n from '../../Helper/i18n';
import {useTranslation} from 'react-i18next';
import fontConstant from '../../constant/fontConstant';
import index from '.';
import PinSVG from '../../assets/svg/Pin';
import CreaditSVG from '../../assets/svg/Creadit';
import DeliverySVG from '../../assets/svg/Delivery';
import PercentSVG from '../../assets/svg/Percent';
import {isArrayNullOrEmpty, isObjectNullOrUndefined} from '../../Helper/helper';
import ArrowRightSVG from '../../assets/svg/ArrowRight';
import {AppButton} from '../../Component/button/app-button';
import CustomSwitch from '../../Component/toggleSwitch';
import EditPencilSVG from '../../assets/svg/EditPencil';
import CheckedRadioSVG from '../../assets/svg/CheckedRadio';
import UnCheckedRadioSVG from '../../assets/svg/UnCheckedRadio';
import ArrowRightGray from '../../assets/svg/ArrowRightGray';
import {
  CONFIRM_PAYMENT_METHOD,
  SAVE_PAYMENT_METHOD,
  SET_DELIVERY_CHECKOUT_METHOD,
  SET_DELIVERY_METHOD,
} from '../../api/SetDeliveryAndPaymentMethodToCart';
import Loader from '../../Component/Loader';
import colorConstant from '../../constant/colorConstant';
import {GET_ALL_STORES_LIST} from '../../api/store';
import Constants from '../../Comman/Constants';

export default function Checkout({route, navigation}) {
  const {t} = useTranslation();
  const [orders, setOrders] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeliveryActive, setDeliveryActive] = useState(true);
  const [isDeliveryMethodActive, setDeliveryMethodActive] = useState(false);
  const [isPaymentActive, setPaymentActive] = useState(false);
  const [isAdditionalActive, setAdditionalActive] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');
  const [deliveryTypeData, setDeliveryTypeData] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState({});
  const [paymentMethod, setPaymentMethod] = useState({});
  const [additionaMethod, setAdditionalMethod] = useState({});
  const [discountApplied, setDiscountApplied] = useState({});
  const [subTotal, setSubTotal] = useState('');
  const [cartData, setCartData] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [totalIncludingText, setTotalIncludingText] = useState('');
  const [deliveryMethodsData, setDeliveryMethodsData] = useState([]);

  useEffect(() => {
    console.log('Checkout', route.params);
    setOrders(route?.params?.cart?.items);
    setCartData(route?.params?.cart);
  }, []);

  const renderHeader = () => {
    return (
      <View style={[styles.navBarView, styles.devider]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.navBarText}>{Constants.Laungagues.checkout == null ? 'Checkout' : Constants.Laungagues.checkout}</Text>
      </View>
    );
  };
  const renderBorder = () => {
    return <View style={styles.devider} />;
  };
  const renderOrders = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 24,
              fontWeight: '500',
              color: COLORS_NEW.mainBlack,
            }}>
            {Constants.Laungagues.your_order}
          </Text>
          <Text
            style={{
              minWidth: 20,
              height: 20,
              marginHorizontal: 10,
              textAlign: 'center',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: COLORS_NEW.activeButton,
              paddingHorizontal: 4,
              flexWrap: 'wrap',
            }}>
            {orders.length}
          </Text>
        </View>
        <FlatList
          extraData={orders}
          data={orders}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingVertical: 16, paddingHorizontal: 20}}
          horizontal
          keyExtractor={(item, index) => 'index' + index}
          ItemSeparatorComponent={() => {
            return <View style={{marginHorizontal: 3}} />;
          }}
          renderItem={(item, index) => {
            console.log('image', item?.item?.product?.image?.url);
            return (
              <View
                style={{
                  overflow: 'hidden',
                  height: 60,
                  width: 60,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: COLORS_NEW.black,
                }}>
                <ImageBackground
                  source={{uri: item?.item?.product?.image?.url}}
                  style={{height: 60, width: 60, aspectRatio: 9 / 16}}
                />
              </View>
            );
          }}
        />
        {renderBorder()}
      </>
    );
  };
  const getActiveColor = active => {
    return active ? 'rgba(43, 40, 38, 1)' : 'rgba(43, 40, 38, 0.4)';
  };
  const onSelectSwitch = index => {
    console.log(index);
  };
  const getStoreList = async () => {
    setLoading(true);

    let res = await GET_ALL_STORES_LIST();
    setLoading(false);

    if (res?.StorePickUpData) {
      console.log('GET_ALL_STORES_LIST', res);
      // setStoreList(res?.StorePickUpData?.allStoreLocation
      // );
      // console.warn(res?.StorePickUpData?.allStoreLocation);
      navigation.navigate('AddressBookList', {
        storeList: res?.StorePickUpData?.allStoreLocation
        ,
      });
    }
  };
  const renderBeforeAddressSelect = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddressBookList', {
              selectedAddress: deliveryTypeData,
              onAddressFetch: onAddressFetch,
            });
          }}
          style={{
            height: 48,
            marginVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(43, 40, 38, 0.1)',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: colorConstant.BLACK,
            }}>
            {Constants.Laungagues.delivery == null ? 'Delivery' : Constants.Laungagues.delivery}
          </Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', color: colorConstant.BLACK}}>
          {Constants.Laungagues.or == null ? 'or' : Constants.Laungagues.or}
        </Text>
        <TouchableOpacity
          style={{
            height: 48,
            marginVertical: 12,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'rgba(43, 40, 38, 0.1)',
          }}
          onPress={getStoreList}>
          <Text
            style={{
              // flex: 1,
              textAlign: 'center',
              color: colorConstant.BLACK,
            }}>
            {Constants.Laungagues.pickup == null ? 'Pickup' : Constants.Laungagues.pickup}
          </Text>
        </TouchableOpacity>
      </>
    );
  };
  const onAddressFetch = item => {
    console.log(item);
    setDeliveryTypeData(item);
    setDeliveryMethodsData(item?.available_shipping_methods);
  };
  const renderAfterAddressSelect = () => {
    return (
      <>
        <View style={{alignItems: 'center'}}>
          <CustomSwitch
            selectionMode={2}
            roundCorner={true}
            option1={Constants.Laungagues.delivery == null ? 'Delivery' : Constants.Laungagues.delivery}
            option2={Constants.Laungagues.pickup == null ? 'Pickup' : Constants.Laungagues.pickup}
            onSelectSwitch={onSelectSwitch}
            selectionColor={COLORS_NEW.blue}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 24,
            marginBottom: 8,
            justifyContent: 'space-between',
          }}>
          <Text>{Constants.Laungagues.address == null ? 'Address' : Constants.Laungagues.address}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddressBookList', {
                selectedAddress: deliveryTypeData,
                onAddressFetch: onAddressFetch,
              });
            }}>
            <EditPencilSVG />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: fontConstant.gambetta,
            fontSize: 14,
            letterSpacing: 2,
            color: COLORS_NEW.mainBlack,
          }}>
          {`${deliveryTypeData?.street?.toString()} ${
            deliveryTypeData?.postcode
          }`}
        </Text>
        <Text
          style={{
            fontFamily: fontConstant.gambetta,
            fontSize: 14,
            marginTop: 8,
            letterSpacing: 2,
            color: COLORS_NEW.mainBlack,
          }}>
          {`${deliveryTypeData?.firstname}`}
        </Text>
      </>
    );
  };
  const renderDeliveryDetails = () => {
    return (
      <View style={[styles.methodView]}>
        <TouchableOpacity
          onPress={() => {
            setDeliveryActive(!isDeliveryActive);
          }}
          style={styles.methodClick}>
          <PinSVG color={getActiveColor(isDeliveryActive)} />
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 20,
              marginLeft: 14,
              fontWeight: isDeliveryActive ? '500' : '200',
              color: getActiveColor(isDeliveryActive),
            }}>
            {Constants.Laungagues.delivery_details == null ? 'Delivery details' : Constants.Laungagues.delivery_details}
          </Text>
        </TouchableOpacity>
        {isObjectNullOrUndefined(deliveryTypeData)
          ? renderBeforeAddressSelect()
          : renderAfterAddressSelect()}
      </View>
    );
  };
  const callDeliveryMethodApi = async item => {
    const res = await SET_DELIVERY_CHECKOUT_METHOD({
      carrier_code: item.carrier_code,
      method_code: item.method_code,
    });
    if (res) {
      console.log('onPaymentSelection', item);
    }
  };
  const rendeDeliveryMethodsItem = item => {
    console.log('rendeDeliveryMethodsItem', item);
    return (
      <TouchableOpacity
        onPress={() => {
          setDeliveryMethod(item);
          callDeliveryMethodApi(item);
        }}
        style={{flex: 1, marginTop: 16, flexDirection: 'row'}}>
        {deliveryMethod?.method_code === item.method_code ? (
          <CheckedRadioSVG />
        ) : (
          <UnCheckedRadioSVG />
        )}
        <View style={{flex: 1, marginHorizontal: 20}}>
          <Text style={{letterSpacing: 1, color: colorConstant.BLACK}}>
            {item?.method_code}
          </Text>
          <Text style={{letterSpacing: 1, color: colorConstant.BLACK}}>
            {item?.method_title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const rendePaymentItem = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          // setPaymentMethod(item);
          navigation.navigate('Payment', {
            payment: cartData?.available_payment_methods,
          });
        }}
        style={{flex: 1, marginTop: 16, flexDirection: 'row'}}>
        {paymentMethod?.code === item.code ? (
          <CheckedRadioSVG />
        ) : (
          <UnCheckedRadioSVG />
        )}
        <View style={{flex: 1, marginHorizontal: 20}}>
          <Text style={{letterSpacing: 1}}>{item?.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderDeliveryMethods = () => {
    return (
      <View style={[styles.methodView]}>
        <TouchableOpacity
          onPress={() => {
            setDeliveryMethodActive(!isDeliveryMethodActive);
          }}
          style={styles.methodClick}>
          <DeliverySVG color={getActiveColor(isDeliveryMethodActive)} />
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 20,
              marginLeft: 14,
              fontWeight: isDeliveryMethodActive ? '500' : '200',
              color: getActiveColor(isDeliveryMethodActive),
            }}>
            {Constants.Laungagues.delivery_method == null ? 'Delivery method' : Constants.Laungagues.delivery_method}
          </Text>
        </TouchableOpacity>
        {deliveryMethodsData.map((item, index) => {
          return rendeDeliveryMethodsItem(item);
        })}
      </View>
    );
  };
  const onPaymentSelection = async item => {
    setPaymentMethod(item);
    const res = await SAVE_PAYMENT_METHOD({code: item.code});
    if (res) {
      console.log('onPaymentSelection', item);
    }
  };
  const renderPaymentDetails = () => {
    return (
      <View style={[styles.methodView]}>
        <TouchableOpacity
          onPress={() => {
            // setPaymentActive(!isPaymentActive);
            navigation.navigate('Payment', {
              payment: cartData?.available_payment_methods,
              onPaymentSelection: onPaymentSelection,
            });
          }}
          style={styles.methodClick}>
          <CreaditSVG color={getActiveColor(isPaymentActive)} />
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 20,
              marginLeft: 14,
              flex: 1,
              fontWeight: isPaymentActive ? '500' : '200',
              color: getActiveColor(isPaymentActive),
            }}>
            {Constants.Laungagues.payment == null ? 'Payment' : Constants.Laungagues.payment}
          </Text>
          {
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Payment', {
                  payment: cartData?.available_payment_methods,
                  onPaymentSelection: onPaymentSelection,
                });
              }}>
              {!isObjectNullOrUndefined(paymentMethod) ? (
                <EditPencilSVG />
              ) : (
                <ArrowRightGray />
              )}
            </TouchableOpacity>
          }
        </TouchableOpacity>
        {!isObjectNullOrUndefined(paymentMethod) && (
          <Text style={{marginTop: 16, color: colorConstant.BLACK}}>
            {paymentMethod?.title}
          </Text>
        )}
      </View>
    );
  };
  const renderAdditionalDetails = () => {
    return (
      <View style={[styles.methodView]}>
        <TouchableOpacity
          onPress={() => {
            setAdditionalActive(!isAdditionalActive);
          }}
          style={styles.methodClick}>
          <PercentSVG color={getActiveColor(isAdditionalActive)} />
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 20,
              marginLeft: 14,
              fontWeight: isAdditionalActive ? '500' : '200',
              color: getActiveColor(isAdditionalActive),
            }}>
            {Constants.Laungagues.additional == null ? t('Additional') : Constants.Laungagues.additional}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderOrderSummery = () => {
    return (
      <View
        style={{
          backgroundColor: COLORS_NEW.beige,
          margin: 20,
          borderRadius: 20,
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: fontConstant.gambetta,
            fontSize: 24,
            color: COLORS_NEW.mainBlack,
          }}>
          {Constants.Laungagues.order_summary == null ? t('Order summary') : Constants.Laungagues.order_summary}
        </Text>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 12,
              color: COLORS_NEW.pineTree,
            }}>
            {Constants.Laungagues.subtotal == null ? t('Subtotal').toUpperCase() : Constants.Laungagues.subtotal}
          </Text>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 12,
              color: COLORS_NEW.mainBlack,
            }}>
            {cartData?.prices
              ? `${cartData?.prices?.subtotal_excluding_tax?.value} ${cartData?.prices?.subtotal_excluding_tax?.currency}`
              : ''}
          </Text>
        </View>
        {!isObjectNullOrUndefined(deliveryMethod) && (
          <View
            style={{
              marginBottom: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontConstant.gambetta,
                fontSize: 12,
                color: COLORS_NEW.pineTree,
              }}>
              {Constants.Laungagues.shipping == null ? t('Shipping').toUpperCase() : Constants.Laungagues.shipping}
            </Text>
            <Text
              style={{
                fontFamily: fontConstant.gambetta,
                fontSize: 12,
                color: colorConstant.BLACK,
              }}>
              {deliveryMethod?.method_title}
            </Text>
          </View>
        )}
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 12,
              color: COLORS_NEW.pineTree,
            }}>
            {Constants.Laungagues.discount_code == null ? t('Discount code').toUpperCase() : Constants.Laungagues.discount_code}
          </Text>
          {isObjectNullOrUndefined(discountApplied) ? (
            <TouchableOpacity onPress={() => {}}>
              <ArrowRightSVG />
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                fontFamily: fontConstant.gambetta,
                fontSize: 12,
                color: COLORS_NEW.mainBlack,
              }}>
              {/* {cartData?.prices
                      ? `${cartData?.prices?.discounts} ${cartData?.prices?.subtotal_including_tax?.currency}`
                      : ''} */}
            </Text>
          )}
        </View>
        {renderBorder()}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 16,
              color: COLORS_NEW.mainBlack,
            }}>
            {Constants.Laungagues.total_including_taxes == null ? 'Total including taxes' : Constants.Laungagues.total_including_taxes}
          </Text>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontSize: 16,
              color: COLORS_NEW.mainBlack,
            }}>
            {cartData?.prices
              ? `${cartData?.prices?.subtotal_including_tax?.value} ${cartData?.prices?.subtotal_including_tax?.currency}`
              : ''}
          </Text>
        </View>
      </View>
    );
  };
  const renderButtonView = () => {
    return (
      <View style={{margin: 20}}>
        <AppButton
          disabled={
            !isObjectNullOrUndefined(deliveryTypeData) ||
            !isObjectNullOrUndefined(paymentMethod) ||
            // isObjectNullOrUndefined(additionaMethod) ||
            !isObjectNullOrUndefined(deliveryMethod)
            // false
          }
          preset="primary"
          text={
            Constants.Laungagues.confirm_payment == null ? 'Confirm payment' : Constants.Laungagues.confirm_payment +
            ` ${
              cartData?.prices
                ? `${cartData?.prices?.subtotal_including_tax?.value} ${cartData?.prices?.subtotal_including_tax?.currency}`
                : ''
            }`
          }
          onPress={() => confirmPaymentApi()}
        />
      </View>
    );
  };
  const confirmPaymentApi = async () => {
    //  navigation.navigate('Order')
    //  navigation.navigate('Main')

    setLoading(true);
    const res = await CONFIRM_PAYMENT_METHOD();
    setLoading(false);
    if (res) {
      console.log(res);
      Alert.alert('', 'Order placed successfully.', [
        {
          text: 'Okay',
          onPress: () => {
            navigation.popToTop();
            navigation.navigate('OrderCart');
          },
        },
      ]);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar backgroundColor={COLORS_NEW.white} />
      {renderHeader()}
      <ScrollView style={styles.ScrollView}>
        {renderOrders()}
        {renderDeliveryDetails()}
        {!isArrayNullOrEmpty(deliveryMethodsData) && renderDeliveryMethods()}
        {renderPaymentDetails()}
        {renderAdditionalDetails()}
        {renderOrderSummery()}
        {renderButtonView()}
      </ScrollView>
      <Loader loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 32,
  },
  mainView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  methodView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: 1,
  },
  methodClick: {flexDirection: 'row', alignItems: 'center'},
  devider: {borderBottomColor: '#EEEDE7', borderBottomWidth: 1},
  navBarImage1: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  navBarText: {
    fontSize: 16,
    color: COLORS_NEW.black,
    textAlign: 'center',
    flex: 1,
  },
});
