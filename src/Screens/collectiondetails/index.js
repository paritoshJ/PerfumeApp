import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  I18nManager,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View, Image} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CatlogItem from '../../Component/catlogItem';
import MyStatusBar from '../../Component/MyStatusBar';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import imageConstant from '../../constant/imageConstant';
import style from './style';
import Constants from '../../Comman/Constants';
const CollectionDetails = props => {
  const {t, i18n} = useTranslation();
  console.log('props url', props)
  const collationdata = [
    {
      name: 'Party',
    },
    {
      name: 'Anniversary',
    },
    {
      name: 'Outing',
    },
    {
      name: 'Long Drive',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('SelectCollection');
        }}>
        <CatlogItem name={item.name} right={false} />
      </TouchableOpacity>
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
        <Text style={style.collationdata_Contain}>
          {props.route.params.name}
        </Text>
        <EvilIcons name="search" size={25} color={colorConstant.LIGHT_GREY} />
      </View>
      <View style={style.viewall_Contain}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={style.header_title}>{Constants.Laungagues.view_all == null ? 'View all' : Constants.Laungagues.view_all}</Text>
        </View>
        <View style={style.border}></View>

        <FlatList data={collationdata} renderItem={renderItem} />

        <ImageBackground
          source={imageConstant.catone}
          borderRadius={10}
          style={style.Mossy_Conatain}>
          <Text style={style.mossyItem}>Mossy</Text>
        </ImageBackground>

        <ImageBackground
          source={imageConstant.cattwo}
          borderRadius={10}
          style={style.Circus_Contain}>
          <Text style={style.circusItem}>Circus</Text>
        </ImageBackground>
      </View>
    </View>
  );
};

export default CollectionDetails;
