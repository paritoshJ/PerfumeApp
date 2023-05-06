/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Metrics from '../../Helper/metrics';

import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import {ScrollView} from 'react-native-gesture-handler';
import perfumedata from '../../utils/perfumedata';
import ProductCard from '../../Component/ProducCard';
import Swipeout from 'react-native-swipeout';
import MyStatusBar from '../../Component/MyStatusBar';
import fontConstant from '../../constant/fontConstant';
import { useTranslation } from 'react-i18next'
import colorConstant from '../../constant/colorConstant';
import {EMPTY_CART} from "../../api/getEmptyCart";
import {CART_DATA} from "../../api/getCartData";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartBagSVG from '../../assets/svg/CartBag';
import EmptyPageView from '../../Component/EmptyPageView';
import { useFocusEffect } from '@react-navigation/native';

// const CART_DATA = [
//   {
//     id: '1',
//     image: require('../../../assets/per.png'),
//     title: 'Amber Wood Noir',
//     keyWord: 'EAU DE PARFUME / 75ML / WOMAN',
//     price: '48',
//     discountPrice: '24',
//   },
//   {
//     id: '2',
//     image: require('../../../assets/per-2.png'),
//     title: 'Amber Wood Noir',
//     keyWord: 'EAU DE PARFUME / 75ML / WOMAN',
//     price: '48',
//     discountPrice: '24',
//   },
// ];
export default function MyCartScreen({navigation}) {
  const [isEmpty, setIsEmpty] = useState(true);
  const [cartId, setCartId] = useState("");
  const [orderClick, setOrderClick] = useState(false);
  const [cartLst, setCartList] = useState([]);
  const { t } = useTranslation();
  const [errorTitle, setErrorTitle] = useState('Your cart is empty');
  const [errorMessage, setErrorMessage] = useState(' Find products in the catalog or through the search.');

  // useEffect(async ()=>{
  //  const cart_id =  await AsyncStorage.getItem('CART_ID');
  //  if(cart_id){
  //   setCartId(cart_id);
  //  }
  // },[])

  const renderEmptyAndNoLogin = () =>{
  return <EmptyPageView 
          icon={<CartBagSVG/>}
          title={errorTitle}
          message={errorMessage}
          hideAddButton={false}
          buttonTitle={t('Go shopping')}
          onButtonPress={()=>{}}
          
            />
  }
  const renderItem = ({item, index}) => {
    return (
      <>
        <ProductCard item={item} offer={false} onSizeSelect={(data)=>{}} 
      onFullItemPress ={() => {
          // setSelectedProduct(item);
          // setonOpenDailog(true);
        }} />
      </>
    );
  };

  var swipeoutBtns = [
    {
      component: (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: '50%',
          }}>
          <Image
            style={styles.swipeButton}
            source={require('../../../assets/cart-like-button.png')}
          />
          <Image
            style={styles.swipeButton}
            source={require('../../../assets/cart-delete-button.png')}
          />
        </View>
      ),
      backgroundColor: COLORS_NEW.white,
    },
  ];

  const handleCartId = async () => {
      let res = await EMPTY_CART();
      console.log(res);
      if (res && res?.createEmptyCart) {
        try {
    // await AsyncStorage.setItem('CART_ID', res?.createEmptyCart);
  setCartId(res?.createEmptyCart)
  } catch (e) {
    // saving error
    console.log(e);
  }
        
      }
  }

  const handleCartData = async (cartId) => {
    let res = await CART_DATA(cartId);
    if(res)
    setCartList(res);

    console.log("CART_DATA", res);
    // AsyncStorage.setItem('CART_ID', res);
    // setCartId(res?.createEmptyCart)
}

  // useEffect(() => {
  //   handleCartId()
  // },[])
  useEffect(() => {
    handleCartData(cartId)
    console.log("cartId", cartId)
  },[cartId])

  


  return (
    <SafeAreaView style={{flex:1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View style={styles.navBarView}>
        <Text style={styles.navBarText}>{t('My cart')}</Text>
      </View>
      {!isEmpty ? renderEmptyAndNoLogin() : (
        <ScrollView>
          <View style={styles.cartDetailView}>
            {cartLst.length>0 && cartLst.map(item => {
              return (
                <Swipeout
                  right={swipeoutBtns}
                  backgroundColor={COLORS_NEW.white}
                  buttonWidth={120}>
                  <View
                    style={{
                      flexDirection: 'row',
                      borderBottomColor: COLORS_NEW.lightGray,
                      borderBottomWidth: 1,
                    }}>
                    <View>
                      <Image
                        style={styles.cartPerfumeImage}
                        source={item.image}
                      />
                    </View>
                    <View
                      style={{
                        margin: Metrics.rfv(10),
                        justifyContent: 'space-evenly',
                      }}>
                      <Text
                        style={{
                          fontSize: Metrics.rfv(16),
                          fontWeight: 600,
                          color: COLORS_NEW.black,
                          fontFamily: fontConstant.satoshi,
                          fontStyle: 'normal',
                        }}>
                        {t('Amber Wood Noir')}
                      </Text>
                      <Text
                        style={{
                          fontSize: Metrics.rfv(12),
                          fontWeight: 300,
                          color: COLORS_NEW.gray,
                          fontFamily: fontConstant.satoshi,
                          fontStyle: 'normal',
                        }}>
                        EAU DE PARFUME / 75ML / WOMAN
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            fontSize: Metrics.rfv(16),
                            color: COLORS_NEW.blue,
                            fontWeight: 800,
                            fontFamily: fontConstant.satoshi,
                            fontStyle: 'normal',
                          }}>
                          {item.discountPrice} {t('AED')}
                        </Text>
                        <Text
                          style={{
                            marginHorizontal: Metrics.rfv(10),
                            textDecorationLine: 'line-through',
                            textDecorationStyle: 'solid',
                            fontSize: Metrics.rfv(16),
                            opacity: 0.3,
                            color: COLORS_NEW.black,
                            fontFamily: fontConstant.satoshi,
                            fontStyle: 'normal',
                          }}>
                          {item.price} {t('AED')}
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Image
                          style={styles.plusMinusButton}
                          source={require('../../../assets/minus-button.png')}
                        />
                        <Text
                          style={{
                            marginHorizontal: Metrics.rfv(5),
                            fontFamily: fontConstant.satoshi,
                            fontStyle: 'normal',
                            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
                            fontWeight: fontConstant.WEIGHT_LEIGHT,
                          }}>
                          2
                        </Text>
                        <Image
                          style={styles.plusMinusButton}
                          source={require('../../../assets/plus-button.png')}
                        />
                      </View>
                    </View>
                  </View>
                </Swipeout>
              );
            })}
            <View style={styles.orderSummaryView}>
              <View
                style={styles.refundView}
                onPress={() => setOrderClick(!orderClick)}>
                <Text style={styles.orderNumberText}>{t('Order summary')}</Text>
              </View>
              {/* Total View */}
              <View style={styles.totalView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomColor: '#EEEDE7',
                    borderBottomWidth: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: fontConstant.satoshi,
                      fontStyle: 'normal',
                      fontSize: fontConstant.TEXT_12_SIZE_REGULAR,
                      fontWeight: fontConstant.WEIGHT_LEIGHT,
                    }}>
                    
                    {t('Subtotal')}
                  </Text>
                  <Text style={styles.CreditCardNumberView}>117.00 {t('AED')}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: Metrics.rfv(30),
                  }}>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: 600,
                      fontFamily: fontConstant.satoshi,
                      fontStyle: 'normal',
                      color: colorConstant.BLACK,
                    }}>
                    {t('Total including taxes')}
                  </Text>
                  <Text
                    style={{
                      fontSize: Metrics.rfv(15),
                      fontWeight: 600,
                      color: COLORS_NEW.black,
                      fontFamily: fontConstant.satoshi,
                      fontStyle: 'normal',
                    }}>
                    117.00 {t('AED')}
                  </Text>
                </View>
              </View>
            </View>
            {/* Recommended Product View */}
            <View style={{marginTop: Metrics.rfv(20)}}>
              <Text
                style={{
                  color: COLORS_NEW.black,
                  fontFamily: fontConstant.gambetta,
                  fontStyle: 'italic',
                  fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
                  fontWeight:fontConstant.WEIGHT_REGULAR,
                  marginVertical: Metrics.rfv(20),
                }}>
                {t('Recommended products')}
              </Text>
              <View style={{width: '100%'}}>
                <FlatList
                  data={perfumedata}
                  renderItem={renderItem}
                  horizontal={true}
                              ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}

                  keyExtractor={item => item.id}
                  // ListFooterComponent={renderFooter}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            {/* CheckOut Button */}
            <View style={{marginVertical: Metrics.rfv(10)}}>
              <AppButton
                preset="primary"
                text={t('Checkout')}
                onPress={() => navigation.navigate('Checkout')}
                style={{marginTop: Metrics.rfv(16),}}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.rfv(20),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
    padding: Metrics.rfv(10),
    borderBottomColor: '#EEEDE7',
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
    textAlign: 'center',
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(15),
    paddingTop: Metrics.rfv(3),
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: Metrics.rfv(1),
  },
  loginPageComponentText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginPageComponent: {
    width: Metrics.rfv(20),
    height: Metrics.rfv(20),
    marginBottom: Metrics.rfv(5),
    resizeMode: 'contain',
  },
  profileInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(15),
    paddingTop: Metrics.rfv(3),
  },
  bodyText: {
    color: COLORS_NEW.black,
    fontSze: Metrics.rfv(14),
    marginBottom: Metrics.rfv(10),
  },
  PageArrow: {
    width: Metrics.rfv(10),
    height: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    resizeMode: 'contain',
  },
  loginPageComponentview2: {
    marginLeft: Metrics.rfv(15),
    marginTop: Metrics.rfv(1),
    color: COLORS_NEW.black,
  },
  FirstView: {
    marginTop: Metrics.rfv(10),
  },
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
  },
  text1: {
    fontSize: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
    fontFamily: fontConstant.gambetta,
    fontStyle: 'normal',
  },
  text2: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(10),
    textAlign: 'center',
    color: COLORS_NEW.black,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
  cartPerfumeImage: {
    height: Metrics.rfv(130),
    width: Metrics.rfv(130),
    resizeMode: 'contain',
    marginBottom: Metrics.rfv(10),
  },
  cartDetailView: {
    flex: 1,
    margin: Metrics.rfv(20),
  },
  plusMinusButton: {
    height: Metrics.rfv(20),
    width: Metrics.rfv(20),
    resizeMode: 'contain',
  },
  orderSummaryView: {
    marginTop: Metrics.rfv(10),
    marginHorizontal: Metrics.rfv(10),
    borderRadius: Metrics.rfv(20),
    backgroundColor: '#F9F5F1',
  },
  refundView: {
    flexDirection: 'row',
    marginVertical: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
  },
  totalView: {
    marginHorizontal: Metrics.rfv(20),
  },
  CreditCardNumberView: {
    fontSize: Metrics.rfv(14),
    marginBottom: Metrics.rfv(10),
    color: colorConstant.BLACK,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
  orderNumberText: {
    fontSize: Metrics.rfv(18),
    fontWeight: '500',
    paddingHorizontal: Metrics.rfv(20),
    color: COLORS_NEW.black,
    fontFamily: 'Gambetta-BoldItalic',
  },
  swipeButton: {
    height: Metrics.rfv(40),
    width: Metrics.rfv(40),
    resizeMode: 'contain',
  },
});