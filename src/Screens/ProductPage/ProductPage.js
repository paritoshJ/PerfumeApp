import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  I18nManager,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import style from './style';
import colorConstant from '../../constant/colorConstant';
import imageConstant from '../../constant/imageConstant';
import fontConstant from '../../constant/fontConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stringConstant from '../../constant/stringConstant';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {AccordionList} from 'accordion-collapse-react-native';
import review from '../../utils/review';
import Feather from 'react-native-vector-icons/Feather';
import faq from '../../utils/faq';
import perfumedata from '../../utils/perfumedata';
import ProductCard from '../../Component/ProducCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import AddReviewModal from '../../modal/Addreviewmodal';
import {useTranslation} from 'react-i18next';
import {GET_PRODUCT_DETAILS} from '../../api/getProductDetails';
import Loader from '../../Component/Loader';
import {
  dateFromNow,
  findDaysDiffrent,
  getInitials,
  isObjectNullOrUndefined,
  removeHtmlTags,
} from '../../Helper/helper';
import UIStepperView from '../../Component/UiStepper';
import {ADD_ITEM_TO_CART} from '../../api/addToCart';
import {ADD_TO_CART_DATA} from '../../api/getAddToCartData';
import {GET_PRODUCTS_FAQ} from '../../api/getProduct';

const ProductPage = props => {
  const [selected, setSelected] = useState('50 ml');
  const [decription, setdecription] = useState(true);
  const [reviewshow, setreviewshow] = useState(true);
  const [isAdded, setisAdded] = useState(false);
  const [visibale, setvisibale] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [productType, setProductType] = useState(null);
  const [productVariant, setProductVariant] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [faqListClipped, setFaqListClipped] = useState([]);
  const [value, setValue] = useState(1);
  const [skuValue, setSkuValue] = useState('');

  const {t, i18n} = useTranslation();
  const data = [
    {id: 1, name: 'abc'},
    {id: 2, name: 'text'},
    {id: 3, name: 'xyz'},
  ];
  useEffect(() => {
    if (props?.route.params.skuID) {
      console.log(props?.route.params.skuID);
      setSkuValue(props?.route.params.skuID);
      callProductDetailApi();
      getFaqList();
    }
  }, []);

  const callProductDetailApi = async () => {
    setLoading(true);
    const obj = {sku: {eq: props?.route.params.skuID}};
    // const obj = {sku: {eq: 'ETIQUETTE-config'}};
    await GET_PRODUCT_DETAILS(obj)
      .then(res => {
        console.log('callProductDetailApi', res);
        let deatil = res?.products?.items[0];
        chanageProductType(deatil);
        setProductDetail(deatil);
        setLoading(false);
        setProductVariant(deatil?.variants);
        if(deatil?.variants && deatil?.variants.length>0){
           setSelected(deatil?.variants[0]);
        }
        
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  };

  const getFaqList = async () => {
    const obj = {product_sku: props?.route.params.skuID};
    // const obj = {sku: {eq: 'ETIQUETTE-config'}};
    await GET_PRODUCTS_FAQ('', obj)
      .then(res => {
        console.log('GET_PRODUCTS_FAQ', res);
        let arraySliced = [];
        // setFaqList(res?.faqQuestionList?.items);
        setFaqList(res?.faqQuestionList?.items);
        setFaqListClipped(res?.faqQuestionList?.items);
        if (faqList.length > 3) {
          setFaqListClipped(faqList.slice(0, 3));
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const chanageProductType = productDetail => {
    console.log('tapped prod', productDetail);
    let productType = {};
    if (productDetail?.__typename === 'SimpleProduct') {
      productType = {
        image: productDetail?.image?.url,
        discount_percent: productDetail?.price_range?.minimum_price?.discount?.percent_off,
        media_gallery: productDetail?.media_gallery,
        product_lasting_hours:
          productDetail?.customAttributesAjmalData[0]?.product_lasting_hours,
        gender: productDetail?.customAttributesAjmalData[0]?.gender,
        display_size: productDetail?.customAttributesAjmalData[0]?.display_size,
        display_category:
          productDetail?.customAttributesAjmalData[0]?.display_category,
      };
    } else if (productDetail?.__typename === 'ConfigurableProduct') {
      productType = {
        image: productDetail?.image?.url,
        // discount_percent: productDetail?.discount_percent,
        discount_percent: productDetail?.price_range?.minimum_price?.discount?.percent_off,
        media_gallery: productDetail?.media_gallery,
        product_lasting_hours:
          productDetail?.customAttributesAjmalData[0]?.product_lasting_hours,
        gender: productDetail?.customAttributesAjmalData[0]?.gender,
        display_size: productDetail?.customAttributesAjmalData[0]?.display_size,
        display_category:
          productDetail?.customAttributesAjmalData[0]?.display_category,
        top_note_name:
          productDetail?.customAttributesAjmalData[0]?.top_note_name,
        base_note_name:
          productDetail?.customAttributesAjmalData[0]?.base_note_name,
        heart_note_name:
          productDetail?.customAttributesAjmalData[0]?.heart_note_name,
      };
      console.warn(productType, '000000');
      setProductVariant(productDetail?.variants);
      // var attributesArray = productDetail.variants.map(e => {
      //   return e.attributes;
      // });
      // console.warn(attributesArray, '--attributesArray-');
      // console.warn(
      //   productDetail?.configurable_options[0]?.values,
      //   '---variant',
      // );
    }
    if (!isObjectNullOrUndefined(productType)) {
      setProductType(productType);
    }
  };
  const body = item => {
    return (
      <View style={{padding: 10}}>
        <Text style={{textAlign: 'left', color: colorConstant.BLACK}}>
          {removeHtmlTags(item.answer)}
        </Text>
      </View>
    );
  };

  const head = (item, index, isExpanded) => {
    return (
      <View
        style={{
          paddingTop: 15,
          paddingBottom: 15,
          borderBottomColor: '#EEEDE7',
          borderBottomWidth: 1,
          color: colorConstant.BLACK,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: colorConstant.BLACK,
            fontFamily: fontConstant.satoshi,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            flex: 1,
          }}>
          {item.title}
        </Text>
        <AntDesign
          name={isExpanded ? 'minus' : 'plus'}
          size={20}
          color={colorConstant.BLACK}
        />
      </View>
    );
  };

  const reviewItem = ({item}) => {
    console.warn(item, '---d');
    return (
      <View style={{width: '100%', marginTop: '5%', flexDirection: 'row'}}>
        <View
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorConstant.BROWN_CUSTOM,
            borderRadius: 100,
            height: 50,
            width: 50,
            marginEnd: 10,
          }}>
          <Text style={{}}>{getInitials(item.nickname)}</Text>
        </View>
        <View style={{width: '80%'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={style.review_user_name}>{item.nickname}</Text>
            <Text
              style={[style.review_text, {color: colorConstant.LIGHT_GREY}]}>
              {findDaysDiffrent(item.created_at)}
            </Text>
          </View>
          <Rating
            ratingCount={item?.average_rating / 20}
            type="custom"
            ratingBackgroundColor={colorConstant.DARK_PRIMARY}
            ratingColor={colorConstant.DARK_PRIMARY}
            imageSize={15}
            onFinishRating={ratingCompleted}
            style={{alignItems: 'flex-start', marginTop: 10}}
          />
          <Text style={[style.review_text, {color: '#2B2826', marginTop: 5}]}>
            {item.text ?? item.summary}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <ProductCard
          item={item}
          offer={false}
          onSizeSelect={data => {}}
          onFullItemPress={() => {
            // setSelectedProduct(item);
            // setonOpenDailog(true);
          }}
        />
      </>
    );
  };

  function renderFooter() {
    return (
      <View style={style.footer}>
        <Image
          source={imageConstant.card}
          style={{width: '100%', height: '100%'}}
          resizeMode="contain"
        />
      </View>
    );
  }
  const ratingCompleted = rating => {};
  const renderHearderImageView = () => {
    console.log('productType', productType);
    let item = {};

    return (
      <ImageBackground
        style={style.header_container}
        // source={{uri:productDetail?.image?.url}}
        resizeMode="center">
        <View style={style.share_view}>
          <AntDesign
            name="left"
            size={22}
            color={colorConstant.LIGH_GREY}
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{
              marginLeft: 15,
              transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
            }}
          />
          <Feather
            name="share"
            size={22}
            color={colorConstant.LIGH_GREY}
            onPress={() => {}}
            style={{marginRight: 15}}
          />
        </View>
        {productType?.media_gallery?.length > 0 && (
          <SwiperFlatList
            showPagination
            data={productType?.media_gallery}
            paginationDefaultColor={colorConstant.WHITE}
            paginationActiveColor={colorConstant.DARK_PRIMARY}
            paginationStyleItemActive={{width: 5, height: 5}}
            paginationStyleItemInactive={{width: 5, height: 5}}
            paginationStyle={{
              marginBottom: '12%',
              alignSelf: 'center',
              width: '100%',
            }}
            renderItem={({item}) => (
              <View style={style.child}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: '5%',
                  }}>
                  <View style={{width: '30%'}}>
                    <View style={style.vanilla}>
                      <Text style={style.text}>
                        {productType?.top_note_name}
                      </Text>
                    </View>
                    <View style={style.rose}>
                      <Text style={style.text}>
                        {productType?.heart_note_name}
                      </Text>
                    </View>
                    <View style={style.oud}>
                      <Text style={style.text}>
                        {productType?.base_note_name}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      height: 250,
                    }}>
                    <Image
                      source={{uri: item?.url}}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                  {productType?.discount_percent && productType?.discount_percent>0 && (
                    <View style={style.offer}>
                      <View style={style.offer_view}>
                        <Text style={style.offer_text}>
                          {`${productType?.discount_percent}%`}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}
          />
        )}
      </ImageBackground>
    );
  };

  const renderItemWeight = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          style.product_size,
          {
            borderColor:
              selected == item
                ? 'rgba(188, 139, 87, 0.9)'
                : 'rgba(43, 40, 38, 0.1)',
          },
        ]}
        onPress={() => {
          setSelected(item);
          let prodType = {
            ...productType,
            image: item?.product?.image?.url,
            discount_percent: item?.product?.discount_percent,
            media_gallery: item?.product?.media_gallery,

            // product_lasting_hours: productDetail?.customAttributesAjmalData
            //   ? productDetail?.customAttributesAjmalData[0]
            //       ?.product_lasting_hours
            //   : '',
            // gender: productDetail?.customAttributesAjmalData
            //   ? productDetail?.customAttributesAjmalData[0]?.gender
            //   : '',
            // display_size: productDetail?.customAttributesAjmalData
            //   ? productDetail?.customAttributesAjmalData[0]?.display_size
            //   : '',
            // display_category: productDetail?.customAttributesAjmalData
            //   ? productDetail?.customAttributesAjmalData[0]?.display_category
            //   : '',
          };
          setProductType(prodType);
        }}>
        <Text style={style.product_size_text}>
          {item?.attributes?.[0]?.label}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderPriceView = () => {
    let finalPrice = productDetail?.price_range?.minimum_price?.final_price;
    let regularPrice = productDetail?.price_range?.minimum_price?.regular_price;
    return (
      <View style={style.price_view}>
        <Text
          style={
            style.offer_price
          }>{`${finalPrice?.value} ${finalPrice?.currency}`}</Text>
        {finalPrice?.value < regularPrice?.value && (
          <Text
            style={[
              style.offer_price,
              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
                textDecorationLine: 'line-through',
              },
            ]}>
            {`${regularPrice?.value} ${regularPrice?.currency}`}
          </Text>
        )}
      </View>
    );
  };

  const handleAddItemToCart = async () => {
    // setLoading(true);
    setisAdded(true);
    let res = await ADD_TO_CART_DATA(value, skuValue);
    // setLoading(false);
    setisAdded(false);

    if (res) {
      console.log('CART_DATA', res);
      Alert.alert('Your item is added to cart successfully');
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={style.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {!loading && (
          <>
            {renderHearderImageView()}
            <View
              style={{
                width: '90%',
                backgroundColor: colorConstant.PRIMARY,
                padding: 10,
                borderRadius: 20,
                alignSelf: 'center',
                bottom: '2%',
              }}>
              <View style={{alignItems: 'flex-start'}}>
                <Text style={style.product_name}>{productDetail?.name}</Text>
              </View>
              <View
                style={{flexDirection: 'row', marginTop: 10, marginLeft: 5}}>
                <Image
                  source={imageConstant.wave}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text style={style.last_time_offer_text}>
                  {`Lasting hours: ${productType?.product_lasting_hours}`}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  marginLeft: 5,
                }}>
                {productDetail?.__typename === 'SimpleProduct' ? (
                  <TouchableOpacity
                    style={[
                      style.product_size,
                      {
                        borderColor:
                          selected == '50 ml'
                            ? 'rgba(188, 139, 87, 0.9)'
                            : 'rgba(43, 40, 38, 0.1)',
                      },
                    ]}
                    onPress={() => {
                      setSelected('50 ml');
                    }}>
                    <Text style={style.product_size_text}>
                      {productType?.display_size}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <FlatList
                    data={productVariant}
                    renderItem={renderItemWeight}
                    horizontal
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={(item, index) => {
                      return (
                        <View
                          style={{
                            marginHorizontal: index === 0 ? 0 : 8,
                          }}
                        />
                      );
                    }}
                  />
                )}
              </View>

              {renderPriceView()}
              {/* <View style={style.free_offer_view}>
          <Text style={style.free_offer_text}>
            {'Or 3 interest free payments \n of AED 4'}
          </Text>
          <Image
            source={imageConstant.spotii}
            style={{width: 100, height: 30, marginLeft: 10}}
            resizeMode="contain"
          />
        </View> */}
            </View>

            <View
              style={{
                width: '90%',
                backgroundColor: colorConstant.WHITE,
                justifyContent: 'center',
                alignSelf: 'center',
                marginBottom: '10%',
                marginTop: '-10%',
              }}>
              <View style={style.dicription_view}>
                <View style={style.des_title_text}>
                  <Text style={style.des_titile}>{t('Decription')}</Text>
                  <AntDesign
                    name={decription ? 'minus' : 'plus'}
                    size={30}
                    color={colorConstant.DARK_PRIMARY}
                    onPress={() => {
                      setdecription(!decription);
                    }}
                  />
                </View>

                {decription && (
                  <Text style={style.des_text}>
                    {removeHtmlTags(
                      productDetail?.description?.html
                        ? productDetail?.description?.html
                        : productDetail?.short_description?.html,
                    )}
                  </Text>
                )}
              </View>

              {/* <View style={style.des_title_text}>
          <Text style={[style.des_titile, {color: colorConstant.BLACK}]}>
            {t('fragrance details')}
          </Text>
          <AntDesign name="plus" size={20} color={colorConstant.BLACK} />
        </View> */}
              {productDetail?.reviews?.items?.length > 0 && (
                <View>
                  <View style={style.border}></View>
                  <View style={[style.des_title_text, {marginTop: '8%'}]}>
                    <Text style={[style.des_titile]}>{t('Reviews')}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Rating
                        type="custom"
                        ratingBackgroundColor={colorConstant.DARK_PRIMARY}
                        ratingColor={colorConstant.DARK_PRIMARY}
                        ratingCount={productDetail?.review_count}
                        imageSize={20}
                        onFinishRating={ratingCompleted}
                        style={{paddingVertical: 10, marginRight: 10}}
                      />
                      <View
                        style={{
                          width: 40,
                          height: 25,
                          borderRadius: 25,
                          borderWidth: 1,
                          borderColor: colorConstant.LIGHT_PRIMARY,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={[
                            style.des_titile,
                            {color: colorConstant.DARK_PRIMARY},
                          ]}>
                          {productDetail?.reviews?.items?.length}
                        </Text>
                      </View>

                      <AntDesign
                        name={reviewshow ? 'minus' : 'plus'}
                        size={30}
                        color={colorConstant.DARK_PRIMARY}
                        onPress={() => {
                          setreviewshow(!reviewshow);
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}

              {reviewshow && productDetail?.reviews?.items?.length > 0 && (
                <>
                  <FlatList
                    data={productDetail?.reviews?.items}
                    renderItem={reviewItem}
                  />

                  {productDetail?.reviews?.items?.length <= 3 && (
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <TouchableOpacity
                        style={[
                          style.review_add_view,
                          {backgroundColor: colorConstant.DARK_PRIMARY},
                        ]}
                        onPress={() => {
                          setvisibale(true);
                        }}>
                        <Text
                          style={[
                            style.text_viewall,
                            {color: colorConstant.WHITE},
                          ]}>
                          {t('Add review')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {productDetail?.reviews?.items?.length == 3 && (
                    <View
                      style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: '10%',
                      }}>
                      <TouchableOpacity
                        style={[
                          style.review_add_view,
                          {
                            borderColor: colorConstant.DARK_PRIMARY,
                            borderWidth: 1,
                          },
                        ]}
                        onPress={() => {
                          props.navigation.navigate('ReviewScreen', {
                            reviewData: productDetail?.reviews?.items,
                            rating_summary: productDetail?.rating_summary,
                            review_count: productDetail?.review_count,
                          });
                        }}>
                        <Text style={style.text_viewall}>{t('View all')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          style.review_add_view,
                          {backgroundColor: colorConstant.DARK_PRIMARY},
                        ]}
                        onPress={() => {
                          setvisibale(true);
                        }}>
                        <Text
                          style={[
                            style.text_viewall,
                            {color: colorConstant.WHITE},
                          ]}>
                          {t('Add review')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </>
              )}

              <View style={style.border}></View>

              <View style={{alignItems: 'flex-start'}}>
                <Text
                  style={[
                    {fontSize: fontConstant.TEXT_20_SIZE_BOLD,},
                  ]}>
                  {t('FAQ')}
                </Text>
              </View>
              <AccordionList
                list={faqListClipped}
                header={head}
                body={body}
                keyExtractor={item => `${item.answer}`}
              />

              {faqList.length > 3 && (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: 40,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: colorConstant.DARK_PRIMARY,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '8%',
                  }}
                  onPress={() =>
                    props.navigation.navigate('FAQList', {
                      sku: skuValue,
                      faqList: faqList,
                    })
                  }>
                  <Text style={style.text_viewall}>{t('View all')}</Text>
                </TouchableOpacity>
              )}

              <View
                style={{
                  marginTop: '10%',
                  flexDirection: 'column',
                  backgroundColor: 'rgba(188, 139, 87, 0.1)',
                  padding: 15,
                  borderRadius: 20,
                }}>
                <View style={{flexDirection: 'row', marginTop: '3%'}}>
                  <Image
                    source={imageConstant.shine}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Text style={style.condition_text}>
                    Free samples for all orders
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: '5%'}}>
                  <Image
                    source={imageConstant.bus}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Text style={style.condition_text}>
                    Free samples for all orders
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: '5%'}}>
                  <Image
                    source={imageConstant.offer}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Text style={style.condition_text}>
                    Free samples for all orders
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: '5%'}}>
                  <Image
                    source={imageConstant.cashondelivery}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Text style={style.condition_text}>
                    Free samples for all orders
                  </Text>
                </View>
              </View>
            </View>

            {productDetail?.related_products?.length > 0 && (
              <>
                <View style={{alignItems: 'flex-start'}}>
                  <Text
                    style={[
                      style.product_name,
                      {
                        fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
                        marginTop: '-3%',
                        marginLeft: 20,
                      },
                    ]}>
                    {t('Recommended products')}
                  </Text>
                </View>
                <View
                  style={{width: '100%', marginTop: '5%', marginLeft: '5%'}}>
                  <FlatList
                    data={productDetail?.related_products}
                    renderItem={renderItem}
                    horizontal={true}
                    keyExtractor={item => item.id}
                    ListFooterComponent={renderFooter}
                    ItemSeparatorComponent={(item, index) => {
                      return (
                        <View
                          style={{
                            marginHorizontal: index === 0 ? 0 : 8,
                          }}></View>
                      );
                    }}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </>
            )}

            <View style={style.add_card_view}>
              <View
                style={{
                  width: '30%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <UIStepperView
                  value={value}
                  setValue={val => {
                    setValue(val);
                    console.log(val, '---added count');
                  }}
                />
              </View>
              <View
                style={{
                  width: '55%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    handleAddItemToCart();
                  }}
                  style={[
                    style.review_add_view,
                    {backgroundColor: colorConstant.DARK_PRIMARY},
                  ]}>
                  <Text
                    style={[style.text_viewall, {color: colorConstant.WHITE}]}>
                    {t('Add to cart')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '15%',
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    backgroundColor: 'rgba(188, 139, 87, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {/* <Image
              source={imageConstant.fav}
              style={{
                width: 18,
                height: 18,
                tintColor: colorConstant.DARK_PRIMARY,
              }}
              resizeMode="contain"
            /> */}
                  <MaterialIcons
                    name="favorite-border"
                    size={22}
                    color={colorConstant.DARK_PRIMARY}
                    onPress={() => {
                      props.navigation.goBack();
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        )}

        {visibale && (
          <AddReviewModal
            onOpenDailog={visibale}
            setOnOpenDailog={setvisibale}
            submitRating={data => {
              setvisibale(false);
              console.log(data, '--rate data');
            }}
          />
        )}
      </ScrollView>
      <Loader loading={loading} />
      <Loader loading={isAdded} />
    </SafeAreaView>
  );
};

export default ProductPage;
