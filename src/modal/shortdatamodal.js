import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import {View, Text, Modal} from 'react-native';
import MyStatusBar from '../Component/MyStatusBar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {navigationRef} from '../Navigator/utils';
import fontConstant from '../constant/fontConstant';
import CheckBox from '@react-native-community/checkbox';
import colorConstant from '../constant/colorConstant';
import { useTranslation } from 'react-i18next';
import index from '../Navigator';

const ShortDataModal = props => {
  const {t, i18n} = useTranslation();
  const { onOpenDailog, setOnOpenDailog, getvalue, func1, SortList, Searchcategory } = props;
  const [isSelected, setSelection] = useState(false);
  const [isSelectedValue, setSelectedValue] = useState(Searchcategory);
  console.log('SortList', SortList);
  var array = [{ name: 'Popularity' }, { name: 'Discount' }, { name: 'Name' }, { name: 'Customer Top Rated' }, { name: 'Price: High To Low' }, { name: 'Price: High To Low' }]
  const renderItem = ({ item, index }) => (
    <View style={style.checkboxContainer}>
      <CheckBox
        onFillColor={colorConstant.DARK_PRIMARY}
        onCheckColor='white'
        onTintColor={colorConstant.DARK_PRIMARY}
        animationDuration={0}
        style={{ height: 24, width: 24, alignSelf: 'center' }}
        boxType="circle"
        value={isSelectedValue == item.value ? true : false}
        onValueChange={() => {

          if (isSelectedValue == item.value) {
            setSelectedValue('Sort');
          } else {
            setSelectedValue(item.value);
          }
        }}
      />
      <Text style={style.label}>{item.label}</Text>
    </View>
  );
  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.6)"
      backdropOpacity={1}
      animationType="slide"
      transparent={true}
      isVisible={true}
      onRequestClose={() => {

        setOnOpenDailog(false);
      }}
      onBackdropPress={() => {

        setOnOpenDailog(false);
      }}>
      <MyStatusBar backgroundColor={'rgba(0, 0, 0, 0.6)'} />
      <View style={style.centeredView} onPress={() => { }}>
        <View
          style={{
            width: '100%',
            // height: 450,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          }}>
          <View style={{width: '100%', justifyContent: 'flex-end',alignItems:"flex-end",paddingRight:20,paddingTop:20}}>
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
              {t('Sort')}
            </Text>
          </View>
          <View>
          <View style={style.checkboxContainer}>
              <FlatList
                style={{ marginLeft: '4%', marginRight: '4%', }}
                data={SortList.options}
                renderItem={renderItem}
                contentContainerStyle={{ marginBottom: '15%', }}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
              />

      </View>
            <TouchableOpacity
              onPress={() => {
                if (isSelectedValue == '') {
                  Alert.alert('Please select at least one')
                }
                else {
                  props.func1(isSelectedValue);
                  setOnOpenDailog(false);
                }
              }}
        style={{
          width: '90%',
          height: 50,
          backgroundColor: colorConstant.DARK_PRIMARY,
          alignSelf: 'center',
          marginTop: '1%',
          marginBottom: '10%',
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontStyle: 'normal',
            fontWeight: fontConstant.WEIGHT_LEIGHT,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            color: colorConstant.WHITE,
          }}>
          {t('Apply')}
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
    flexDirection: 'row',
    paddingLeft:10,
    marginTop: "5%"
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginLeft: '5%',
    marginTop: '1.5%',
    fontFamily:fontConstant.satoshi,
    fontStyle:"normal",
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontWeight:fontConstant.WEIGHT_REGULAR,
    color:colorConstant.BLACK
  },
});

export default ShortDataModal;
