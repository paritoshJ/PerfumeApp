import React, {useState} from 'react';
import {
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

const ProductModal = props => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const {onOpenDailog, setOnOpenDailog, image, title, price, cat, offer, displaySize1, sku} = props;
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
        closeDailog();
      }}
      onBackdropPress={() => {
        closeDailog();
      }}>
      <MyStatusBar backgroundColor={'rgba(0, 0, 0, 0.6)'} />
      <View style={style.centeredView}>
        <TouchableOpacity
                style={{
                }}
                onPress={() => {
                  props.setOnOpenDailog(false);
                }}>
                
                <AntDesign
                  name="close"
                  size={22}
                  color={colorConstant.DARK_PRIMARY}
                  onPress={() => {}}
                  style={{marginLeft: 10,transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
                />
              </TouchableOpacity>
        <View
          style={{
            width: '100%',
            height: 450,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}>
          <View
            style={{
              width: '90%',
              height: 150,
              backgroundColor: 'rgba(248, 244, 241, 1)',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: '5%',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Image source={{uri: image}} style={{width: 150, height: 100}} />
          </View>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <View
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: '3%',
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
                  navigationRef.navigate('ProductPage');
                }}>
                <Text style={{color: colorConstant.DARK_PRIMARY}}>
                  {t('More')}
                </Text>
                <AntDesign
                  name="arrowright"
                  size={22}
                  color={colorConstant.DARK_PRIMARY}
                  onPress={() => {}}
                  style={{marginLeft: 10,transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
              }}>
              <Text
                style={{
                  fontFamily: fontConstant.satoshi,
                  fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
                  fontStyle: 'normal',
                  fontWeight: fontConstant.WEIGHT_LEIGHT,
                  color: colorConstant.LIGHT_TEXT,
                }}>
                {cat}
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
                  setSelected(displaySize1);
                }}>
                <Text style={style.product_size_text}>{displaySize1}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.product_size,
                  {
                    borderColor:
                      selected == displaySize1
                        ? 'rgba(188, 139, 87, 0.9)'
                        : 'rgba(43, 40, 38, 0.1)',
                    marginLeft: 10,
                  },
                ]}
                onPress={() => {
                  setSelected(displaySize1);
                }}>
                <Text style={style.product_size_text}>{displaySize1}</Text>
              </TouchableOpacity>
            </View>
            <View style={style.price_view}>
              <Text style={style.offer_price}>{offer} AED</Text>
              <Text
                style={[
                  style.offer_price,
                  {
                    marginLeft: 10,
                    color: colorConstant.LIGHT_GREY,
                    textDecorationLine: 'line-through',
                  },
                ]}>
                {price} AED
              </Text>
            </View>
            <View style={style.add_card_view}>
              <View
                style={{
                  width: '30%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: 'rgba(188, 139, 87, 0.1)',
                    borderRadius: 20,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={imageConstant.mins}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Text style={style.product_size_text}>1</Text>
                  <Image
                    source={imageConstant.plus}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleAddToCart()}
                style={{
                  width: '55%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 10,
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
                  width: '15%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
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
    fontSize: fontConstant.TEXT_27_SIZE_REGULAR,
    fontStyle: 'italic',
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
    // paddingTop: 15,
  },
  product_size: {
    width: 80,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offer_price: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  price_view: {flexDirection: 'row', marginTop: 15, marginLeft: 5},
  add_card_view: {
    width: '90%',
    height: 60,
    alignSelf: 'center',
    marginTop: '8%',
    marginBottom: '8%',
    flexDirection: 'row',
  },
  review_add_view: {
    width: 150,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text_viewall: {
    color: colorConstant.DARK_PRIMARY,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  product_size_text: {
    color: colorConstant.DARK_PRIMARY,
  }
});

export default ProductModal;
