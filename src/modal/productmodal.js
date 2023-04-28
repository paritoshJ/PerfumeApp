import React, {useState} from 'react';
import {
  Alert,
  BackHandler,
  I18nManager,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MyStatusBar from '../Component/MyStatusBar';
import colorConstant from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import imageConstant from '../constant/imageConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {navigationRef} from '../Navigator/utils';
import {useTranslation} from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { isStringNotNull } from '../Helper/helper';

const ProductModal = props => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const {onOpenDailog, setOnOpenDailog, image, title, price, cat, offer, displaySize1, sku,finalPrice,regularPrice} = props;
  const [selected, setSelected] = useState('50 ml');

  const closeDailog = () => {
    setOnOpenDailog(false);
  };

  const handleAddToCart = () => {
    if (sku) {
      navigation.navigate('My cart')
    }
  }

  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.6)"
      backdropOpacity={1}
      animationType="slide"
      transparent={true}
      isVisible={onOpenDailog}
      onRequestClose={() => {
        // closeDailog();
      }}
      onBackdropPress={() => {
        // closeDailog();
      }}>
      {/* <MyStatusBar backgroundColor={'rgba(0, 0, 0, 0.6)'} /> */}
      <View style={style.centeredView}>
        <View
          style={{
            minHeight: 450,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding:16,
          }}>
          <View
            style={{
              flex:1,
              backgroundColor: 'rgba(248, 244, 241, 1)',
              justifyContent: 'center',
              alignItems:'center',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            }}>
            <Image source={{uri: image}} style={{width: 150, height: 100}} />
             <AntDesign
                  name="close"
                  size={22}
                  color={colorConstant.DARK_PRIMARY}
                  onPress={() => {props.setOnOpenDailog(false)}}
                  style={{position:'absolute' ,right:10, top:10, transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
                />
                {!isStringNotNull(offer) && (
            <View
              style={{
                width: 35,
                height: 20,
                backgroundColor: colorConstant.BLACK,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                position:'absolute' ,left:0, top:0, transform:[{scaleX:I18nManager.isRTL? -1 : 1}]
              }}>
              <Text
                style={{
                  color: colorConstant.WHITE,
                  fontSize: fontConstant.TEXT_10_SIZE_REGULAR,
                  fontStyle: 'normal',
                  fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
                }}>
                {'20%'}
              </Text>
            </View>
          )}
          </View>
          <View style={{marginTop:14}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={style.product_name}>{title}</Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  props.setOnOpenDailog(false)
                  setTimeout(() => {
                    // navigationRef.navigate('ProductPage',{});
                    //  console.log('item?.sku',item?.sku);
        navigationRef.navigate('ProductPage',{skuID:props.item?.sku});
                  }, 500);
                  
                  
                }}>
                <Text style={{color: colorConstant.DARK_PRIMARY}}>
                  {t('More')}
                </Text>
                <AntDesign
                  name="arrowright"
                  size={16}
                  color={colorConstant.DARK_PRIMARY}
                  onPress={() => {}}
                  style={{marginLeft: 10,transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical:6,
                alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
              }}>
              <Text
                style={{
                  fontFamily: fontConstant.satoshi,
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: fontConstant.WEIGHT_LEIGHT,
                  color: colorConstant.LIGHT_TEXT,
                }}>
                {`${cat} / ${props.item.customAttributesAjmalData[0]?.gender}`}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={[
                  style.product_size,
                  {
                    borderColor:
                      selected == displaySize1
                        ? 'rgba(188, 139, 87, 0.9)'
                        : 'rgba(43, 40, 38, 0.1)',
                  },
                ]}
                onPress={() => {
                  setSelected(selected === displaySize1 ? '' : displaySize1);
                }}>
                <Text style={style.product_size_text}>{displaySize1}</Text>
              </TouchableOpacity>
            </View>
            <View style={style.price_view}>
              <Text style={style.offer_price}>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
             {finalPrice?.value < regularPrice?.value &&  <Text
                style={[
                  style.offer_price,
                  {
                    marginLeft: 10,
                    color: colorConstant.LIGHT_GREY,
                    textDecorationLine: 'line-through',
                  },
                ]}>
               {`${regularPrice?.value} ${regularPrice?.currency}`}
              </Text>}
            </View>
            <View style={style.add_card_view}>
              <View
                  style={{
                    backgroundColor: 'rgba(188, 139, 87, 0.1)',
                    borderRadius:36,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={imageConstant.mins}
                    style={{width: 20, height: 20,marginHorizontal:12,}}
                    resizeMode="contain"
                  />
                  <Text style={style.product_size_text}>1</Text>
                  <Image
                    source={imageConstant.plus}
                    style={{width: 20, height: 20, marginHorizontal:12}}
                    resizeMode="contain"
                  />
                </View>
              <TouchableOpacity
                onPress={() => handleAddToCart()}
                style={{
                  alignItems: 'center',
                  marginLeft: 10,
                  flex:1,
                }}>
                <View
                  id={sku}
                  style={[
                    style.review_add_view,
                    {backgroundColor: colorConstant.DARK_PRIMARY},
                  ]}>
                  <Text
                    style={[style.text_viewall, {color: colorConstant.WHITE}]}>
                    {t('Add to cart')}
                  </Text>
                </View>
              </TouchableOpacity>
               <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    backgroundColor: 'rgba(188, 139, 87, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <MaterialIcons
                    name="favorite-border"
                    size={22}
                    color={colorConstant.DARK_PRIMARY}
                    onPress={() => {}}
                  />
                </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  product_name: {
    fontFamily: fontConstant.gambetta,
    fontSize: 18,
    fontStyle: 'italic',
    flex:1,
    // fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
    // paddingTop: 15,
  },
  product_size: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal:16,
    paddingVertical:12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offer_price: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  price_view: {flexDirection: 'row', marginTop: 16,},
  add_card_view: {
    alignSelf: 'center',
    marginVertical: 16,
    justifyContent:'space-between',
    flexDirection: 'row',
  },
  review_add_view: {
    borderRadius: 36,
    paddingHorizontal:56,
    paddingVertical:12,
    alignItems: 'center',
  },
  text_viewall: {
    color: colorConstant.DARK_PRIMARY,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  product_size_text: {
    color: colorConstant.BLACK,
  }
});

export default ProductModal;
