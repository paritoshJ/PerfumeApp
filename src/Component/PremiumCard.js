import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import colorConstant from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import imageConstant from '../constant/imageConstant';
import {navigationRef} from '../Navigator/utils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PremiumCard = props => {
  const {item, offer} = props;

  const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];

  function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }

  return (
    <TouchableOpacity
      style={{
        width: 180,
        height: 270,
        backgroundColor: getRandomColor(),
        borderRadius: 10,
        marginLeft: 20,
      }}
      onPress={() => {
        navigationRef.navigate('ProductPage');
        // navigationRef.navigate('ProductPage');
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
          <MaterialIcons
            name="favorite-border"
            size={22}
            color={colorConstant.BLACK}
            onPress={() => {
              props.navigation.goBack();
            }}
          />
        </View>
      </View>

      <Image
        source={item.image}
        style={{width: '50%', height: 150, alignSelf: 'center'}}
        resizeMode="contain"
      />
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '3%',
        }}>
        <Text
          style={{
            color: colorConstant.BLACK,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontStyle: 'italic',
            fontFamily: fontConstant.gambetta,
            fontWeight: fontConstant.WEIGHT_REGULAR,
          }}>
          {item.name}
        </Text>
        <View style={styles.price_view}>
          <Text style={styles.offer_price}>12 AED</Text>
          <Text
            style={[
              styles.offer_price,
              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
              },
            ]}>
            24 AED
          </Text>
        </View>
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
  price_view: {flexDirection: 'row', marginTop: '2%'},
});

export default PremiumCard;
