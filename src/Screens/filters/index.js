import React, {useState} from 'react';
import { FlatList, I18nManager, TouchableOpacity, View, Modal, Image } from 'react-native';
import style from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontConstant from '../../constant/fontConstant';
import colorConstant from '../../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import {Text} from 'react-native';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import imageConstant from '../../constant/imageConstant';
// import { Image } from 'react-native-svg';

const FiltersScreen = props => {
  const {t, i18n} = useTranslation();
  var { onOpenDailog, Fillterarray, setOnOpenDailog } = props;

  console.log('Fillterarray', Fillterarray)
  var array = Fillterarray;
  // var arrra = Fillterarray.map((item, index) => {
  //   var options = item.options.map((item1, index) => {
  //     var obj = { ...item1, isSlected: false }
  //     return obj;
  //   });
  //   var obj = { ...item, options }
  //   return obj;
  // });
  const [data, setdata] = useState(Fillterarray[0].options);
  const [isSlectedCategory, setSelectcategory] = useState(Fillterarray[0].label);
  const [isGetCategoryarray, setCategoryarray] = useState(Fillterarray)
  const [refrash, setRefrsh] = useState(false)
  const [getCount, setCount] = useState(0)
  var countplus = 0;
  // console.log('arrra', arrra)
  return (
    <Modal
      backdropColor="white"
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
      <MyStatusBar backgroundColor={'white'} />
      <View style={[style.container, { marginTop: '13%' }]}>
        {/* <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} /> */}
        <View style={[style.search_view,]}>
        <Ionicons
          name="chevron-back-sharp"
          size={22}
          color={colorConstant.BLACK}
          onPress={() => {
            setOnOpenDailog(false);
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
              marginLeft: '40%'
          }}>
          {t('Filters')}
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.5, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
          <FlatList
              data={array}
              refreshing={refrash}

              renderItem={({ item, index }) => {
                var count = item.options.filter(function (item1) {
                  return item1.isSlected == true;
                });
                countplus = countplus + count.length;
                setCount(countplus)

                console.log('length get data', getCount, count.length)
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: isSlectedCategory == item.label ? 'rgba(249, 245, 241, 1)' : 'rgba(255, 255, 255, 1)',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        padding: 10,
                        // justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        setdata(item.options);
                        setSelectcategory(item.label);
                      }}>
                      <Text>{item.label}</Text>
                      {count.length == 0 ? null : <View style={{
                        width: 25,
                        height: 25,
                        borderRadius: 25 / 2,
                        // backgroundColor: '#FF9800',
                        borderColor: colorConstant.DARK_PRIMARY,
                        borderWidth: 1,
                        position: 'absolute', alignContent: 'flex-end', right: 0,
                        marginRight: 30,
                        justifyContent: 'center'
                      }} ><Text style={{ alignSelf: 'center', textAlign: 'center', color: colorConstant.DARK_PRIMARY }}>{count.length}</Text></View>}
                      <AntDesign
                        name="right"
                        size={20}
                        color={colorConstant.LIGHT_GREY}
                        style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }], position: 'absolute', right: 0, }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
            <TouchableOpacity onPress={() => {
              Fillterarray.map((item1, index1) => {
                // if (item.label == isSlectedCategory) {
                // console.log('selected option', item1.options[index])
                item1.options.map((item, index) => {
                  item.isSlected = false;
                })

                return item1;
                // }
              })
              console.log('selected option', Fillterarray)
              setCategoryarray(Fillterarray)
              setRefrsh(true)
              props.func1(Fillterarray);
              setOnOpenDailog(false);

            }}
            style={{
              width: '90%',
              height: 50,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: colorConstant.DARK_PRIMARY,
              marginBottom: '15%',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: fontConstant.satoshi,
                fontStyle: 'normal',
                fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
                fontWeight: fontConstant.WEIGHT_LEIGHT,
                color: colorConstant.DARK_PRIMARY,
              }}>
              {t('Clear')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'rgba(249, 245, 241, 1)',
          }}>
          <FlatList
            data={data}
              initialNumToRender={data.length}
              // onRefresh={() => setRefrsh(false)}
              refreshing={refrash}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => {
                setRefrsh(false)
                console.log("load", item.isSlected)
                var value = item.isSlected;
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      alignItems: 'center',
                      padding: 10,
                      flexDirection: 'row',
                    }}>
                    <CheckBox
                      onFillColor={colorConstant.DARK_PRIMARY}
                      onCheckColor='white'
                      onTintColor={colorConstant.DARK_PRIMARY}
                      animationDuration={0}
                      style={{ height: 24, width: 24, alignSelf: 'center' }}
                      boxType="square"
                      value={value}
                      onValueChange={() => {
                        console.log('item.isSlected', item.isSlected)
                        if (data[index].isSlected == true) {
                          item.isSlected = false;
                          data[index].isSlected = false
                          setdata(data);
                        }
                        else {
                          data[index].isSlected = true
                          item.isSlected = true;
                          setdata(data);
                        }
                        Fillterarray.map((item1, index1) => {
                          if (item.label == isSlectedCategory) {
                            if (item1.options[index].isSlected == true) {
                              item1.options[index].isSlected = false;
                            }
                            else {
                              item1.options[index].isSlected = true;
                            }
                            setdata(item1.options);
                            return item1;
                          }
                        })
                        console.log('selected option', Fillterarray)
                        setCategoryarray(Fillterarray)
                        setRefrsh(true)

                      }}
                    />
                    <Text style={{ marginLeft: '10%' }}>{item.label}</Text>
                  </View>
                </View>
              );
            }}
          />
            <TouchableOpacity 
              onPress={() => {
                props.func(array);
                setOnOpenDailog(false);
              }}
            style={{
              width: '90%',
              height: 50,
              borderRadius: 30,
              backgroundColor: colorConstant.DARK_PRIMARY,
              marginBottom: '15%',
              alignSelf: 'center',
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
                Show {getCount} items
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </Modal>
  );
};

export default FiltersScreen;
