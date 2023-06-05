import React, { useState, useEffect } from 'react';

import { FlatList, Text, TouchableOpacity, Image, StatusBar, I18nManager } from 'react-native';
import { View } from 'react-native';
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
import { GET_SUB_CATEGORY } from '../../api/getCategory';
import Loader from '../../Component/Loader';

import { useFocusEffect } from '@react-navigation/native';

const Collection = props => {
  const { t, i18n } = useTranslation();
  const { params } = useRoute();
  const [loading, setLoading] = useState(false);
  const [getSubCategory, setSubCategory] = useState();

  const { data } = params;
  console.log(":::: params ::::asdsasas", data)

  useFocusEffect(
    React.useCallback(() => {
      var getID = data.url.split('.html');
      console.log(getID[0])
      getProductSubCategory(getID[0]);

      return () => { };
    }, []),
  );
  const getProductSubCategory = (itemId) => {
    setLoading(true);
    GET_SUB_CATEGORY(itemId).then((item) => {
      setSubCategory(item.category)
      setLoading(false);

      console.log('item', item)
    }).catch((error) => {
      setLoading(false);

      console.log('item', error)

    })
  }
  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          style={style.collationdata_Contain}
          onPress={() => {
            if (item.display_sub_categories == 0) {
              props.navigation.navigate('SelectCollection', { idget: getSubCategory?.id });
            } else {
              props.navigation.navigate('CollectionDetails', { idget: item.id });

            }
          }}>
          {/* <CatlogItem name={item.name} right={true} /> */}

          <View
            style={style.collationItemData}>
            {item?.image == null ? <View /> : <Image
              source={{ uri: item?.image == null ? '' : item?.image }}
              style={{ width: 100, height: 80, borderRadius: 10 }}
            // resizeMode="contain"
            />}
            <Text style={style.header_title}>{item?.name}</Text>
          </View>
          <View
            style={style.searchicon_contain}>
            <AntDesign
              name="right"
              size={20}
              color={colorConstant.LIGHT_GREY}
              style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
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
          style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
        />
        <Text
          style={style.collations_Contain}>
          {t('Collections')}
        </Text>
        <EvilIcons name="search" size={25} color={colorConstant.LIGHT_GREY} />
      </View>
      <View
        style={style.View_Collection_Conatain}>
        <TouchableOpacity
          onPress={() => {
            console.log(getSubCategory?.id)
            props.navigation.navigate('SelectCollection', { idget: getSubCategory?.id });
          }}
          style={style.viewall_Conatin}>
          <Image
            source={{ uri: getSubCategory?.image }}
            style={style.viewall_Image}
            // resizeMode="contain"
          />
          <Text style={style.header_title}>{t('View all')}</Text>
        </TouchableOpacity>
        <View style={style.border}></View>
        <View style={{ height: '84%', }}>
          <FlatList style={{ marginBottom: '3%' }} data={getSubCategory?.children} renderItem={renderItem} />
        </View>
      </View>
      <Loader loading={loading} />

    </View>
  );
};

export default Collection;
