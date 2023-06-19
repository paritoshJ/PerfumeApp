/* eslint-disable react-native/no-inline-styles */
import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  I18nManager,
  FlatList,
} from 'react-native';
import Metrics from '../../Helper/metrics';
// import {AccordionList} from 'accordion-collapse-react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import CustomSwitch from '../../Component/searchComponent';
import colorConstant from '../../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontConstant from '../../constant/fontConstant';
import {useTranslation} from 'react-i18next';

import MyStatusBar from '../../Component/MyStatusBar';
import { GET_FAQ_API } from '../../api/getFaqFilter';
import { GET_PRODUCTS_FAQ } from '../../api/getProduct';
import {FlatGrid} from 'react-native-super-grid';
import FaqSVG from '../../assets/svg/FAQ';
import EmptyPageView from '../../Component/EmptyPageView';
import { SafeAreaView } from 'react-native';
import Loader from '../../Component/Loader';

export default function FAQ({navigation}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const plusImg = require('../../../assets/plus-sign.png');
  const minusImg = require('../../../assets/minus-color-sign.png');
  const {t} = useTranslation();
  const onSelectSwitch = index => {};
  const [faqList, setFaqList] = useState([])
  const [mainfaqList, setMainFaqList] = useState([])

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSearch = (text) => {
   if(text.trim().length > 0){
      let arr = [...mainfaqList]
      let newArrr = arr.filter((item)=>{
        return item.title.includes(text);
      })
      setFaqList(newArrr)
   }else{
    setFaqList(mainfaqList)
   }
  };
const getIcons = (item) =>{
  if(item?.identifier === 'online-order'){
   return require('./../../assets/icon/Box.png')
  }else if(item?.identifier === 'shipping'){
   return require('./../../assets/icon/Delivery.png')
  }else if(item?.identifier === 'return'){
   return require('./../../assets/icon/Returns.png')
  }else if(item?.identifier === 'payment'){
   return require('./../../assets/icon/Credit.png')
  }else if(item?.identifier === 'customer-service'){
   return require('./../../assets/icon/Gear.png')
  }else{
    return {uri:item?.image}
  }
}

useEffect(async () => {
  setLoading(true)
  let search = '';
  let filter = {
    // category_id:{eq:''},
    // title: {eq:'return'},
  };
  const res =  await GET_FAQ_API(search,filter);
  setLoading(false)
  console.log(res);
  if(res?.faqCategoryList?.items){
   setFaqList(res?.faqCategoryList?.items);
   setMainFaqList(res?.faqCategoryList?.items);
  }
  
  
  }, [])

  const renderItemProduct = ({ item,index }) => {
    var faqs = item?.questions?.items.length > 1 ? ' FAQS' : ' FAQ';
      return <TouchableOpacity
      style={styles.loginPageComponentView}
      onPress={() => navigation.navigate('OnlineOrder',{
        title:item?.title,
        questions:item?.questions?.items,
      })}>
      <View style={styles.loginPageComponentview1}>
        <View>
          <Image style={styles.loginPageComponent} source={getIcons(item)} />
        </View>
          <Text style={styles.loginPageComponentview2}>{item?.title}</Text>
          <Text style={styles.loginPageComponentviewfaqcount}>{item?.questions?.items.length + faqs}</Text>
      </View>
    </TouchableOpacity>
  
  
  };
  const renderEmptyAndNoLogin = () =>{
  return <EmptyPageView 
          icon={<FaqSVG/>}
          title={t("FAQ Not found")}
          message={t('FAQ seems to be empty.')}
          hideAddButton={true}
          onButtonPress={()=>{}}
          buttonTitle={''}
          />
  }
  return (
    <SafeAreaView style={{flex: 1}}>
    {!isLoading && <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <ImageBackground
        style={styles.header_container}
        source={require('../../../assets/FAQ-back.png')}
        resizeMode="stretch">
        <View style={styles.share_view}>
          <AntDesign
            name="left"
            size={22}
            color={colorConstant.GRAY}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
              marginLeft: 15,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 80,
            alignItems: 'center',
          }}>
          <Text style={styles.navBarText}>{t('FAQ')}</Text>
        </View>
      </ImageBackground>
      {faqList.length > 0 && <View style={{bottom: '8%'}}>
        <CustomSwitch
          selectionMode={2}
          roundCorner={true}
          option1={'Sort'}
          option2={'Filters'}
          onSearch={(text)=>{handleSearch(text)}}
          onSelectSwitch={onSelectSwitch}
          selectionColor={COLORS_NEW.lightGray}
        />
      </View>}
      
        <View style={styles.FirstView}>
         {faqList.length > 0 ? <FlatGrid
          itemDimension={130}
          data={faqList}
          renderItem={renderItemProduct}
        /> : <View style={{flex:1,alignItems:'center',}}>
                {renderEmptyAndNoLogin()}
        </View>}
        </View>
    </View>}
    <Loader loading={isLoading}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  scrollView: {
    marginTop: '-10%',
    backgroundColor: COLORS_NEW.white,
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
  },
  navBarText: {
    fontSize: Metrics.rfv(20),
    marginBottom: Metrics.rfv(20),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  loginPageComponentView: {
    borderColor: COLORS_NEW.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 20,
    alignItems: 'center',
    flex: 0.5,
    marginBottom: 16,
  },
  loginPageComponentViewBlank: {
    marginHorizontal: Metrics.rfv(15),
    borderColor: COLORS_NEW.lightGray,
    borderRadius: Metrics.rfv(10),
    // borderWidth: Metrics.rfv(1),
    paddingVertical: Metrics.rfv(20),
    alignItems: 'center',
    flex: 1,
    marginBottom: Metrics.rfv(15),
  },
  loginPageComponentText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginPageComponentview1: {
    // flexDirection: 'row',
    flex:1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginPageComponent: {
    width: Metrics.rfv(30),
    height: Metrics.rfv(30),
    resizeMode: 'contain',
  },
  profileInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(15),
    paddingTop: Metrics.rfv(3),
  },
  bodyText: {
    color: COLORS_NEW.black,
    fontSze: Metrics.rfv(14),
    marginBottom: Metrics.rfv(10),
  },
  PageArrow: {
    width: Metrics.rfv(10),
    height: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    resizeMode: 'contain',
  },
  loginPageComponentview2: {
    marginHorizontal: Metrics.rfv(15),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
    textAlign: 'center',
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
  },
  loginPageComponentviewfaqcount: {
    marginHorizontal: Metrics.rfv(15),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
    textAlign: 'center',
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_10_SIZE_REGULAR,
    fontWeight: '400',
    color: '#727272'
  },
  FirstView: {
    marginVertical: Metrics.rfv(10),
    marginHorizontal:20,
    flex:1,
  },
  img: {
    height: Metrics.rfv(120),
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
  ListView: {
    backgroundColor: '#F9F5F1',
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: Metrics.rfv(20),
    marginBottom: '5%',
  },
  header_container: {
    width: '100%',
    height: 150,
    // backgroundColor: colorConstant.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  share_view: {
    width: '100%',
    height: 40,
    marginTop: '15%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
