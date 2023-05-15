import React, { useState, useEffect } from 'react';

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
import { GET_CATEGORY, GET_CATEGORY1 } from '../../api/getCategory';
import Loader from '../../Component/Loader';
import { isStringNotNull } from '../../Helper/helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectCollection = props => {
  const { t, i18n } = useTranslation();
  const [visibale, setVisibale] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getName, setName] = useState('');
  const [getSubcategory, setSubcateory] = useState('');
  const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];
  const { item, offer, wishlist, isHome = false } = props;
  var arra = [], categoryvalue = 0;
  useEffect(() => {
    setLoading(true);
    getCategory()
  }, [])


  const getCategory = async () => {

    let res = await GET_CATEGORY();

    setLoading(false);

    if (res.category.display_sub_categories == 1 && res.category.is_anchor == 1) {
      console.log('enter true consition');
      categoryvalue = 0;

      setSubcateory(categoryvalue.toString());
      setSubcateory('0');
    } else if (res.category.display_sub_categories == 1 && res.category.is_anchor == 0) {
      console.log('enter true consition1');
      categoryvalue = 1;
      setSubcateory('1');
      setSubcateory('1');
    }
    else if (res.category.display_sub_categories == 0 && res.category.is_anchor == 1) {
      console.log('enter true consition2');
      categoryvalue = 0;
      setSubcateory('0');
      setSubcateory('0');
    }
    else if (res.category.display_sub_categories == 0 && res.category.is_anchor == 0) {
      console.log('enter true consition3');
      categoryvalue = 1;
      setSubcateory('1');
      setSubcateory('1');
    }
    else if (res.category.display_sub_categories[0].subcategory == 0 && res.category.is_anchor == 1) {
      console.log('enter true consition4');
      categoryvalue = 0;
      setSubcateory('0');
      setSubcateory('0');
    }
    // else (res.category.display_sub_categories[0].subcategory == 1 && res.category.is_anchor == 0)
    // {
    //   console.log('enter true consition5');
    //   setSubcateory(1);
    // }
    console.log(":::::Res Chuildren ::::", getSubcategory);
    console.log(":::::Res Chuildren ::::", categoryvalue);
    // categoryData = [];


    setYourArray([])

    if (categoryvalue == 0) {
      console.log('printe 0');
      res.category.children.map((Data, index) => {
        if (Data.products.items != '') {
          Data.products.items.map((value, index) => {
            console.log('array Get', value);
            arra.push(value);
            categoryData.push(value)
          })
        }
      })

    }
    else {
      console.log('printe 1');
      setcategoryData(res.category.children)
    }
    // setSubcateory(res.category.display_sub_categories);
    // if (res.category.display_sub_categories == 0) {
    //   if (categoryData == '') {
    //     res.category.children.map((Data, index) => {
    //       if (Data.products.items != '') {
    //         Data.products.items.map((value, index) => {
    //           console.log('array Get', value);
    //           arra.push(value);
    //           categoryData.push(value)
    //         })
    //       }
    //     })
    //   }
    //   console.log('array Get', categoryData);
    // }
    // else {

    //   setcategoryData(res.category.children)
    // }
  }
  function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }
  const renderItem = ({ item, index }) => {
    let name = item.name;
    console.log('item:=>', item)
    let finalPrice = {};
    let regularPrice = {};
    let image = '';
    // let finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
    // let regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];

    if (isHome) {
      finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
      regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];
      image = item?.image;
    } else {
      finalPrice = item?.price_range?.minimum_price?.final_price;
      regularPrice = item?.price_range?.minimum_price?.regular_price;
      image = item?.image[0]?.url
    }
    return (
      <TouchableOpacity
        key={item}
        onPress={() => props?.onFullItemPress()}
        style={{
          // flex: 1,
          marginLeft: '1.2%',
          marginRight: '1.2%',
          marginTop: index == 0 || index == 1 ? 0 : '5%',
          width: '48%',
        }}>
        <View
          style={{
            height: 200,
            backgroundColor: getRandomColor(),
            borderRadius: 12,
            justifyContent: 'space-between',
            width: '100%',
            alignSelf: 'center'
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            {/* {isStringNotNull(item?.price_range.maximum_price.final_price.value) && (
              <View
                style={{
                  width: 35,
                  height: 20,
                  backgroundColor: colorConstant.BLACK,
                  borderTopLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colorConstant.WHITE,
                    fontSize: fontConstant.TEXT_10_SIZE_REGULAR,
                    fontStyle: 'normal',
                    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
                  }}>
                  {item?.price_range.maximum_price.final_price.value + '%'}
                </Text>
              </View>
            )} */}
            <View style={{ padding: 10 }}>
              <MaterialIcons
                name="favorite-border"
                size={22}
                color={colorConstant.BLACK}
                onPress={() => { }}
              />
            </View>
          </View>

          <Image
            source={{ uri: item.image.url }}
            style={{ width: '80%', height: '80%', alignSelf: 'center' }}
            resizeMode="contain"
          />
        </View>

        <View style={{ flexDirection: 'row', marginVertical: 12, }}>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colorConstant.LIGHT_GREY,
            }}
            onPress={() => {
              props?.onSizeSelect();
            }}>
            <Text
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                fontFamily: fontConstant.satoshi,
                fontSize: 12,
                fontWeight: fontConstant.WEIGHT_LEIGHT,
                color: colorConstant.BLACK,
              }}>
              {item.customAttributesAjmalData[0].display_size}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: fontConstant.WEIGHT_LEIGHT,
            color: colorConstant.LIGHT_TEXT,
          }}>
          {item.customAttributesAjmalData[0].display_category + ' / ' + item.customAttributesAjmalData[0].gender}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            color: colorConstant.BLACK,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontStyle: 'italic',
            fontFamily: fontConstant.gambetta,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            marginTop: 6,
            textTransform: 'capitalize',
          }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={{
            color: colorConstant.DARK_PRIMARY,
            fontStyle: 'normal',
            fontSize: fontConstant.TEXT_20_SIZE_BOLD,
            fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
          }}>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
          {finalPrice?.value < regularPrice?.value && <Text
            style={[

              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
                textDecorationLine: 'line-through',
                color: colorConstant.DARK_PRIMARY,
                fontStyle: 'normal',
                fontSize: fontConstant.TEXT_20_SIZE_BOLD,
                fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
              },
            ]}>
            {`${regularPrice?.value} ${regularPrice?.currency}`}
          </Text>}
        </View>
      </TouchableOpacity>

    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading == false ? <ScrollView style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
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
                style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
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
          {categoryvalue == 0 ? <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: colorConstant.LIGHT_GREY,
              borderRadius: 25,
              paddingHorizontal: 20,
              marginHorizontal: 16,
              paddingVertical: 14,
              shadowColor: colorConstant.LIGHT_GREY,
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.95,
              shadowRadius: 3.22,
              elevation: 2,
              backgroundColor: colorConstant.WHITE,
              bottom: 25,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                // props.navigation.navigate('short');
                setVisibale(true);
              }}>
              <Text style={{}}>{t('Sort')}</Text>
              <Image source={imageConstant.short} style={{ width: 20, height: 20 }} />
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
                flex: 1,
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
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View> : <View />}

          <View style={{ paddingHorizontal: 16, marginTop: categoryvalue == 0 ? 0 : '3%' }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <Text
                style={{
                  color: colorConstant.GRAY_LIGHT,
                  fontFamily: fontConstant.satoshi,
                  fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
                  fontStyle: 'normal',
                  fontWeight: fontConstant.WEIGHT_REGULAR,
                }}>
                {categoryData.length} products
              </Text>
              <AntDesign
                name="appstore-o"
                size={20}
                color={colorConstant.GRAY_LIGHT}
              />
            </View>
            {
              categoryvalue == 0 ? <View style={{ marginBottom: '3%' }}>
                <FlatList
                  data={categoryData}
                  renderItem={renderItem}
                  numColumns={2}

                  contentContainerStyle={{ marginTop: '3%' }}
                  keyExtractor={item => item.id}
                  // ItemSeparatorComponent={(item, index) => { return (<View style={{ marginHorizontal: index === 0 ? 0 : 10 }}></View>) }}
                  showsHorizontalScrollIndicator={false}
                />
              </View> : categoryData.map((Data, index) =>
                Data.children.map((childdata, index) =>

                (
                  <View style={{ marginTop: index == 0 ? 0 : getSubcategory == 0 ? 0 : '10%' }}>
                    <ImageBackground
                      source={{ uri: childdata.image }}
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
                        {childdata.name}
                      </Text>
                    </ImageBackground>
                    <FlatList
                      data={childdata.products.items}
                      renderItem={renderItem}
                      numColumns={2}

                      contentContainerStyle={{ marginTop: '3%' }}
                      keyExtractor={item => item.id}
                      ItemSeparatorComponent={(item, index) => { return (<View style={{ marginHorizontal: index === 0 ? 0 : 10 }}></View>) }}
                      showsHorizontalScrollIndicator={false}
                    />
                    {getSubcategory == 0 ? <View /> : Data.products.items.length > 4 ? <TouchableOpacity style={{ marginTop: '6%' }} onPress={() => { Alert.alert('Comming soon') }}>
                      <Image
                        source={imageConstant.button}
                        style={{ height: 48, alignSelf: 'center' }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity> : null}

                  </View>)
                )
              )
            }
            {/* {getSubcategory == 0 ? <View style={{ marginBottom: '3%' }}>
            <FlatList
              data={categoryData}
              renderItem={renderItem}
              numColumns={2}

              contentContainerStyle={{ marginTop: '3%' }}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={(item, index) => { return (<View style={{ marginHorizontal: index === 0 ? 0 : 10 }}></View>) }}
              showsHorizontalScrollIndicator={false}
            />
          </View> : categoryData.map((Data, index) =>
            Data.children.map((childdata, index) =>

            (
              <View style={{ marginTop: index == 0 ? 0 : getSubcategory == 0 ? 0 : '10%' }}>
                <ImageBackground
                  source={{ uri: childdata.image }}
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
                    {childdata.name}
                  </Text>
                </ImageBackground>
                <FlatList
                  data={childdata.products.items}
                  renderItem={renderItem}
                  numColumns={2}

                  contentContainerStyle={{ marginTop: '3%' }}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={(item, index) => { return (<View style={{ marginHorizontal: index === 0 ? 0 : 10 }}></View>) }}
                  showsHorizontalScrollIndicator={false}
                />
                {getSubcategory == 0 ? <View /> : Data.products.items.length > 4 ? <TouchableOpacity style={{ marginTop: '6%' }} onPress={() => { Alert.alert('Comming soon') }}>
                  <Image
                    source={imageConstant.button}
                    style={{ height: 48, alignSelf: 'center' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity> : null}

              </View>)
            )
          )} */}
            {/* {renderShowAll()} */}
          </View>
          {visibale && (
            <ShortDataModal onOpenDailog={visibale} setOnOpenDailog={setVisibale} />
          )}

        </ScrollView> : <View />
        }
        <Loader loading={loading} />
        {
          loading == true ? <View style={{
            flex: 1,
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            // opacity: 0.5,
            justifyContent: "center",
          }}>
            <Loader loading={loading} />
          </View> : null
        }

      </View >
    </SafeAreaView>
  );
};

export default SelectCollection;
