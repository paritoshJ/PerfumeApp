import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import React, { useState, useEffect } from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import style from './style';
import colorConstant from '../../constant/colorConstant';
// import catlogdata from '../../utils/catlogdata';
import CatlogItem from '../../Component/catlogItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import imageConstant from '../../constant/imageConstant';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';
import { GET_CATEGORY, GET_CATEGORY1 } from '../../api/getCategory';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../Component/Loader';
import Constants from '../../Comman/Constants';


const CatalogScreen = props => {
  const [text, setText] = useState('');
  const [categoryData, setcategoryData] = useState([]);
  const [categoryDatasearch, setsearchcategoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true)
      getCategory()


      return () => { };
    }, []),
  );



  const getCategory = async () => {
    // let res = await GET_CATEGORY();
    let res1 = await GET_CATEGORY1();
    setLoading(false)
    setsearchcategoryData(res1.amMegaMenuTree.items)
    setcategoryData(res1.amMegaMenuTree.items)
    console.log(":::::Res Chuildren ::::", res1.amMegaMenuTree.items);
    // console.log(":::::Res Chuildren ::::", res);
  }

  const categorydata = categoryData && categoryData.map((item) => (
    {
      name: item.name,
      image: item.image,
      ...item
    }
  ),
  )

  const renderItem = ({ item }) => {
    var image = Constants.BASE_GRAPH_IMAGE + item.icon;
    console.log('image', image)
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(":::: item :::", item)

          navigation.navigate('Collection', {
            data: item
          });
        }}>
        <CatlogItem icon={image} name={item.name} right={true} />
      </TouchableOpacity>
    );
  };
  const renderFooter = () => {
    return (<View
      style={{
        width: '100%',
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View style={style.about_view}>
        <Image
          source={imageConstant.about}
          style={{ width: 15, height: 15, marginLeft: 5 }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10 }}>{t('About us')}</Text>
      </View>
      <View style={style.about_view}>
        <Image
          source={imageConstant.bus}
          style={{ width: 15, height: 15, marginLeft: 5 }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10 }}>{t('Delivery')}</Text>
      </View>
      <View style={style.about_view}>
        <Image
          source={imageConstant.addcontact}
          style={{ width: 15, height: 15, marginLeft: 5 }}
          resizeMode="contain"
        />
        <Text style={{ marginLeft: 10 }}>{t('Contacts')}</Text>
      </View>
    </View>)
  }
  const renderHeader = () => {
    return (<><View style={{ alignItems: 'flex-start' }}>
      <Text style={style.header_title}>{t('New')}</Text>
    </View><View style={style.border}></View></>)
  }
  return (
    <View style={style.container}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View style={style.CatalogScreen_Contain}>
        <TouchableOpacity
          style={style.EvilIcons_Icon_Contain}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <EvilIcons name="search" size={30} color={colorConstant.LIGHT_GREY} />
        </TouchableOpacity>
        <View style={style.searchbar_Contain}>
          <TextInput
            // value={text}
            onFocus={() => {
              navigation.navigate('SearchScreen');
            }}
            onChangeText={(search) => {
              const newData = categoryDatasearch.filter(
                function (item) {
                  // Applying filter for the inserted text in search bar
                  const itemData = item.name
                    ? item.name.toUpperCase()
                    : ''.toUpperCase();
                  const textData = search.toUpperCase();
                  return itemData.indexOf(textData) > -1;
                }
              );
              setcategoryData(newData)
              console.log('newData', newData)


            }}
            placeholder={t('Search for perfume')}
            style={style.searchtext_Contain}
          />
        </View>
        <TouchableOpacity onPress={async () => {
          navigation.navigate('SearchScreen');

        }} style={style.micnoneIcon_Contain}>
          <View style={style.micnoneIcon_Row}></View>
          <MaterialIcons
            name="mic-none"
            size={25}
            color={colorConstant.LIGHT_GREY}
            style={style.micnoneIcon}
          />
        </TouchableOpacity>
      </View>
      {categorydata == '' ? <Text style={{ position: 'absolute', alignSelf: 'center' }}>No Data Found </Text> : ''}
      <FlatList contentContainerStyle={style.new_Contain} data={categorydata} renderItem={renderItem} ListFooterComponent={renderFooter} ListHeaderComponent={renderHeader} />
      <Loader loading={loading} />

    </View>
  );
};

export default CatalogScreen;
