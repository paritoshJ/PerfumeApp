import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import MyStatusBar from '../../Component/MyStatusBar';
import ProductCard from '../../Component/ProducCard';
import perfumedata from '../../utils/perfumedata';
import {GET_PRODUCTS} from '../../api/getProduct';
import {Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import Loader from '../../Component/Loader';
import {SafeAreaView} from 'react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import EmptyPageView from '../../Component/EmptyPageView';
import HeartSVG from '../../assets/svg/Heart';

const SearchScreen = props => {
  const [text, setText] = useState('');
  const [store, setstore] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {t} = useTranslation();

  useEffect(() => {
    searchFunction('');
  }, []);

  const searchFunction = async text => {
    // const updatedData = store.filter(item => {
    //   const item_data = `${item.name})`;
    //   const text_data = text.toUpperCase();
    //   return item_data.indexOf(text_data) > -1;
    // });
    // setdata(updatedData);
    setText(text);
    setSearching(true);
    let res = await GET_PRODUCTS(text);
    setSearching(false);

    if (res) {
      console.log('GET_PRODUCTS', res);
      setdata(res?.products.items);
      // console.warn(res?.StorePickUpData?.allStoreLocation);
      // navigation.navigate('AddressBookList', {
      //   storeList: res?.StorePickUpData?.allStoreLocation,
      // });
    }
  };

  const renderHeader = () => {
    return (
      <View style={[styles.navBarView, styles.devider]}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>
        <Text style={[styles.navBarText]}>{t('Search')}</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={{flex: 0.5, paddingStart: index % 2 == 0 ? 0 : 20}}>
        <ProductCard
          isSearch={true}
          item={item}
          customFlex={true}
          offer={true}
          onSizeSelect={data => {}}
          onFullItemPress={() => {
            props.navigation.navigate('ProductPage', {skuID: item?.sku});
          }}
        />
      </View>
    );
  };
  const renderEmptyAndNoLogin = () => {
    return (
      <EmptyPageView
        icon={<HeartSVG />}
        title={'errorTitle'}
        message={'errorMessage'}
        hideAddButton={true}
        onButtonPress={() => {}}
        buttonTitle={'Go shopping'}
      />
    );
  };

  const setLoaderHeader = () => {
    return (
      searching && (
        <View style={{margin: '5%'}}>
          <ActivityIndicator
            size={'small'}
            color={colorConstant.DARK_PRIMARY}
          />
        </View>
      )
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      {renderHeader()}
      <View
        style={{
          width: '100%',
          height: 50,
          alignSelf: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          borderBottomColor: colorConstant.LIGHT_GREY,
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity
          style={{
            width: '10%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('Search');
          }}>
          <EvilIcons name="search" size={30} color={colorConstant.LIGHT_GREY} />
        </TouchableOpacity>
        <View style={{width: '80%', height: 50, justifyContent: 'center'}}>
          <TextInput
            value={text}
            onChangeText={text => searchFunction(text)}
            placeholder="Search for perfume"
            style={{
              fontFamily: fontConstant.satoshi,
              fontStyle: 'normal',
              fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_LEIGHT,
            }}
          />
        </View>
        <View
          style={{
            width: '10%',
            height: 50,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 1,
              height: 20,
              backgroundColor: colorConstant.LIGHT_GREY,
              alignSelf: 'center',
            }}></View>
          <MaterialIcons
            name="mic-none"
            size={25}
            color={colorConstant.LIGHT_GREY}
            style={{alignSelf: 'center', marginLeft: 10}}
          />
        </View>
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        {setLoaderHeader()}
        <FlatList
          numColumns={2}
          ItemSeparatorComponent={(item, index) => {
            return <View style={{marginVertical: 8}}></View>;
          }}
          ListHeaderComponent={() => {
            return (
              <Text
                style={{
                  fontFamily: fontConstant.satoshi,
                  fontStyle: 'normal',
                  fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
                  fontWeight: fontConstant.WEIGHT_REGULAR,
                  color: colorConstant.BLACK,
                  marginTop: '2%',
                  marginBottom: '5%',
                }}>
                POPULAR SEARCHES
              </Text>
            );
          }}
          // itemDimension={130}
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          renderItem={renderItem}
          // ListEmptyComponent={renderEmptyAndNoLogin}
        />

        <Loader loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  navBarView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  devider: {borderBottomColor: '#EEEDE7', borderBottomWidth: 1},
  navBarImage1: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  navBarText: {
    fontSize: 16,
    color: colorConstant.BLACK,
    textAlign: 'center',
    flex: 1,
    marginRight: '5%',
  },
  scrollView: {
    // flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS_NEW.white,
    // paddingHorizontal: 16,
    marginTop: Metrics.rfv(20),
    paddingBottom: '40%',
  },
});
