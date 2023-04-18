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
import {GET_HOME_DATA} from '../../api/getHomeData';
import alertMsgConstant from '../../constant/alertMsgConstant';

const MainScreen = props => {
  const [onOpenDailog, setonOpenDailog] = useState(false);
  const [stateWidth, setStateWidth] = useState(300);
  const [productData, setProductData] = useState('');
  const [saleDataArr, setSaleDataArr] = useState();
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bannerData, setBannerData] = useState([]);
  // const data = [
  //   {id: 1, name: 'abc'},
  //   {id: 2, name: 'text'},
  //   {id: 3, name: 'xyz'},
  // ];
  const [text, setText] = useState('');
  const {t, i18n} = useTranslation();
  
  useEffect(() => {
    getCategory();
    getHomeData();
  }, []);

  const getCategory = async () => {
    let res = await GET_PRODUCTS();
    setProductData(res.products.items);
    console.log("res.products.items",res.products.items);
  };

  const getHomeData = async () => {
    let res = await GET_HOME_DATA();
    console.log("HOME_DATA", res)
    if(res){
      setBannerData(res?.homeBannerSlider?.banners)
    }
    // const saleData = res.category.children.filter((t) => t.name === "SALE");
    // const saleDataChild = (saleData[0]);
    // setSaleDataArr(JSON.stringify(saleDataChild));
  };  


  

  const renderItemProduct = ({item, index}) => {
    return (
      <ProductCard 
      item={item} 
      offer={false}
      onSizeSelect={(data)=>{}} 
      onFullItemPress ={() => {
          setSelectedProduct(item);
          setonOpenDailog(true);
        }}/>
    );
  };
  const renderItem = ({item, index}) => {
    return (
       <ProductCard item={item} offer={false} onSizeSelect={(data)=>{}} 
      onFullItemPress ={() => {
          // setSelectedProduct(item);
          // setonOpenDailog(true);
        }} />
    );
  };

  const renderSaleItem = ({item}) => {
    return (
      <View key={item}>
        <ProductCard item={item} offer={true} onSizeSelect={(data)=>{}} 
      onFullItemPress ={() => {
          // setSelectedProduct(item);
          // setonOpenDailog(true);
        }} />
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
      <View
        key={item}
        style={{
          width: Metrics.rfv(280),
          height: Metrics.rfv(130),
          marginLeft: 10,
          marginTop: '5%',
        }}>
        <ImageBackground
          source={item.image}
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          borderRadius={15}
          // resizeMode="contain"
        >
          <Text
            style={{
              fontFamily: fontConstant.gambetta,
              fontStyle: 'italic',
              fontSize: fontConstant.TEXT_24_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_REGULAR,
              color: colorConstant.WHITE,
            }}>
            {item.name}
          </Text>
        </ImageBackground>
      </View>
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
const onLayout = (e) => {
  setStateWidth(e.nativeEvent.layout.width);
  // this.setState({
  //   width: e.nativeEvent.layout.width
  // });
};
  const renderBannerImage = (arr) =>{
    console.log('renderBannerImage',arr);
    const _arr = arr.reduce((acc,d)=>{acc.push(d.image); return acc},[]);
    <FlatList  />
    // return   null;
  //   _arr.map((item))
  //    return   <SliderBox 
  //    images={arr.reduce((acc,d)=>{acc.push(d.image); return acc},[])}
  //   //  sliderBoxHeight={400}
  //    autoplay={true}
  // circleLoop={true}
  // resizeMethod={'resize'}
  // resizeMode={'center'}
  
  // autoplayInterval={1000}
  // onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
  //  parentWidth={stateWidth}
  //    />

  }
  const closeDialog=()=>{setonOpenDailog(false)}
  return (
    <ScrollView style={style.container}>
      {/* <StatusBar
        backgroundColor={colorConstant.PRIMARY}
        barStyle="dark-content"
      /> */}
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
          image={selectedProduct?.image.url}
          title={selectedProduct?.name}
          sku={selectedProduct.sku}
          cat={selectedProduct?.customAttributesAjmalData[0]?.display_category}
          price={
            selectedProduct?.price_range?.minimum_price?.regular_price?.value
          }
          offer={
            selectedProduct?.price_range?.minimum_price?.discount?.amount_off
          }
          displaySize1={
            selectedProduct?.customAttributesAjmalData[0]?.display_size
          }
        />
      )}
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
                <Text style={style.ajmal_text}>
                  {item?.title}
                </Text>
                <TouchableOpacity style={style.shop_button}>
                  <Text style={style.button_text}>{t('Shop now')}</Text>
                </TouchableOpacity>
              </View>
               <View onLayout={onLayout} style={style.banner_image_view}>
                {/* {renderBannerImage(item?.items)} */}
               </View>
              
            </View>
          )}
        />
      </ImageBackground>

      <View style={style.searchContain}>
        <View style={style.searchbarRow}>
          <EvilIcons name="search" size={30} color={colorConstant.LIGHT_GREY} />
        </View>
        <View style={style.TextInput_row_Contain}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder={t('Search for perfume')}
            style={style.textinputContain}
          />
        </View>
        <View style={style.micContain}>
          <View style={style.micIcon_Contain}></View>
          <MaterialIcons
            name="mic-none"
            size={25}
            color={colorConstant.LIGHT_GREY}
            style={style.micnoneicon}
          />
        </View>
      </View>

      <View style={style.container_two}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
          }}>
          <Text style={style.arrivals_text}>{t('New arrivals')}</Text>
        </View>

        <View style={style.perfumeData_Conatain}>
          <FlatList
            data={productData}
            renderItem={renderItemProduct}
            horizontal={true}
            ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'flex-start',
          }}>
          <Text style={style.perfumestextcontain}>{t('Our perfumes')}</Text>
        </View>
        <View>
          <FlatList
            data={carddata}
            horizontal={true}
            keyExtractor={item => item.id}
            renderItem={cardrenderItem}
            // ListFooterComponent={renderFooterCard}
            showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}

          />
        </View>

        <View style={style.imageContstant_banner_image_Contain}>
          <ImageBackground
            source={imageConstant.banner}
            style={style.imageContstant_banner_image}
            resizeMode="contain">
            <Text style={style.premium_text}>{t('Premium collection')}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={style.collection_text}>{t('Go to collection')}</Text>
              <AntDesign
                name="arrowright"
                size={25}
                color={colorConstant.WHITE}
                style={{
                  alignSelf: 'center',
                  marginLeft: 10,
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                }}
              />
            </View>

            <FlatList
              data={premiumdata}
              renderItem={({item}) => {
                return (
                    <PremiumCard item={item} offer={true} />
                );
              }}
              horizontal={true}
              keyExtractor={item => item.id}
              // ListFooterComponent={renderFooter}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}

            />
          </ImageBackground>
        </View>

        <View style={style.Premiumcollection_Conatin}>
          <ImageBackground
            source={imageConstant.cardwomen}
            style={style.imageConstant_card}
            borderRadius={20}>
            <Text style={style.premium_text}>{t(`Shop women's`)}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={style.collection_text}>{t('Go to collection')}</Text>
              <AntDesign
                name="arrowright"
                size={25}
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
                          ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}

            data={perfumedata}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={style.imageConstant_cardman_Contain}>
          <ImageBackground
            source={imageConstant.cardman}
            style={style.imageConstant_card}
            borderRadius={20}>
            <Text style={style.premium_text}>{t(`Shop men's`)}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={style.collection_text}>{t('Go to collection')}</Text>
              <AntDesign
                name="arrowright"
                size={25}
                color={colorConstant.WHITE}
                style={[
                  style.arrowrightIcon,
                  {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]},
                ]}
              />
            </View>
          </ImageBackground>
        </View>
        {/* <View style={style.perfumedata_contain}>
          <FlatList
            data={perfumedata}
            renderItem={renderItem}
            horizontal={true}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            ListFooterComponent={renderFooter}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}

        {/* <View style={{marginTop: '-25%'}}>
          <Text style={style.sale_text}>{t('Sale')}</Text>

          <FlatList
            style={{marginLeft: 20}}
            data={saleDataArr}
            renderItem={renderSaleItem}
            horizontal={true}
            ItemSeparatorComponent={(item, index)=>{return (<View style={{marginHorizontal :  index === 0 ? 0 : 10}}></View>)}}
            keyExtractor={item => item.id}
            ListFooterComponent={renderFooter}
            showsHorizontalScrollIndicator={false}
          />
        </View> */}
      </View>
    </ScrollView>
  );
};

export default MainScreen;
