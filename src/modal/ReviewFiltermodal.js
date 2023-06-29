import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View, Text, Modal} from 'react-native';
import MyStatusBar from '../Component/MyStatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigationRef} from '../Navigator/utils';
import fontConstant from '../constant/fontConstant';
import CheckBox from '@react-native-community/checkbox';
import colorConstant from '../constant/colorConstant';
import {Rating, AirbnbRating} from 'react-native-ratings';
import { useTranslation } from 'react-i18next';
import Constants from '../Comman/Constants';

const ReviewFilterModal = props => {
  const {onOpenDailog, setOnOpenDailog} = props;
  const [isSelected, setSelection] = useState(false);
  const {t, i18n} = useTranslation();

  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.6)"
      backdropOpacity={1}
      animationType="slide"
      transparent={true}
      isVisible={onOpenDailog}
      onRequestClose={() => {
        setOnOpenDailog(false);
      }}
      onBackdropPress={() => {
        setOnOpenDailog(false);
      }}>
      <MyStatusBar backgroundColor={'rgba(0, 0, 0, 0.6)'} />
      <View style={style.centeredView} onPress={() => {}}>
        <View
          style={{
            width: '100%',
            height: 350,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              paddingRight: 20,
              paddingTop: 20,
            }}>
            <AntDesign
              name="close"
              size={20}
              color={colorConstant.LIGHT_GREY}
              onPress={() => {
                setOnOpenDailog(false);
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontConstant.gambetta,
                fontStyle: 'italic',
                fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
                fontWeight: fontConstant.WEIGHT_REGULAR,
                color: colorConstant.BLACK,
              }}>
              {Constants.Laungagues.filters == null ? 'Filters' : Constants.Laungagues.filters}
            </Text>
          </View>
          <View>
            <View style={style.checkboxContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  tintColors={{
                    true: colorConstant.DARK_PRIMARY,
                    false: 'rgba(200, 200, 200, 1)',
                  }}
                  style={{height: 24, width: 24, alignSelf: 'center'}}
                  boxType="circle"
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={18}
                  defaultRating={5}
                  onFinishRating={handleRating}
                  selectedColor={colorConstant.DARK_PRIMARY}
                  ratingContainerStyle={{
                    borderColor: colorConstant.DARK_PRIMARY,
                    marginTop: '2%',
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text style={{}}>28 {Constants.Laungagues.reviews == null ? 'reviews' : Constants.Laungagues.reviews}</Text>
            </View>
            <View style={style.checkboxContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  tintColors={{
                    true: colorConstant.DARK_PRIMARY,
                    false: 'rgba(200, 200, 200, 1)',
                  }}
                  style={{height: 24, width: 24, alignSelf: 'center'}}
                  boxType="circle"
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={18}
                  defaultRating={4}
                  onFinishRating={handleRating}
                  selectedColor={colorConstant.DARK_PRIMARY}
                  ratingContainerStyle={{
                    borderColor: colorConstant.DARK_PRIMARY,
                    marginTop: '2%',
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text style={{}}>28 {t('reviews')}</Text>
            </View>
            <View style={style.checkboxContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  tintColors={{
                    true: colorConstant.DARK_PRIMARY,
                    false: 'rgba(200, 200, 200, 1)',
                  }}
                  style={{height: 24, width: 24, alignSelf: 'center'}}
                  boxType="circle"
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={18}
                  defaultRating={3}
                  onFinishRating={handleRating}
                  selectedColor={colorConstant.DARK_PRIMARY}
                  ratingContainerStyle={{
                    borderColor: colorConstant.DARK_PRIMARY,
                    marginTop: '2%',
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text style={{}}>28 {t('reviews')}</Text>
            </View>
            <View style={style.checkboxContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  tintColors={{
                    true: colorConstant.DARK_PRIMARY,
                    false: 'rgba(200, 200, 200, 1)',
                  }}
                  style={{height: 24, width: 24, alignSelf: 'center'}}
                  boxType="circle"
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={18}
                  defaultRating={2}
                  onFinishRating={handleRating}
                  selectedColor={colorConstant.DARK_PRIMARY}
                  ratingContainerStyle={{
                    borderColor: colorConstant.DARK_PRIMARY,
                    marginTop: '2%',
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text style={{}}>28 {Constants.Laungagues.reviews == null ? 'reviews' : Constants.Laungagues.reviews}</Text>
            </View>
            <View style={style.checkboxContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox
                  tintColors={{
                    true: colorConstant.DARK_PRIMARY,
                    false: 'rgba(200, 200, 200, 1)',
                  }}
                  style={{height: 24, width: 24, alignSelf: 'center'}}
                  boxType="circle"
                  value={isSelected}
                  onValueChange={setSelection}
                />
                <AirbnbRating
                  count={5}
                  showRating={false}
                  size={18}
                  defaultRating={1}
                  onFinishRating={handleRating}
                  selectedColor={colorConstant.DARK_PRIMARY}
                  ratingContainerStyle={{
                    borderColor: colorConstant.DARK_PRIMARY,
                    marginTop: '2%',
                    marginLeft: 10,
                  }}
                />
              </View>
              <Text style={{}}>28 {Constants.Laungagues.reviews == null ? 'reviews' : Constants.Laungagues.reviews}</Text>
            </View>

            <TouchableOpacity
              style={{
                width: '90%',
                height: 50,
                backgroundColor: colorConstant.DARK_PRIMARY,
                alignSelf: 'center',
                marginTop: '5%',
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '5%',
              }}>
              <Text
                style={{
                  fontFamily: fontConstant.satoshi,
                  fontStyle: 'normal',
                  fontWeight: fontConstant.WEIGHT_LEIGHT,
                  fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
                  color: colorConstant.WHITE,
                }}>
                {Constants.Laungagues.apply == null ? 'Apply' : Constants.Laungagues.apply}
              </Text>
            </TouchableOpacity>
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
  checkboxContainer: {
    width: '90%',
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: '2%',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
  },
});

export default ReviewFilterModal;
