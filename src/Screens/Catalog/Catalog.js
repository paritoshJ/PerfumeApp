import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import style from './style';
import colorConstant from '../../constant/colorConstant';
// import catlogdata from '../../utils/catlogdata';
import CatlogItem from '../../Component/catlogItem';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import imageConstant from '../../constant/imageConstant';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';
import {GET_CATEGORY} from '../../api/getCategory';
import { useNavigation } from '@react-navigation/native';

const CatalogScreen = props => {
  const [text, setText] = useState('');
  const [categoryData, setcategoryData] = useState([]);
  const {t, i18n} = useTranslation();
  const navigation = useNavigation()

  useEffect (() => {
    getCategory()
  },[])
  
  const onChangeText = () =>{
    
  }
  const getCategory = async () => {
    let res = await GET_CATEGORY();
    setcategoryData(res.category.children)
    console.log(":::::Res Chuildren ::::", res.category.children);
  }

  const categorydata = categoryData && categoryData.map((item) => (
    {
      name: item.name,
      image: item.image,
      ...item
    }
    ),
    )

  const renderItem = ({item}) => {
    console.log(":::: item :::", item)
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Collection', {
            data: item
          });
        }}>
        <CatlogItem icon={item.image} name={item.name} right={true} />
      </TouchableOpacity>
    );
  };
  const renderFooter = () =>{
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
              style={{width: 15, height: 15, marginLeft: 5}}
              resizeMode="contain"
            />
            <Text style={{marginLeft: 10}}>{t('About us')}</Text>
          </View>
          <View style={style.about_view}>
            <Image
              source={imageConstant.bus}
              style={{width: 15, height: 15, marginLeft: 5}}
              resizeMode="contain"
            />
            <Text style={{marginLeft: 10}}>{t('Delivery')}</Text>
          </View>
          <View style={style.about_view}>
            <Image
              source={imageConstant.addcontact}
              style={{width: 15, height: 15, marginLeft: 5}}
              resizeMode="contain"
            />
            <Text style={{marginLeft: 10}}>{t('Contacts')}</Text>
          </View>
        </View>)
  }
  const renderHeader = () =>{
    return ( <><View style={{ alignItems: 'flex-start' }}>
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
            value={text}
            onChangeText={setText}
            placeholder={t('Search for perfume')}
            style={style.searchtext_Contain}
          />
        </View>
        <View style={style.micnoneIcon_Contain}>
          <View style={style.micnoneIcon_Row}></View>
          <MaterialIcons
            name="mic-none"
            size={25}
            color={colorConstant.LIGHT_GREY}
            style={style.micnoneIcon}
          />
        </View>
      </View>

      <FlatList contentContainerStyle={style.new_Contain} data={categorydata} renderItem={renderItem} ListFooterComponent={renderFooter} ListHeaderComponent={renderHeader}/>

    </View>
  );
};

export default CatalogScreen;
