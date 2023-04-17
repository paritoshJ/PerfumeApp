import React, {useState} from 'react';
import {FlatList, I18nManager, TouchableOpacity, View} from 'react-native';
import style from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fontConstant from '../../constant/fontConstant';
import colorConstant from '../../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import {Text} from 'react-native';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';

const FiltersScreen = props => {
  const {t, i18n} = useTranslation();
  const [isSelected, setSelection] = useState(false);

  const discoverdata = [
    {id: 1, title: 'Citrus'},
    {
      id: 2,
      title: 'Fruity',
    },
    {
      id: 3,
      title: 'Floral',
    },
    {
      id: 4,
      title: 'Chypre',
    },
    {
      id: 5,
      title: 'Oriental',
    },
    {
      id: 6,
      title: 'Woody',
    },
    {
      id: 7,
      title: 'Dahn Al Oud',
    },
  ];

  const Categoriesdata = [
    {id: 1, title: 'Citrus'},
    {
      id: 2,
      title: 'Fruity',
    },
    {
      id: 3,
      title: 'Floral',
    },
    {
      id: 4,
      title: 'Chypre',
    },
    {
      id: 5,
      title: 'Oriental',
    },
    {
      id: 6,
      title: 'Woody',
    },
    {
      id: 7,
      title: 'Dahn Al Oud',
    },
  ];

  const bestseller = [
    {id: 1, title: 'Citrus'},
    {
      id: 2,
      title: 'Fruity',
    },
    {
      id: 3,
      title: 'Floral',
    },
  ];

  const discount = [
    {id: 1, title: 'Citrus'},
    {
      id: 2,
      title: 'Fruity',
    },
    {
      id: 3,
      title: 'Floral',
    },
    {
      id: 4,
      title: 'Chypre',
    },
    {
      id: 5,
      title: 'Oriental',
    },
    {
      id: 6,
      title: 'Woody',
    },
    {
      id: 7,
      title: 'Dahn Al Oud',
    },
  ];

  const Fragrancedata = [
    {id: 1, title: 'Citrus'},
    {
      id: 2,
      title: 'Fruity',
    },
    {
      id: 3,
      title: 'Floral',
    },
    {
      id: 4,
      title: 'Chypre',
    },
    {
      id: 5,
      title: 'Oriental',
    },
    {
      id: 6,
      title: 'Woody',
    },
    {
      id: 7,
      title: 'Dahn Al Oud',
    },
  ];

  const Collectionsdata = [
    {id: 1, title: 'Citrus'},
    {
      id: 2,
      title: 'Fruity',
    },
    {
      id: 3,
      title: 'Floral',
    },
    {
      id: 4,
      title: 'Chypre',
    },
    {
      id: 5,
      title: 'Oriental',
    },
    {
      id: 6,
      title: 'Woody',
    },
    {
      id: 7,
      title: 'Dahn Al Oud',
    },
  ];

  const List = [
    {
      id: 1,
      title: 'Discover',
    },
    {
      id: 2,
      title: 'Categories',
    },
    {
      id: 3,
      title: 'Best sellers',
    },
    {
      id: 4,
      title: 'Discount',
    },
    {
      id: 5,
      title: 'Fragrance',
    },
    {
      id: 6,
      title: 'Collections',
    },
  ];
  const [data, setdata] = useState(Fragrancedata);
  return (
    <View style={style.container}>
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
          {t('Filters')}
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.5, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
          <FlatList
            data={List}
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        padding: 10,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}
                      onPress={() => {
                        if (item.title == 'Best sellers') {
                          setdata(bestseller);
                        } else if (item.title == 'Discover') {
                          setdata(discoverdata);
                        } else if (item.title == 'Categories') {
                          setdata(Categoriesdata);
                        } else if (item.title == 'Discount') {
                          setdata(discount);
                        } else if (item.title == 'Fragrance') {
                          setdata(Fragrancedata);
                        } else if (item.title == 'Collections') {
                          setdata(Collectionsdata);
                        }
                      }}>
                      <Text>{item.title}</Text>
                      <AntDesign
                        name="right"
                        size={20}
                        color={colorConstant.LIGHT_GREY}
                        style={{ transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
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
            renderItem={({item}) => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      width: '100%',
                      height: 50,
                      alignItems: 'center',
                      padding: 10,
                      // justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
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
                    <Text style={{marginLeft: '10%'}}>{item.title}</Text>
                  </View>
                </View>
              );
            }}
          />
          <TouchableOpacity
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
              Show 23 items
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FiltersScreen;
