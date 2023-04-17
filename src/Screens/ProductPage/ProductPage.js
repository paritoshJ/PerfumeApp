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
} from 'react-native';
import React, {useState} from 'react';
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

const ProductPage = props => {
  const [selected, setSelected] = useState('50 ml');
  const [decription, setdecription] = useState(true);
  const [reviewshow, setreviewshow] = useState(true);
  const [visibale, setvisibale] = useState(false);
  const {t, i18n} = useTranslation();
  const data = [
    {id: 1, name: 'abc'},
    {id: 2, name: 'text'},
    {id: 3, name: 'xyz'},
  ];

  const body = item => {
    return (
      <View style={{padding: 10}}>
        <Text style={{textAlign: 'center', color: colorConstant.BLACK}}>
          {item.body}
        </Text>
      </View>
    );
  };

  const head = item => {
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
          }}>
          {item.title}
        </Text>
        <AntDesign name="plus" size={20} color={colorConstant.BLACK} />
      </View>
    );
  };

  const reviewItem = ({item}) => {
    return (
      <View style={{width: '100%', marginTop: '5%', flexDirection: 'row'}}>
        <View style={{width: '20%'}}>
          <Image
            source={item.image}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </View>
        <View style={{width: '80%'}}>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={style.review_user_name}>{item.name}</Text>
            <Text
              style={[style.review_text, {color: colorConstant.LIGHT_GREY}]}>
              {item.time}
            </Text>
          </View>
          <Rating
            type="custom"
            ratingBackgroundColor={colorConstant.DARK_PRIMARY}
            ratingColor={colorConstant.DARK_PRIMARY}
            imageSize={15}
            onFinishRating={ratingCompleted}
            style={{alignItems: 'flex-start', marginTop: 10}}
          />
          <Text style={[style.review_text, {color: '#2B2826', marginTop: 5}]}>
            {item.review}
          </Text>
        </View>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <>
        <ProductCard item={item} offer={false} />
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
  return (
    <ScrollView style={style.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ImageBackground
        style={style.header_container}
        source={imageConstant.product_bg}
        resizeMode="stretch">
        <View style={style.share_view}>
          <AntDesign
            name="left"
            size={22}
            color={colorConstant.LIGH_GREY}
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{marginLeft: 15,transform:[{scaleX:I18nManager.isRTL? -1 : 1}]}}
          />
          <Feather
            name="share"
            size={22}
            color={colorConstant.LIGH_GREY}
            onPress={() => {}}
            style={{marginRight: 15}}
          />
        </View>
        <SwiperFlatList
          showPagination
          data={data}
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
                style={{width: '100%', flexDirection: 'row', marginTop: '5%'}}>
                <View style={{width: '30%'}}>
                  <View style={style.vanilla}>
                    <Text style={style.text}>Vanilla</Text>
                  </View>
                  <View style={style.rose}>
                    <Text style={style.text}>Rose</Text>
                  </View>
                  <View style={style.oud}>
                    <Text style={style.text}>Oud</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '50%',
                    height: 250,
                  }}>
                  <Image
                    source={imageConstant.perfume_one}
                    style={{width: '100%', height: '100%'}}
                    resizeMode="contain"
                  />
                </View>
                <View style={style.offer}>
                  <View style={style.offer_view}>
                    <Text style={style.offer_text}>50%</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </ImageBackground>

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
          <Text style={style.product_name}>{t('Amber Wood Noir')}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 5}}>
          <Image
            source={imageConstant.wave}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
          <Text style={style.last_time_offer_text}>
            Lasting hours: 5-8 hours
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 5}}>
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
            <Text style={style.product_size_text}>50 ml</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              style.product_size,
              {
                borderColor:
                  selected == '100 ml'
                    ? 'rgba(188, 139, 87, 0.9)'
                    : 'rgba(43, 40, 38, 0.1)',
                marginLeft: 10,
              },
            ]}
            onPress={() => {
              setSelected('100 ml');
            }}>
            <Text style={style.product_size_text}>100 ml</Text>
          </TouchableOpacity>
        </View>

        <View style={style.price_view}>
          <Text style={style.offer_price}>12 AED</Text>
          <Text
            style={[
              style.offer_price,
              {
                marginLeft: 10,
                color: colorConstant.LIGHT_GREY,
              },
            ]}>
            24 AED
          </Text>
        </View>

        <View style={style.free_offer_view}>
          <Text style={style.free_offer_text}>
            {'Or 3 interest free payments \n of AED 4'}
          </Text>
          <Image
            source={imageConstant.spotii}
            style={{width: 100, height: 30, marginLeft: 10}}
            resizeMode="contain"
          />
        </View>
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
            <Text style={style.des_text}>{stringConstant.des_text}</Text>
          )}
        </View>

        <View style={style.border}></View>

        <View style={style.des_title_text}>
          <Text style={[style.des_titile, {color: colorConstant.BLACK}]}>
            {t('fragrance details')}
          </Text>
          <AntDesign name="plus" size={20} color={colorConstant.BLACK} />
        </View>
        <View style={[style.des_title_text, {marginTop: '8%'}]}>
          <Text style={[style.des_titile]}>{t('reviews')}</Text>
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
              ratingCount={5}
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
                style={[style.des_titile, {color: colorConstant.DARK_PRIMARY}]}>
                32
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

        {reviewshow && (
          <>
            <FlatList data={review} renderItem={reviewItem} />

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
                  {borderColor: colorConstant.DARK_PRIMARY, borderWidth: 1},
                ]}
                onPress={() => {
                  props.navigation.navigate('ReviewScreen');
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
                  style={[style.text_viewall, {color: colorConstant.WHITE}]}>
                  {t('Add review')}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={style.border}></View>

        <View style={{alignItems: 'flex-start'}}>
          <Text
            style={[
              style.product_name,
              {fontSize: fontConstant.TEXT_20_SIZE_BOLD, paddingTop: 10},
            ]}>
            {t('FAQ')}
          </Text>
        </View>
        <AccordionList
          list={faq}
          header={head}
          body={body}
          keyExtractor={item => `${item.id}`}
        />

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
          }}>
          <Text style={style.text_viewall}>{t('View all')}</Text>
        </TouchableOpacity>

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
      <View style={{width: '100%', marginTop: '5%', marginLeft: '5%'}}>
        <FlatList
          data={perfumedata}
          renderItem={renderItem}
          horizontal={true}
          keyExtractor={item => item.id}
          ListFooterComponent={renderFooter}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={style.add_card_view}>
        <View
          style={{
            width: '30%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 40,
              backgroundColor: 'rgba(188, 139, 87, 0.1)',
              borderRadius: 20,
              justifyContent: 'space-around',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={imageConstant.mins}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
            <Text>1</Text>
            <Image
              source={imageConstant.plus}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View
          style={{
            width: '55%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              style.review_add_view,
              {backgroundColor: colorConstant.DARK_PRIMARY},
            ]}>
            <Text style={[style.text_viewall, {color: colorConstant.WHITE}]}>
              {t('Add review')}
            </Text>
          </View>
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
      {visibale && (
        <AddReviewModal onOpenDailog={visibale} setOnOpenDailog={setvisibale} />
      )}
    </ScrollView>
  );
};

export default ProductPage;
