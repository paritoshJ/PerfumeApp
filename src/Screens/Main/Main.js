import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  TextInput,
  ImageBackground,
  I18nManager,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import style from './style';
import colorConstant from '../../constant/colorConstant';
import stringConstant from '../../constant/stringConstant';
import fontConstant from '../../constant/fontConstant';
import imageConstant from '../../constant/imageConstant';
import perfumedata from '../../utils/perfumedata';
import ProductCard from '../../Component/ProducCard';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {SliderBox} from 'react-native-image-slider-box';
import carddata from '../../utils/carddata';
// import Searchbar from '../../Component/Searchbar';
import PremiumCard from '../../Component/PremiumCard';
import premiumdata from '../../utils/premiumdata';
import Metrics from '../../Helper/metrics';
import RBSheet from 'react-native-raw-bottom-sheet';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import ProductModal from '../../modal/productmodal';
import {useTranslation} from 'react-i18next';
import {GET_PRODUCTS} from '../../api/getProduct';
import {GET_SLIDER_PRODUCTS} from '../../api/getHomeSliderProduct';
import {GET_HOME_DATA} from '../../api/getHomeData';
import alertMsgConstant from '../../constant/alertMsgConstant';
import Swiper from 'react-native-swiper';
import {navigationRef} from '../../Navigator/utils';
import {isStringNotNull} from '../../Helper/helper';
import Constants from '../../Comman/Constants';
import {
  GET_COUNTRY_LIST,
  GET_COUNTRY_API,
  GET_TRANSLATION_JSON,
} from '../../api/getCountry';
import {useFocusEffect} from '@react-navigation/native';

import {
  GET_CATEGORY_LIST,
  GET_CATEGORY_LIST_HOME,
  Add_CATEGORY_LIST_CARD,
  ADD_WISH_LST_API,
} from '../../api/getCategoryList';
import {getRandomColor, isObjectNullOrUndefined} from '../../Helper/helper';
import {GET_HOME_CONFIG_DATA} from '../../api/getHomeConfigData';
import {isNonNullObject} from '@apollo/client/utilities';
import Loader from '../../Component/Loader';
import {EMPTY_CART} from '../../api/getEmptyCart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuthTokenHeaders} from '../../Helper/helper';

const MainScreen = props => {
  const [loading, setLoading] = useState(false);
  const [onOpenDailog, setonOpenDailog] = useState(false);
  const [stateWidth, setStateWidth] = useState(300);
  const [productData, setProductData] = useState('');
  const [saleDataArr, setSaleDataArr] = useState();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [newArrivals, setNewArrivals] = useState({});
  const [ourPerfumes, setOurPerfumes] = useState({});
  const [premiumCollection, setPremiumCollection] = useState({});
  const [shopWomens, setShopWomans] = useState({});
  const [shopMans, setShopMans] = useState({});
  const [sales, setSales] = useState({});
  const [getWishlist, SetWishlist] = useState([]);

  // const data = [
  //   {id: 1, name: 'abc'},
  //   {id: 2, name: 'text'},
  //   {id: 3, name: 'xyz'},
  // ];
  const [text, setText] = useState('');
  const {t, i18n} = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('wishlist')
        .then(response => {
          console.log('response', response);
          SetWishlist(JSON.parse(response));
        })
        .catch(error => {
          console.log('error', error);
        });

      AsyncStorage.getItem('Country').then(data => {
        if (data == null || data == '') {
          GET_COUNTRY_API()
            .then(Responsce => {
              AsyncStorage.setItem(
                'Country',
                Responsce.allStoreConfigData[0].store_code,
              );
              Constants.StoreCode = Responsce.allStoreConfigData[0].store_code;
            })
            .catch(error => {
              setLoading(false);
            });
        } else {
          Constants.StoreCode = data;
        }
      });

      // getCategory();
      getCategory();
      getConfigData();
      getCategoryHome();
      handleCartId();
      try {
        AsyncStorage.getItem('token')
          .then(value => {
            Constants.Token = 'Bearer ' + value;
          })
          .catch(error => {});
      } catch (error) {}

      return () => {};
    }, []),
  );
  useEffect(() => {
    // GET_TRANSLATION_JSON().then((Responce) => {
    //   console.log('Responsce', JSON.parse(Responce.AllTranslationsData.Translations))
    // }).catch((error) => {
    // });
    // getHomeData();
  }, []);
  const handleCartId = async () => {
    let res = await EMPTY_CART();
    if (res && res?.createEmptyCart) {
      try {
        await AsyncStorage.setItem('CART_ID', res?.createEmptyCart);
        // setCartId(res?.createEmptyCart)
      } catch (e) {
        // saving error
      }
    }
  };

  const getConfigData = async () => {
    let res = await GET_HOME_CONFIG_DATA();
    // setProductData(res.products.items);
    // setCategoryData(res?.categoryList[0]?.products?.items)
    if (res) {
      let arr = res?.storeConfig?.AppConfiguration?.AppData?.map(async item => {
        if (item?.name === 'app_slider' && item?.value) {
          let res = await GET_HOME_DATA(item?.value);
          setBannerData(res?.homeBannerSlider?.banners);
        } else if (item?.value) {
          let data = await GET_SLIDER_PRODUCTS(item?.value);
          console.log('data====>', data);
          if (item?.name === 'new_arrivals') {
            setNewArrivals(data.getSliderProducts);
          } else if (item?.name === 'our_perfumes') {
            setOurPerfumes(data.getSliderProducts);
          } else if (item?.name === 'premium_collection') {
            setPremiumCollection(data.getSliderProducts);
          } else if (item?.name === 'shop_womans') {
            setShopWomans(data.getSliderProducts);
          } else if (item?.name === 'shop_mans') {
            setShopMans(data.getSliderProducts);
          } else if (item?.name === 'sale') {
            setSales(data.getSliderProducts);
          }
          // item.data=data.getSliderProducts;
        }
      });
    }
  };

  const getCategory = async () => {
    let res = await GET_CATEGORY_LIST();
  };
  const getCategoryHome = async () => {
    let res = await GET_CATEGORY_LIST_HOME();
    setCategoryData(res?.categoryList);
  };

  const AddItemTowishlist = async (id, item) => {
    let res = await ADD_WISH_LST_API(id, item);
    console.log('res===>', res);
  };
  const renderBannerInnerList = item => {
    return (
      <Image resizeMode="contain" style={{flex: 1}} source={{uri: item}} />
    );
  };

  const renderItemProduct = ({item, index}) => {
    return (
      <ProductCard
        isHome={true}
        item={item}
        offer={false}
        favoriteOnSelect={data => {
          console.log('iteam', data);
        }}
        onSizeSelect={() => {
          console.log('iteam');
        }}
        onFullItemPress={() => {
          setSelectedProduct(item);
          setonOpenDailog(true);
        }}
      />
    );
  };
  const renderItem = ({item, index}) => {
    var Wishlist = false;
    var count = getWishlist?.filter(function (item1) {
      return item1?.product?.id == item?.id;
    });
    if (count == '' || count == null) {
      console.log('count', count);
      Wishlist = false;
    } else {
      console.log('count else', count);
      Wishlist = true;
    }

    return (
      <ProductCard
        isHome={true}
        item={item}
        offer={true}
        faviourite={Wishlist}
        favoriteOnSelect={async data => {
          let objNew = {
            sku: item.sku,
            quantity: 1,
          };
          let res = await AddItemTowishlist(0, objNew);
          let objNew1 = {
            product: {id: item.id},
          };
          SetWishlist([...getWishlist, objNew1]);
          SetWishlist([...getWishlist, objNew1]);
          try {
            await AsyncStorage.setItem(
              'wishlist1',
              JSON.stringify(getWishlist),
            );
          } catch (e) {
            console.log(e);
          }
        }}
        onSizeSelect={data => {}}
        onFullItemPress={() => {
          setSelectedProduct(item);
          setonOpenDailog(true);
        }}
      />
    );
  };

  const renderSaleItem = ({item}) => {
    return (
      <View>
        <ProductCard
          isHome={true}
          item={item}
          offer={true}
          favoriteOnSelect={data => {
            console.log('iteam', data);
          }}
          onSizeSelect={data => {}}
          onFullItemPress={() => {
            setSelectedProduct(item);
            setonOpenDailog(true);
          }}
        />
      </View>
    );
  };

  function renderFooter() {
    return (
      <View style={style.footer}>
        <Text
          style={{
            fontFamily: fontConstant.satoshi,
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
            color: colorConstant.DARK_PRIMARY,
          }}>
          {t('Show all')}
        </Text>
        <AntDesign
          name="arrowright"
          size={20}
          color={colorConstant.DARK_PRIMARY}
          style={{
            alignSelf: 'center',
            marginLeft: 10,
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}
        />
      </View>
    );
  }

  const cardrenderItem = ({item}) => {
    return (
      <ImageBackground
        source={{uri: 'https://mcstaging.ajmal.com/' + item?.app_banner}}
        key={item}
        resizeMode="cover"
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: Metrics.rfv(280),
          height: Metrics.rfv(130),
          backgroundColor: getRandomColor(),
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <Text
          style={{
            fontFamily: fontConstant.gambetta,
            fontStyle: 'italic',
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            color: colorConstant.BLACK,
            paddingHorizontal: 16,
            textAlign: 'center',
          }}>
          {item?.name}
        </Text>
      </ImageBackground>
    );
  };

  const renderFooterCard = () => {
    return (
      <View style={{marginLeft: 20, marginRight: 15}}>
        <Image
          source={imageConstant.catfive}
          style={{width: 100, height: 100}}
          resizeMode="contain"
        />
      </View>
    );
  };
  const onLayout = e => {
    setStateWidth(e.nativeEvent.layout.width);
  };
  const renderBannerImage = arr => {
    const _arr = arr.reduce((acc, d) => {
      acc.push(d.image);
      return acc;
    }, []);
    return (
      <Swiper
        autoplay
        loop
        showsPagination={false}
        style={{}}
        showsButtons={false}>
        {_arr.map(item => {
          return renderBannerInnerList(item);
        })}
      </Swiper>
    );
  };
  const closeDialog = () => {
    setonOpenDailog(false);
  };
  const renderItemPreminum = ({item, index}) => {
    console.log(item);
    var Wishlist = false;

    const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];

    function getRandomColor() {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      return COLORS[colorIndex];
    }
    // let finalPrice = item?.price_range[0]?.minimum_price[0]?.final_price[0];
    // let regularPrice = item?.price_range[0]?.minimum_price[0]?.regular_price[0];

    let finalPrice = item?.price_range?.minimum_price?.final_price;
    let regularPrice = item?.price_range?.minimum_price?.regular_price;
    let offer = item?.price_range?.minimum_price?.discount?.percent_off;
    var count = getWishlist?.filter(function (item1) {
      return item1?.product?.id == item?.id;
    });
    if (count == '' || count == null) {
      console.log('count', count);
      Wishlist = false;
    } else {
      console.log('count', count);
      Wishlist = true;
    }
    return (
      <TouchableOpacity
        style={{
          width: 180,
          height: 270,
          backgroundColor: getRandomColor(),
          borderRadius: 10,
        }}
        onPress={() => {
          navigationRef.navigate('ProductPage', {skuID: item?.sku});
        }}>
        <View
          style={{
            width: '100%',
            justifyContent:
              isStringNotNull(offer) && offer > 0
                ? 'space-between'
                : 'flex-end',
            flexDirection: 'row',
          }}>
          {isStringNotNull(offer) && offer > 0 && (
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
                {`${offer}%`}
              </Text>
            </View>
          )}
          <View style={{padding: 10}}>
            <MaterialIcons
              name={Wishlist == true ? 'favorite' : 'favorite-border'}
              size={22}
              color={colorConstant.BLACK}
              onPress={async () => {
                console.log('object', item);
                let objNew = {
                  sku: item.sku,
                  quantity: 1,
                };
                let res = await AddItemTowishlist(0, objNew);
                let objNew1 = {
                  product: {id: item.id},
                };
                SetWishlist([...getWishlist, objNew1]);
                SetWishlist([...getWishlist, objNew1]);
                // props.navigation.goBack();
              }}
            />
          </View>
        </View>

        <Image
          source={{uri: item.image}}
          style={{width: '50%', height: 150, alignSelf: 'center'}}
          resizeMode="contain"
        />
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              color: colorConstant.BLACK,
              fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
              fontStyle: 'italic',
              fontFamily: fontConstant.gambetta,
              fontWeight: fontConstant.WEIGHT_REGULAR,
              paddingHorizontal: 10,
            }}>
            {item.name}
          </Text>
          <View style={{flexDirection: 'row', marginTop: '2%'}}>
            <Text
              style={{
                color: colorConstant.DARK_PRIMARY,
                fontStyle: 'normal',
                fontSize: fontConstant.TEXT_20_SIZE_BOLD,
                fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
              }}>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
            {finalPrice?.value < regularPrice?.value && (
              <Text
                style={[
                  {
                    color: colorConstant.DARK_PRIMARY,
                    fontStyle: 'normal',
                    fontSize: fontConstant.TEXT_20_SIZE_BOLD,
                    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
                    marginLeft: 10,
                    color: colorConstant.LIGHT_GREY,
                    textDecorationLine: 'line-through',
                  },
                ]}>
                {`${regularPrice?.value} ${regularPrice?.currency}`}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={style.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />

        {onOpenDailog && (
          <ProductModal
            item={selectedProduct}
            onOpenDailog={onOpenDailog}
            setOnOpenDailog={closeDialog}
            // image={selectedProduct?.image.url}
            image={selectedProduct?.image}
            title={selectedProduct?.name}
            sku={selectedProduct.sku}
            cat={
              selectedProduct?.customAttributesAjmalData[0]?.display_category
            }
            price={
              selectedProduct?.price_range?.minimum_price?.final_price.value
            }
            offer={
              selectedProduct?.price_range?.minimum_price?.discount?.percent_off
              // selectedProduct?.discount_percent
            }
            displaySize1={
              selectedProduct?.customAttributesAjmalData[0]?.display_size
            }
            finalPrice={
              selectedProduct?.price_range?.minimum_price?.final_price
            }
            regularPrice={
              selectedProduct?.price_range?.minimum_price?.regular_price
            }
          />
        )}
        {bannerData && (
          <ImageBackground
            source={imageConstant.main_header}
            borderBottomRightRadius={25}
            style={style.header_view}>
            <SwiperFlatList
              showPagination
              data={bannerData}
              paginationDefaultColor={colorConstant.WHITE}
              paginationActiveColor={colorConstant.DARK_PRIMARY}
              paginationStyleItemActive={{width: 30, height: 5}}
              paginationStyleItemInactive={{width: 5, height: 5}}
              paginationStyle={style.paginationContain}
              renderItem={({item}) => (
                <View style={style.child}>
                  <View style={style.shop_view}>
                    <Text style={style.ajmal_text}>{item?.title}</Text>
                    <TouchableOpacity
                      style={style.shop_button}
                      onPress={() => {
                        // navigationRef.navigate('ProductPage', { skuID: item?.sku });
                      }}>
                      <Text style={style.button_text}>{t('Shop now')}</Text>
                    </TouchableOpacity>
                  </View>
                  <View onLayout={onLayout} style={style.banner_image_view}>
                    {renderBannerImage(item?.items)}
                  </View>
                </View>
              )}
            />
          </ImageBackground>
        )}

        <View style={style.searchContain}>
          <View style={style.searchbarRow}>
            <EvilIcons
              name="search"
              size={30}
              color={colorConstant.LIGHT_GREY}
            />
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SearchScreen')}
            style={style.TextInput_row_Contain}>
            <TextInput
              value={text}
              editable={false}
              pointerEvents="none"
              onChangeText={setText}
              placeholder={t('Search for perfume')}
              style={style.textinputContain}
            />
          </TouchableOpacity>
          <View style={style.micIcon_Contain}></View>
          <TouchableOpacity style={style.micContain}>
            <MaterialIcons
              name="mic-none"
              size={25}
              color={colorConstant.LIGHT_GREY}
              style={style.micnoneicon}
            />
          </TouchableOpacity>
        </View>

        <View style={style.container_two}>
          {!isObjectNullOrUndefined(newArrivals) && (
            <>
              <Text style={style.arrivals_text}>{t('New arrivals')}</Text>
              <FlatList
                data={newArrivals?.items}
                extraData={newArrivals?.items}
                renderItem={renderItemProduct}
                horizontal={true}
                ItemSeparatorComponent={(item, index) => {
                  return (
                    <View
                      style={{marginHorizontal: index === 0 ? 0 : 8}}></View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={renderFooter}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}

          {!isObjectNullOrUndefined(categoryData) && (
            <View style={{}}>
              <Text style={style.arrivals_text}>{t('Our perfumes')}</Text>
              <FlatList
                data={categoryData}
                extraData={categoryData}
                horizontal={true}
                keyExtractor={item => item.id}
                renderItem={cardrenderItem}
                // ListFooterComponent={renderFooterCard}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={(item, index) => {
                  return (
                    <View
                      style={{marginHorizontal: index === 0 ? 0 : 8}}></View>
                  );
                }}
              />
            </View>
          )}

          {!isObjectNullOrUndefined(premiumCollection) && (
            <View style={style.imageContstant_banner_image_Contain}>
              <ImageBackground
                source={imageConstant.banner}
                style={style.imageContstant_banner_image}
                borderRadius={16}
                resizeMode="cover">
                <Text style={style.premium_text}>
                  {t('Premium collection')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 24,
                    marginTop: 16,
                  }}>
                  <Text style={style.collection_text}>
                    {t('Go to collection')}
                  </Text>
                  <AntDesign
                    name="arrowright"
                    size={14}
                    color={colorConstant.WHITE}
                    style={{
                      alignSelf: 'center',
                      marginLeft: 10,
                      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    }}
                  />
                </View>

                <FlatList
                  data={premiumCollection?.items}
                  contentContainerStyle={{paddingHorizontal: 16}}
                  // renderItem={({item}) => {
                  //   return <PremiumCard item={item} offer={true} />;
                  // }}
                  renderItem={renderItemPreminum}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  // ListFooterComponent={renderFooter}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={(item, index) => {
                    return (
                      <View
                        style={{marginHorizontal: index === 0 ? 0 : 8}}></View>
                    );
                  }}
                />
              </ImageBackground>
            </View>
          )}

          {!isObjectNullOrUndefined(shopWomens) && (
            <>
              <View style={style.Premiumcollection_Conatin}>
                <ImageBackground
                  source={imageConstant.cardwomen}
                  style={style.imageConstant_card}
                  borderRadius={16}>
                  <Text style={style.premium_text}>{t(`Shop women's`)}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 24,
                      marginTop: 16,
                    }}>
                    <Text style={style.collection_text}>
                      {t('Go to collection')}
                    </Text>
                    <AntDesign
                      name="arrowright"
                      size={16}
                      color={colorConstant.WHITE}
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View style={style.perfumeData}>
                <FlatList
                  ItemSeparatorComponent={(item, index) => {
                    return (
                      <View
                        style={{marginHorizontal: index === 0 ? 0 : 8}}></View>
                    );
                  }}
                  data={shopWomens?.items}
                  renderItem={renderItem}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  ListFooterComponent={renderFooter}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </>
          )}

          {!isObjectNullOrUndefined(shopMans) && (
            <>
              <View style={style.imageConstant_cardman_Contain}>
                <ImageBackground
                  source={imageConstant.cardman}
                  style={style.imageConstant_card}
                  borderRadius={16}>
                  <Text style={style.premium_text}>{t(`Shop men's`)}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 24,
                      marginTop: 16,
                    }}>
                    <Text style={style.collection_text}>
                      {t('Go to collection')}
                    </Text>
                    <AntDesign
                      name="arrowright"
                      size={16}
                      color={colorConstant.WHITE}
                      style={[
                        style.arrowrightIcon,
                        {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
                      ]}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View style={style.perfumedata_contain}>
                <FlatList
                  data={perfumedata}
                  renderItem={renderItem}
                  horizontal={true}
                  keyExtractor={item => item.id}
                  ItemSeparatorComponent={(item, index) => {
                    return (
                      <View
                        style={{marginHorizontal: index === 0 ? 0 : 8}}></View>
                    );
                  }}
                  ListFooterComponent={renderFooter}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </>
          )}

          {!isObjectNullOrUndefined(sales) && (
            <View style={{marginTop: Metrics.rfp(-15)}}>
              <Text style={style.sale_text}>{t('Sale')}</Text>

              <FlatList
                data={sales.items}
                renderItem={renderSaleItem}
                horizontal={true}
                ItemSeparatorComponent={(item, index) => {
                  return (
                    <View
                      style={{marginHorizontal: index === 0 ? 0 : 8}}></View>
                  );
                }}
                keyExtractor={item => item.id}
                ListFooterComponent={renderFooter}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <Loader loading={loading} />
    </SafeAreaView>
  );
};

export default MainScreen;
