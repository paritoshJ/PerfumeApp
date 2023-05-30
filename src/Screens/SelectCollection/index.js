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
  ActivityIndicator
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
import FiltersScreen from '../filters/index'
import { useTranslation } from 'react-i18next';
import { GET_CATEGORY, GET_CATEGORY1, GET_CATEGORY_PRODUCT } from '../../api/getCategory';
import Loader from '../../Component/Loader';
import { isStringNotNull } from '../../Helper/helper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ADD_WISH_LST_API,
} from '../../api/getCategoryList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectCollection = props => {
  const { t, i18n } = useTranslation();
  const [visibale, setVisibale] = useState(false);
  const [visibalefilter, setVisibalefilter] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [getFiltterCategory, setFilterCategory] = useState([]);
  const [getSortCategory, setSortCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingpagination, setLoadingpagination] = useState(false);
  const [active, setactive] = useState(1);
  const [getName, setName] = useState('');
  const [getSubcategory, setSubcateory] = useState('');
  const [getTotalpage, setTotalpage] = useState('');
  const [getEndReach, setEndreach] = useState(true)
  const [getfillter, setfilter] = useState(false)
  const [getSortvalue, setSortValue] = useState('Sort');
  const [getasendingdesending, Setassendingdissending] = useState('ASC');
  const [getWishlist, SetWishlist] = useState([]);

  const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];
  const { item, offer, wishlist, isHome = false } = props;
  var categoryvalue = 0, Shortvaluename = 'Sort';
  let page = 1;
  var Wishlistitema = [];
  useEffect(() => {
    setLoading(true);
    getCategory();


  }, [])

  var object = {};
  var sortobject = {}
  console.log('enter')
  const getCategory = async () => {
    const value = await AsyncStorage.getItem('wishlist');

    SetWishlist(JSON.parse(value))
    console.log('Dataadsdsdsds', JSON.parse(value));;

    let res = await GET_CATEGORY();


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
    console.log(":::::Res Chuildren ::::", getSubcategory);
    console.log(":::::Res Chuildren ::::", categoryvalue);
    GetProductcategory('')
  }
  const GetProductcategory = (value) => {
    console.log(":::::Response ::::", object, page, sortobject);



    if (categoryvalue == 0) {
      console.log('printe 0');

      GET_CATEGORY_PRODUCT("", object, 20, page, sortobject).then((Response) => {
        page = page + 1;
        setactive(active => active + 1);
        setSortCategory(Response.products.sort_fields);
        setcategoryData(Response.products.items)
        setTotalpage(Response.products.page_info.total_pages);
        setEndreach(false)

        if (value == '') {
          var arrra = Response.products.aggregations.map((item, index) => {
            var options = item.options.map((item1, index) => {
              var obj = { ...item1, isSlected: false }
              return obj;
            });
            var obj = { ...item, options }
            return obj;
          });
          setFilterCategory(arrra)
        }

        setLoading(false);
        setLoadingpagination(false);

      }).catch((error) => {
        console.log(":::::Res error ::::", error);
        setLoading(false);
        setLoadingpagination(false);

      })

    }
    else {
      console.log('printe 1');
      setcategoryData(res.category.children)
    }


  }
  const AddItemTowishlist = async (id, item) => {
    let res = await ADD_WISH_LST_API(0, item);
    console.log('GET_CATEGORY_LIST_HOME aasaasdasas', res);
  };
  function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }
  const renderItem = ({ item, index }) => {
    let name = item.name;
    let finalPrice = {};
    let regularPrice = {};
    let image = '';
    var Wishlist = false;
    if (isHome) {
      finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
      regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];
      // image = item?.image;
    } else {
      finalPrice = item?.price_range?.minimum_price?.final_price;
      regularPrice = item?.price_range?.minimum_price?.regular_price;
      image = item?.image[0]?.url
    }
    // console.log('item.id', item.id)

    var count = getWishlist?.filter(function (item1) {
      return item1?.product?.id == item?.id;
    });
    if (count != '') {
      Wishlist = true;
    }
    else {
      Wishlist = false;

    }
    console.log('count', isHome,count,item);
    console.log('get value Wishlist', Wishlist);

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
                name={Wishlist == true ? "favorite" : "favorite-border"}
                size={22}
                color={colorConstant.DARK_PRIMARY}
                onPress={async () => {
                  console.log('selected OItem', getWishlist);
                  console.log('selected OItem', item.sku);
                  let objNew = {
                    sku: item.sku,
                    quantity: 1,
                  };
                  console.warn(objNew);
                  let res = await AddItemTowishlist(item.id.toString(), objNew);
                  console.warn(res);
                  let objNew1 = {
                    product: { id: item.id },

                  };
                  SetWishlist([...getWishlist, objNew1]);
                  SetWishlist([...getWishlist, objNew1]);


                  AsyncStorage.setItem('wishlist', JSON.stringify(getWishlist));

                }}
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
            style={style.tochablesize}
            onPress={() => {
              props?.onSizeSelect();
            }}>
            <Text
              style={style.sizetext}>
              {item.customAttributesAjmalData[0].display_size}
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={style.displaycategytext}>
          {item.customAttributesAjmalData[0].display_category + ' / ' + item.customAttributesAjmalData[0].gender}
        </Text>
        <Text
          numberOfLines={2}
          style={style.nametext}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <Text style={style.finalpricetext}>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
          {finalPrice?.value < regularPrice?.value && <Text
            style={style.regularpricetext}>
            {`${regularPrice?.value} ${regularPrice?.currency}`}
          </Text>}
        </View>
      </TouchableOpacity>

    );
  };
  const fetchMoreData = () => {
    if (getEndReach == false) {
      setEndreach(true)
      setLoadingpagination(true);
      if (getTotalpage >= active) {
        console.log("if");

        GET_CATEGORY_PRODUCT("", object, 20, page, sortobject).then((Response) => {
          console.log(":::::Response ::::", Response);
          page = page + 1;
          setactive(active => active + 1);
          setEndreach(false);

          setLoadingpagination(false);

          setcategoryData([...categoryData, ...Response.products.items])

        }).catch((error) => {
          setLoadingpagination(false);

        })
      }
      else {
        console.log("else");
        setLoadingpagination(false);
      }
    }
  }

  const FilterArray = (value) => {
    object = {}
    getFiltterCategory.map((item, index) => {
      var data = item.options.filter(function (item1) {
        return item1.isSlected == true;
      });
      console.log('filter', item);
      console.log('object', data);

      var arr = []
      var priceobject = {}
      if (data != '') {
        if (item.attribute_code == 'price') {
          if (data.length > 1) {
            priceobject['from'] = data[0].value.split('_')[0].trim()
            priceobject['to'] = data[data.length - 1].value.split('_')[1].trim()
          }
          else {
            priceobject['from'] = data[0].value.split('_')[0].trim()
            priceobject['to'] = data[0].value.split('_')[1].trim()
          }
        } else {
          data.map((item1) => {
            arr.push(item1.value)
          });
        }
        if (item.attribute_code == 'price') {
          object[item.attribute_code] = priceobject;
        } else {
          object[item.attribute_code] = { in: arr };
        }
      }
    });
    sortobject = {};
    console.log('filter', Shortvaluename)
    if (Shortvaluename != 'Sort') {
      sortobject[Shortvaluename] = value;
    }
  }
  const renderFooter = () => {

    if (loadingpagination == true) {
      return (
        <ActivityIndicator
          style={{ color: '#000' }}
        />
      );
    }
    return null;

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {loading == false ? categoryvalue == 0 ? <View style={{ flex: 1 }}>
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
          <View
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
                marginRight: '3%'
              }}
              onPress={() => {
                setVisibale(true);
              }}>
              <Text numberOfLines={1} style={{}}>{getSortvalue}</Text>

            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              if (getasendingdesending == 'ASC') {
                Shortvaluename = getSortvalue;
                Setassendingdissending('DESC')
                setLoading(true)
                setfilter(true);
                FilterArray(getasendingdesending);
                GetProductcategory('1')

              } else {
                Shortvaluename = getSortvalue;

                Setassendingdissending('ASC')
                setLoading(true)
                setfilter(true);
                FilterArray(getasendingdesending);
                GetProductcategory('1')

              }
            }}>
              <Image source={getasendingdesending == "ASC" ? imageConstant.shortase : imageConstant.shortdes} style={{ width: 20, height: 20 }} />
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
                setVisibalefilter(true);
              }}>
              <Text style={{}}>{t('Filters')}</Text>
              <Image
                source={imageConstant.filters}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
          {/* <View style={{ height: '70%', marginLeft: '4%', marginRight: '4%', backgroundColor: 'red', }}> */}
          {categoryData == '' ? <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', }}>
            <Text alignSelf={'center'} style={{ textAlign: 'center', }}>No data found</Text>
          </View> : <FlatList
            style={{ marginLeft: '4%', marginRight: '4%', }}
            data={categoryData}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item, index) => `key-${index}`}
            ListFooterComponent={renderFooter}
            contentContainerStyle={{ marginBottom: '0%', }}
            onEndReachedThreshold={0.1}
            onEndReached={fetchMoreData}
            showsHorizontalScrollIndicator={false}
          />}
          {visibalefilter && (<FiltersScreen func1={(value) => {
            object = {}
            sortobject = {};
            if (Shortvaluename != 'Sort') {

              if (value != 'Sort') {
                sortobject[Shortvaluename] = "DESC";
              }
            }
            Shortvaluename = getSortvalue;
            setactive(1);
            setLoading(true)
            setfilter(false);
            FilterArray(getasendingdesending);
            GetProductcategory('')

          }} func={(value) => {
            console.log(value);
            Shortvaluename = getSortvalue;
            setactive(1);
            setLoading(true)
            setfilter(true);
            FilterArray(getasendingdesending);
            GetProductcategory('1')

          }} onOpenDailog={visibalefilter} Fillterarray={getFiltterCategory} setOnOpenDailog={setVisibalefilter} />)}
          {visibale && (
            <ShortDataModal func1={(value) => {
              console.log('shorvalue', value)
              Shortvaluename = value;
              setSortValue(value)
              setactive(1);
              setLoading(true)
              setcategoryData([]);
              FilterArray(getasendingdesending);

              GetProductcategory(getfillter == true ? '1' : '')
            }} SortList={getSortCategory} Searchcategory={getSortvalue == "Sort" ? '' : getSortvalue} onOpenDailog={visibale} setOnOpenDailog={setVisibale} />
          )}
        </View> : <ScrollView style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
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

            {/* {categoryvalue == 0 ? <View
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
          </View> : <View />} */}

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
