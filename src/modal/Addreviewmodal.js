import React, {useState} from 'react';
import {KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import {Modal, View, StyleSheet} from 'react-native';
import MyStatusBar from '../Component/MyStatusBar';
import colorConstant from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Rating, AirbnbRating} from 'react-native-ratings';
import { useTranslation } from 'react-i18next';

const AddReviewModal = props => {
  const {onOpenDailog, setOnOpenDailog} = props;
  const [text, settext] = useState('');
  const {t, i18n} = useTranslation();
  handleRating = rating => {
  };
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
      <View style={style.centeredView}>
        <KeyboardAvoidingView>
        <View
          style={{
            width: '100%',
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
               {t('New review')}
            </Text>
            <AirbnbRating
              count={5}
              // reviews={['Terrible', 'Bad', 'OK', 'Good', 'Great']}
              showRating={false}
              size={20}
              defaultRating={0}
              onFinishRating={handleRating}
              selectedColor={colorConstant.DARK_PRIMARY}
              ratingContainerStyle={{
                borderColor: colorConstant.DARK_PRIMARY,
                marginTop: '2%',
              }}
            />
          </View>

          <TextInput
            style={{
              width: '90%',
              height: 50,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: colorConstant.DARK_PRIMARY,
              alignItems: 'center',
              alignSelf: 'center',
              marginTop: '5%',
              paddingLeft: 20,
              fontFamily: fontConstant.satoshi,
              fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_LEIGHT,
              color: colorConstant.BLACK,
            }}
            placeholder={t('Name')}
            placeholderTextColor={colorConstant.LIGHT_GREY}
            value={text}
            onChangeText={e => settext(e)}
          />
          <TextInput
            style={{
              width: '90%',
              height: 100,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: colorConstant.DARK_PRIMARY,
              // alignItems: 'center',
              alignSelf: 'center',
              marginTop: '5%',
              paddingLeft: 20,
              fontFamily: fontConstant.satoshi,
              fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_LEIGHT,
              color: colorConstant.BLACK,
            }}
            placeholder={t('Comment')}
            placeholderTextColor={colorConstant.LIGHT_GREY}
            value={text}
            onChangeText={e => settext(e)}
          />
          <TouchableOpacity
            style={{
              width: '90%',
              height: 50,
              borderRadius: 30,
              backgroundColor: colorConstant.DARK_PRIMARY,
              alignSelf: 'center',
              marginTop: '10%',
              marginBottom:'5%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontConstant.satoshi,
                fontStyle: 'normal',
                fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
                fontWeight: fontConstant.WEIGHT_LEIGHT,
                color: colorConstant.WHITE,
              }}>
                {t('Submit review')}
            </Text>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
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
});
export default AddReviewModal;
