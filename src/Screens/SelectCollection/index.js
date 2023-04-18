import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  I18nManager,
  Alert,
} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import imageConstant from '../../constant/imageConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import style from './style';
import perfumedata from '../../utils/perfumedata';
import ProductCard from '../../Component/ProducCard';
import ShortDataModal from '../../modal/shortdatamodal';
import { useTranslation } from 'react-i18next';

const SelectCollection = props => {
  const {t, i18n} = useTranslation();
  const [visibale, setVisibale] = useState(false);
  
  const renderItem = ({item, index}) => {
    return (
       <ProductCard item={item} offer={true} onSizeSelect={(data)=>{}} 
      onFullItemPress ={() => {
          // setSelectedProduct(item);
          // setonOpenDailog(true);
        }} />
    );
  };
  const renderShowAll = (key) =>{
    return (<TouchableOpacity onPress={()=> {Alert.alert(key ?? 'Comming soon')}}>
          <Image
            source={imageConstant.button}
            style={{height: 48,alignSelf:'center'}}
            resizeMode="contain"
          />
        </TouchableOpacity>)
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <ImageBackground
        source={imageConstant.main_header}
        borderBottomLeftRadius={25}
        borderBottomRightRadius={25}
        style={style.header_view}>
        <View style={style.share_view}>
          <AntDesign
            name="left"
            size={22}
            color={colorConstant.BLACK}
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
          />
          <EvilIcons name="search" size={30} color={colorConstant.BLACK} />
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: colorConstant.BLACK,
            marginTop: '5%',
            fontFamily: fontConstant.gambetta,
            fontStyle: 'italic',
            fontSize: fontConstant.TEXT_30_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
          }}>
          {t('Our perfumes')}
        </Text>
      </ImageBackground>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: colorConstant.LIGHT_GREY,
          borderRadius: 25,
          paddingHorizontal:20,
          marginHorizontal:16,
          paddingVertical:14,
          shadowColor: colorConstant.LIGHT_GREY,
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.95,
          shadowRadius: 3.22,
          elevation: 2,
          backgroundColor: colorConstant.WHITE,
          bottom:25,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flex:1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            // props.navigation.navigate('short');
            setVisibale(true);
          }}>
          <Text style={{}}>{t('Sort')}</Text>
          <Image source={imageConstant.short} style={{width: 20, height: 20}} />
        </TouchableOpacity>
        <View
          style={{
            width: 1,
            height: 20,
            backgroundColor: colorConstant.LIGHT_GREY,
            alignSelf: 'center',
            marginHorizontal: 20,
          }}></View>
        <TouchableOpacity
          style={{
            flex:1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('FiltersScreen');
          }}>
          <Text style={{}}>{t('Filters')}</Text>
          <Image
            source={imageConstant.filters}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal:16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colorConstant.GRAY_LIGHT,
              fontFamily: fontConstant.satoshi,
              fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
              fontStyle: 'normal',
              fontWeight: fontConstant.WEIGHT_REGULAR,
            }}>
            124 products
          </Text>
          <AntDesign
            name="appstore-o"
            size={20}
            color={colorConstant.GRAY_LIGHT}
          />
        </View>
        <ImageBackground
          source={imageConstant.cat}
          borderRadius={10}
          style={{
            height: 120,
            marginTop: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontStyle: 'italic',
              fontWeight: fontConstant.WEIGHT_REGULAR,
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              color: colorConstant.WHITE,
            }}>
            Floral
          </Text>
        </ImageBackground>

          <FlatList
            data={perfumedata}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{marginTop: 20}}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            showsHorizontalScrollIndicator={false}
          />
        {renderShowAll()}

        <ImageBackground
          source={imageConstant.catone}
          borderRadius={10}
          style={{
            height: 120,
            marginTop: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontStyle: 'italic',
              fontWeight: fontConstant.WEIGHT_REGULAR,
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              color: colorConstant.WHITE,
            }}>
            Mossy
          </Text>
        </ImageBackground>

          <FlatList
            data={perfumedata}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{marginTop: 20}}
            ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
       {renderShowAll()}

        <ImageBackground
          source={imageConstant.citrus}
          borderRadius={10}
          style={{
            height: 120,
            marginTop: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontStyle: 'italic',
              fontWeight: fontConstant.WEIGHT_REGULAR,
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              color: colorConstant.WHITE,
            }}>
            Mossy
          </Text> */}
        </ImageBackground>

          <FlatList
            data={perfumedata}
            renderItem={renderItem}
             horizontal
            contentContainerStyle={{marginTop: 20}}
                        ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
       {renderShowAll()}
        <ImageBackground
          source={imageConstant.fruity}
          borderRadius={10}
          style={{
            width: '100%',
            height: 120,
            marginTop: '10%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontStyle: 'italic',
              fontWeight: fontConstant.WEIGHT_REGULAR,
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              color: colorConstant.WHITE,
            }}>
            Mossy
          </Text> */}
        </ImageBackground>

          <FlatList
            data={perfumedata}
            renderItem={renderItem}
            horizontal
            contentContainerStyle={{marginTop: 20}}
                        ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
       {renderShowAll()}
      </View>
      {visibale && (
        <ShortDataModal onOpenDailog={visibale} setOnOpenDailog={setVisibale} />
      )}
    </ScrollView>
  );
};

export default SelectCollection;
