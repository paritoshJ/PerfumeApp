/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  I18nManager,
  SafeAreaView,
  FlatList, Alert,
  DeviceEventEmitter
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import CustomSwitch from '../../Component/toggleFilter';
import ProductCard from '../../Component/ProducCard';
import PerfumeData from '../../utils/perfumedata';
import {FlatGrid} from 'react-native-super-grid';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../Component/MyStatusBar';
import { GET_WISHLIST_PRODUCTS } from '../../api/getWishlistApi';
import EmptyPageView from '../../Component/EmptyPageView';
import HeartSVG from '../../assets/svg/Heart';
import CartBagSVG from '../../assets/svg/CartBag';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../Component/Loader';
import colorConstant from '../../constant/colorConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import fontConstant from '../../constant/fontConstant';
import { EMPTY_CART } from '../../api/getEmptyCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Constants from '../../Comman/Constants';

export default function WishList({navigation}) {
  const navigationn = useNavigation();

  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [feed, setFeed] = useState(true);
  const [errorTitle, setErrorTitle] = useState(Constants.Laungagues.you_have_no_saved_items);
  const [errorMessage, setErrorMessage] = useState('Start saving as you shop by selecting the little heart.');
  const [data, setData] = useState([]);
  const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];
  const onSelectSwitch = index => {
  };
  useFocusEffect(
    React.useCallback(() => {
      setData([])
      setLoading(true);
      getWishListProducts();

      return () => { };
    }, []),
  );


  const getWishListProducts = () => {
    GET_WISHLIST_PRODUCTS().then((res) => {
      setLoading(false);
      setData(res.wishlist.items);
      console.log('GET_WISHLIST_PRODUCTS',res);
    }).catch((err)=>{
      setLoading(false);
      console.log('err==>', err)
      if (err == "ApolloError: The current user cannot perform operations on wishlist") {
        Alert.alert('Session Expired', 'Your session has expired. Please login again to continue working.', [

          {
            text: 'OK', onPress: async () => {

              try {
                DeviceEventEmitter.emit('event.logout', {});
                await AsyncStorage.setItem('token', '');
                createEmptyCartForLogout();
                navigation.navigate('Profile');

              } catch (error) {
                console.log(error);
              }
              setTimeout(() => {

              }, 500);
            }
          },
        ]);
      }
    })
  }
  const createEmptyCartForLogout = async () => {
    let res = await EMPTY_CART();
    console.log('res', res);
    if (res && res?.createEmptyCart) {
      try {
        await AsyncStorage.setItem('CART_ID', res?.createEmptyCart);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const renderEmptyAndNoLogin = () =>{
  return <EmptyPageView 
          icon={<HeartSVG/>}
          title={errorTitle}
          message={errorMessage}
          hideAddButton={false}
          onButtonPress={()=>{}}
          buttonTitle={'Go shopping'}
          />
  }
  function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }
  const renderItem = ({ item, index }) => {
    let name = item.name;
    console.log('item:=>', item)
    let finalPrice = {};
    let regularPrice = {};
    var image = '';
    // let finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
    // let regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];
    finalPrice = item?.product.price?.regularPrice?.amount;
    regularPrice = item?.product.price?.regularPrice?.amount;
    image = item.product.image.url
    console.log('image:=>', image)

    // if (isHome) {
    //   finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
    //   regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];
    //   image = item?.image;
    // } else {
    //   finalPrice = item?.price_range?.minimum_price?.final_price;
    //   regularPrice = item?.price_range?.minimum_price?.regular_price;
    //   image = item?.image[0]?.url
    // }
    return (
      <TouchableOpacity
        key={item}
        // onPress={() => props?.onFullItemPress()}
        style={{
          // flex: 1,
          marginLeft: '1.2%',
          marginRight: '1.2%',
          marginTop: index == 0 || index == 1 ? 0 : '5%',
          width: '48%',
        }}>
        <View
          style={{
            height: 200,
            backgroundColor: getRandomColor(),
            borderRadius: 12,
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: 'center'
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {item?.product.price_range.maximum_price.final_price.value != '' ? <View
              style={{
                width: '22%',
                height: 20,
                backgroundColor: colorConstant.BLACK,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colorConstant.WHITE,
                  fontSize: fontConstant.TEXT_10_SIZE_REGULAR,
                  fontStyle: 'normal',
                  fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
                }}>
                {item?.product.price_range.maximum_price.discount.percent_off + '%'}
              </Text>
            </View> : <View />}
            {/* {isStringNotNull(item?.product.price_range.maximum_price.final_price.value) && (
              <View
                style={{
                  width: 35,
                  height: 20,
                  backgroundColor: colorConstant.BLACK,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colorConstant.WHITE,
                    fontSize: fontConstant.TEXT_10_SIZE_REGULAR,
                    fontStyle: 'normal',
                    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
                  }}>
                  {item?.product.price_range.maximum_price.final_price.value + '%'}
                </Text>
              </View>
            )} */}
            <View style={{ padding: 10 }}>
              <MaterialIcons
                name="favorite"
                size={22}
                color={colorConstant.DARK_PRIMARY}
                onPress={() => { }}
              />
            </View>
          </View>

          <Image
            source={{ uri: item.product.image.url }}
            style={{ width: '80%', height: '80%', alignSelf: 'center' }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 12, }}>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colorConstant.LIGHT_GREY,
            }}
            onPress={() => {
              props?.onSizeSelect();
            }}>
            <Text
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                fontFamily: fontConstant.satoshi,
                fontSize: 12,
                fontWeight: fontConstant.WEIGHT_LEIGHT,
                color: colorConstant.BLACK,
              }}>
              60
              {/* {item.customAttributesAjmalData[0].display_size} */}
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: fontConstant.WEIGHT_LEIGHT,
            color: colorConstant.LIGHT_TEXT,
          }}>
          {item.customAttributesAjmalData[0].display_category + ' / ' + item.customAttributesAjmalData[0].gender}
        </Text> */}
        <Text
          numberOfLines={2}
          style={{
            color: colorConstant.BLACK,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontStyle: 'italic',
            fontFamily: fontConstant.gambetta,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            marginTop: 6,
            textTransform: 'capitalize',
          }}>
          {item.product.name}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={{
            color: colorConstant.DARK_PRIMARY,
            fontStyle: 'normal',
            fontSize: fontConstant.TEXT_20_SIZE_BOLD,
            fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
          }}>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
          {finalPrice?.value < regularPrice?.value && <Text
            style={[

              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
                textDecorationLine: 'line-through',
                color: colorConstant.DARK_PRIMARY,
                fontStyle: 'normal',
                fontSize: fontConstant.TEXT_20_SIZE_BOLD,
                fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
              },
            ]}>
            {`${regularPrice?.value} ${regularPrice?.currency}`}
          </Text>}
        </View>
      </TouchableOpacity>

    );
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flex: 1 }}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
        {loading == false ? <ImageBackground
        source={require('../../../assets/wishlist-back.png')}
        resizeMode="stretch"
        style={styles.img}>
        <View style={styles.navBarView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: Metrics.rfv(15),
                height: Metrics.rfv(15),
                 resizeMode: 'contain',
                transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : [{ rotate: '0deg' }],
              }}
  
              source={require('../../../assets/back-white.png')}
            />
          </TouchableOpacity>

            <Text style={styles.navBarText}>{Constants.Laungagues.wishlist == null ? 'Wishlist' : Constants.Laungagues.wishlist}</Text>
          <TouchableOpacity>
            <Image style={styles.navBarImage1} source={''} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: Metrics.rfv(20),
            alignItems: 'center',
            justifyContent: 'center',
            top: 20,
            left: 0,
            right: 0,
            bottom: 0,
          }}>
          <CustomSwitch
            selectionMode={2}
            roundCorner={true}
              option1={Constants.Laungagues.sort == null ? 'Sort' : Constants.Laungagues.sort}
              option2={Constants.Laungagues.filters == null ? 'Filters' : Constants.Laungagues.filters}
            onSelectSwitch={onSelectSwitch}
            selectionColor={COLORS_NEW.lightGray}
          />
        </View>
        </ImageBackground> : <View />}

        <View style={{ height: '77%', }}>
        {data.length > 0 ? <FlatList
            style={{ paddingBottom: '20%', paddingLeft: '5%', paddingRight: '5%' }}
            numColumns={2}
              data={data}
              // contentContainerStyle={styles.scrollView}
          renderItem={renderItem}

        /> : loading == false ? renderEmptyAndNoLogin() : null}
        </View>

        <Loader loading={loading} />
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 16,
    marginTop: Metrics.rfv(20),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
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
    fontSize: Metrics.rfv(20),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
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
    marginBottom: Metrics.rfv(40),
  },
});