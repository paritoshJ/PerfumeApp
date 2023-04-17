import React from 'react';
import {FlatList, Text, TouchableOpacity, Image, StatusBar, I18nManager} from 'react-native';
import {View} from 'react-native';
import CatlogItem from '../../Component/catlogItem';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import style from './style';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import imageConstant from '../../constant/imageConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

const Collection = props => {
  const {t, i18n} = useTranslation();
  const { params } = useRoute();
  const { data } = params;
  console.log(":::: params ::::", data.children)
  const collationdata = [
    {
      name: 'Egift Card',
      image: imageConstant.egift,
    },
    {
      name: 'For Him',
      image: imageConstant.cardman,
    },
    {
      name: 'For Her',
      image: imageConstant.cardwomen,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          style={style.collationdata_Contain}
          onPress={() => {
            props.navigation.navigate('CollectionDetails', {name: item.name});
          }}>
          {/* <CatlogItem name={item.name} right={true} /> */}

          <View
            style={style.collationItemData}>
            <Image
              source={item?.image}
              style={{width: 100, height: 80, borderRadius: 10}}
              resizeMode="contain"
            />
            <Text style={style.header_title}>{item?.name}</Text>
          </View>
          <View
            style={style.searchicon_contain}>
            <AntDesign
              name="right"
              size={20}
              color={colorConstant.LIGHT_GREY}
              style={{ transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
            />
          </View>
        </TouchableOpacity>
        <View style={style.border}></View>
      </>
    );
  };
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
            style={style.collations_Contain}>
            {t('Collections')}
          </Text>
          <EvilIcons name="search" size={25} color={colorConstant.LIGHT_GREY} />
        </View>
        <View
          style={style.View_Collection_Conatain}>
          <View
            style={style.viewall_Conatin}>
            <Image
              source={imageConstant.viewall}
              style={style.viewall_Image}
              resizeMode="contain"
            />
            <Text style={style.header_title}>{t('View all')}</Text>
          </View>
          <View style={style.border}></View>

          <FlatList data={data?.children} renderItem={renderItem} />
        </View>
    </View>
  );
};

export default Collection;
