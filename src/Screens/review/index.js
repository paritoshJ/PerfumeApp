import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, I18nManager} from 'react-native';
import MyStatusBar from '../../Component/MyStatusBar';
import colorConstant from '../../constant/colorConstant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontConstant from '../../constant/fontConstant';
import style from './style';
import {Image} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import review from '../../utils/review';
import imageConstant from '../../constant/imageConstant';
import ReviewFilterModal from '../../modal/ReviewFiltermodal';
import { useTranslation } from 'react-i18next';

const ReviewScreen = props => {
  const [visibale, setVisibale] = useState(false);
  const {t, i18n} = useTranslation();
  handleRating = rating => {
  };
  const ratingCompleted = rating => {
  };
  const reviewItem = ({item}) => {
    return (
      <View style={{width: '100%', marginTop: '5%', flexDirection: 'row'}}>
        <View style={{width: '20%'}}>
          <Image
            source={item.image}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </View>
        <View style={{width: '80%'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={style.review_user_name}>{item.name}</Text>
            <Text
              style={[style.review_text, {color: colorConstant.LIGHT_GREY}]}>
              {item.time}
            </Text>
          </View>
          <Rating
            type="custom"
            ratingBackgroundColor={colorConstant.DARK_PRIMARY}
            ratingColor={colorConstant.DARK_PRIMARY}
            imageSize={15}
            onFinishRating={ratingCompleted}
            style={{alignItems: 'flex-start', marginTop: 10}}
          />
          <Text style={[style.review_text, {color: '#2B2826', marginTop: 5}]}>
            {item.review}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View style={style.search_view}>
        <Ionicons
          name="chevron-back-sharp"
          size={22}
          color={colorConstant.BLACK}
          onPress={() => {
            props.navigation.goBack();
          }}
          style={{ transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
        />
        <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontSize: fontConstant.TEXT_15_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            color: colorConstant.BLACK,
            marginLeft: '5%',
            textAlign: 'center',
          }}>
          {t('Review')}(54)
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 60,
          alignSelf: 'center',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: colorConstant.LIGHT_GREY,

          backgroundColor: colorConstant.WHITE,
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {}}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: fontConstant.satoshi,
              fontStyle: 'normal',
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_REGULAR,
              color: colorConstant.BLACK,
            }}>
            4.5
          </Text>
          <AirbnbRating
            count={5}
            showRating={false}
            size={20}
            defaultRating={4}
            onFinishRating={handleRating}
            selectedColor={colorConstant.DARK_PRIMARY}
            ratingContainerStyle={{
              borderColor: colorConstant.DARK_PRIMARY,
              marginTop: '2%',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 1,
            height: 20,
            backgroundColor: colorConstant.LIGHT_GREY,
            alignSelf: 'center',
            marginLeft: 10,
          }}></TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            setVisibale(true);
          }}>
          <Text style={{marginLeft: 10}}>{t('Filters')}</Text>
          <Image
            source={imageConstant.filters}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={review}
        renderItem={reviewItem}
        style={{width: '90%', alignSelf: 'center'}}
      />
      {visibale && (
        <ReviewFilterModal
          onOpenDailog={visibale}
          setOnOpenDailog={setVisibale}
        />
      )}
    </View>
  );
};

export default ReviewScreen;
