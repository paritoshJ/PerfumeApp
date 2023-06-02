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
import {isStringNotNull} from '../Helper/helper';
import {ADD_WISH_LST_API} from '../api/getCategoryList';

const ProductCard = props => {
  const {
    item,
    offer,
    wishlist,
    faviourite,
    isHome = false,
    isSearch = false,
    customFlex = false,
  } = props;
  const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];
  console.warn(item?.image);
  console.warn(item);

  let name = item?.name;
  let finalPrice = {};
  let regularPrice = {};
  let image = '';
  // let finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
  // let regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];

  if (isHome) {
    // finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
    // regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];
    finalPrice = item?.price_range?.minimum_price?.final_price;
    regularPrice = item?.price_range?.minimum_price?.regular_price;
    image = item?.image;
    
  } else if (isSearch) {
    finalPrice = item?.price_range?.minimum_price?.final_price;
    regularPrice = item?.price_range?.minimum_price?.regular_price;
    image = item?.image?.url;
  } else {
    finalPrice = item?.price_range?.minimum_price?.final_price;
    regularPrice = item?.price_range?.minimum_price?.regular_price;
    image = item?.image[0]?.url;
  }
   
  let offers =  item?.price_range?.minimum_price?.discount?.percent_off
  let size =
    item?.customAttributesAjmalData !== undefined
      ? item?.customAttributesAjmalData[0]?.display_size
      : '';
  let cat =
    item?.customAttributesAjmalData !== undefined
      ? item?.customAttributesAjmalData[0]?.display_category
      : '';

  function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }

  const AddItemTowishlist = async (id, item) => {
    let res = await ADD_WISH_LST_API(0, item);
    console.log('GET_CATEGORY_LIST_HOME aasaasdasas', res);
    if (res) {
    } else {
    }
  };

  return (
    <TouchableOpacity
      key={item}
      onPress={() => props?.onFullItemPress()}
      style={customFlex ? {flex: 1} : {width: 150}}>
      <View
        style={{
          height: 200,
          backgroundColor: getRandomColor(),
          borderRadius: 12,
        }}>
        <View
          style={{
            justifyContent: isStringNotNull(offers) && offers > 0 ? 'space-between' : 'flex-end',
            flexDirection: 'row',
          }}>
          {isStringNotNull(offers) && offers > 0 && (
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
                {`${offers}%`}
              </Text>
            </View>
          )}
          <View style={{padding: 10}}>
            <MaterialIcons
              name={faviourite == true ? "favorite" : "favorite-border"}
              size={22}
              color={colorConstant.BLACK}
              onPress={() => props?.favoriteOnSelect()}
              // onPress={async () => {
              //   console.log('selected OItem', item);
              //   console.log('selected OItem', item.sku);
              //   let objNew = {
              //     sku: item.sku,
              //     quantity: 1,
              //   };
              //   let res = await AddItemTowishlist(0, objNew);
              //   console.warn(res);
              // }}
            />
          </View>
        </View>

        <Image
          source={{uri: image}}
          style={{width: '50%', height: 120, alignSelf: 'center'}}
          resizeMode="contain"
        />
      </View>

      <View style={{flexDirection: 'row', marginVertical: 12}}>
        <TouchableOpacity
          style={{
            // width: 50,
            borderRadius: 20,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colorConstant.LIGHT_GREY,
          }}
          onPress={() => {
            // setSelected(size);
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
            {size}
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: fontConstant.satoshi,
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: fontConstant.WEIGHT_LEIGHT,
          color: colorConstant.LIGHT_TEXT,
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
          marginTop: 6,
          textTransform: 'capitalize',
        }}>
        {name}
      </Text>
      <View style={styles.price_view}>
        <Text
          style={
            styles.offer_price
          }>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
        {finalPrice?.value < regularPrice?.value && (
          <Text
            style={[
              styles.offer_price,
              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
                textDecorationLine: 'line-through',
              },
            ]}>
            {`${regularPrice?.value} ${regularPrice?.currency}`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  offer_price: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  price_view: {flexDirection: 'row', marginTop: 8},
});

export default ProductCard;
