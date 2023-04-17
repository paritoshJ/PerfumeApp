import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import colorConstant from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import imageConstant from '../constant/imageConstant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';
import {navigationRef} from '../Navigator/utils';

const ProductCard = props => {
  const {item, offer, wishlist} = props;
  const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];


  let name = item?.name;
  let price = item?.price_range?.minimum_price?.regular_price?.value;
  let fav = item?.name;
  let offers = item?.price_range?.minimum_price?.discount?.amount_off;
  let finalPrice = item?.price_range?.minimum_price?.final_price
?.value;
  let size =
    item?.customAttributesAjmalData !== undefined
      ? item?.customAttributesAjmalData[0]?.display_size
      : '';
  let cat =
    item?.customAttributesAjmalData !== undefined
      ? item?.customAttributesAjmalData[0]?.display_category
      : '';
  // let image = item?.media_gallery[0]?.url
  let image = item?.image.url;
  let imagetwo =
    item?.customAttributesAjmalData !== undefined
      ? item?.customAttributesAjmalData[0]?.rtop_note_image
      : '';
  let sku = item.sku;

  function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }

  return (
    <View style={{width: 180, flexDirection: 'column'}}>
      <View
        style={{
          width: wishlist ? 140 : 150,
          height: 200,
          backgroundColor: getRandomColor(),
          borderRadius: 20,
        }}>
        <View
          style={{
            width: '100%',
            justifyContent: offer ? 'space-between' : 'flex-end',
            flexDirection: 'row',
          }}>
          {offer && (
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
                50%
              </Text>
            </View>
          )}
          <View style={{padding: 10}}>
            {/* <Image
            source={imageConstant.fav}
            style={{
              width: 18,
              height: 18,
            }}
            resizeMode="contain"
          /> */}
            <MaterialIcons
              name="favorite-border"
              size={22}
              color={colorConstant.BLACK}
              onPress={() => {}}
            />
          </View>
        </View>

        {String(imagetwo).length > 5 && (
          <Image
            source={{uri: offer ? imagetwo : image}}
            // source={{uri: image}}
            // source={{
            //   uri: 'https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/media/catalog/product/cache/a71ef2688f252f761be19aa448a109e9/m/e/menu-img-2.jpg',
            // }}
            style={{width: '50%', height: 120, alignSelf: 'center'}}
            resizeMode="contain"
          />
        )}
      </View>

      <View
        style={{
          width: 200,
          // alignItems: 'center',
          justifyContent: 'center',
          marginTop: '5%',
          // alignItems:I18nManager.isRTL ? 'flex-start' : 'flex-end'
          // marginLeft: 20,
          // backgroundColor:"red"
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* <TouchableOpacity
            style={{
              // width: 40,
              height: 25,
              borderRadius: 20,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colorConstant.LIGHT_GREY,
            }}
            onPress={() => {
              setSelected(size);
            }}>
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily: fontConstant.satoshi,
                fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
                fontWeight: fontConstant.WEIGHT_LEIGHT,
                color: colorConstant.BLACK,
              }}>
              {size}
            </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              // width: 50,
              height: 25,
              borderRadius: 20,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
              borderColor: colorConstant.LIGHT_GREY,
            }}
            onPress={() => {
              // setSelected(size);
            }}>
            <Text
              style={{
                paddingLeft: 10,
                paddingRight: 10,
                fontFamily: fontConstant.satoshi,
                fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
                fontWeight: fontConstant.WEIGHT_LEIGHT,
                color: colorConstant.BLACK,
              }}>
              {size}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.satoshi,
              fontSize: fontConstant.TEXT_12_SIZE_REGULAR,
              fontStyle: 'normal',
              fontWeight: fontConstant.WEIGHT_LEIGHT,
              color: colorConstant.LIGHT_TEXT,
              marginTop: '2%',
            }}>
            {cat}
          </Text>
          <Text
            style={{
              color: colorConstant.BLACK,
              fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
              fontStyle: 'italic',
              fontFamily: fontConstant.gambetta,
              fontWeight: fontConstant.WEIGHT_REGULAR,
              marginTop: '2%',
            }}>
            {name}
          </Text>
        </View>
        <View style={styles.price_view}>
          <Text style={styles.offer_price}>{item?.price_range?.minimum_price?.final_price
?.value} {item?.price_range?.minimum_price?.final_price
?.currency}</Text>
          {/* <Text
            style={[
              styles.offer_price,
              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
                textDecorationLine: 'line-through',
              },
            ]}>
            `{item?.price_range?.minimum_price?.regular_price
?.value} {item?.price_range?.minimum_price?.regular_price
?.currency}
          </Text> */}
        </View>
        {/*
        <Text
          style={{
            color: colorConstant.BLACK,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontStyle: 'italic',
            fontFamily: fontConstant.gambetta,
            fontWeight: fontConstant.WEIGHT_REGULAR,
          }}>
          {item.price}
        </Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  offer_price: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  price_view: {flexDirection: 'row', marginTop: '2%'},
});

export default ProductCard;
