import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  I18nManager,
} from 'react-native';
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
import {useTranslation} from 'react-i18next';
import {findDaysDiffrent, getInitials} from '../../Helper/helper';
import Constants from '../../Comman/Constants';

const ReviewScreen = ({navigation, route}) => {
  const [visibale, setVisibale] = useState(false);
  const [ratingData, setRatingData] = useState([]);
  const [ratingSummary, setRatingSummary] = useState('');
  const [ratingCount, setRatingCount] = useState(0);
  const {t, i18n} = useTranslation();
  handleRating = rating => {};
  useEffect(() => {
    console.log(route?.params?.reviewData);
    if (route?.params?.reviewData) {
      setRatingData(route?.params?.reviewData);
    }
    if (route?.params?.rating_summary) {
      setRatingSummary(route?.params?.rating_summary);
    }
    if (route?.params?.review_count) {
      setRatingCount(route?.params?.review_count);
    }
  }, []);
  const reviewItem = ({item}) => {
    return (
      <View style={{width: '100%', marginTop: '5%', flexDirection: 'row'}}>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorConstant.BROWN_CUSTOM,
            borderRadius: 100,
            height: 50,
            width: 50,
            marginEnd: 10,
          }}>
          <Text style={{}}>{getInitials(item.nickname)}</Text>
        </View>
        <View style={{width: '80%'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={style.review_user_name}>{item.nickname}</Text>
            <Text
              style={[style.review_text, {color: colorConstant.LIGHT_GREY}]}>
              {findDaysDiffrent(item.created_at)}
            </Text>
          </View>
          {/* <Airb
            ratingCount={item?.average_rating / 20}
            type="custom"
            ratingBackgroundColor={colorConstant.DARK_PRIMARY}
            ratingColor={colorConstant.DARK_PRIMARY}
            imageSize={15}
            onFinishRating={ratingCompleted}
            style={{alignItems: 'flex-start', marginTop: 10}}
          /> */}
          <View
            style={{
              alignItems: 'flex-start',
            }}>
            <AirbnbRating
              count={5}
              showRating={false}
              size={15}
              defaultRating={item?.average_rating / 20}
              isDisabled
              selectedColor={colorConstant.DARK_PRIMARY}
              ratingContainerStyle={{
                borderColor: colorConstant.DARK_PRIMARY,
                marginTop: '2%',
              }}
            />
          </View>

          <Text style={[style.review_text, {color: '#2B2826', marginTop: 5}]}>
            {item.text ?? item.summary}
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
            navigation.goBack();
          }}
          style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
        />
        <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontSize: fontConstant.TEXT_15_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            color: colorConstant.BLACK,
            marginRight: '5%',
            textAlign: 'center',
            flex: 1,
          }}>
          {Constants.Laungagues.review == null ? 'Review' : Constants.Laungagues.review}({ratingCount})
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
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {}}>
          <Text
            style={{
              marginLeft: 20,
              fontFamily: fontConstant.satoshi,
              fontStyle: 'normal',
              alignSelf: 'center',
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_REGULAR,
              color: colorConstant.BLACK,
            }}>
            {ratingSummary / 20}
          </Text>
          <AirbnbRating
            count={5}
            showRating={false}
            size={20}
            defaultRating={ratingSummary / 20}
            isDisabled
            onFinishRating={handleRating}
            selectedColor={colorConstant.DARK_PRIMARY}
            ratingContainerStyle={{
              borderColor: colorConstant.DARK_PRIMARY,
              marginTop: '2%',
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            width: 1,
            height: 20,
            backgroundColor: colorConstant.LIGHT_GREY,
            alignSelf: 'center',
            marginLeft: 10,
          }}></TouchableOpacity>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
      <FlatList
        data={ratingData}
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
