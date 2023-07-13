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
import Input from '../../Component/Input';
import Voice from '@react-native-community/voice';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Constants from '../../Comman/Constants';

const SearchScreen = props => {
  const [text, setText] = useState('');
  const [store, setstore] = useState([]);
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [voiceget, setvoiceSlect] = useState(false);
  const [getstartrewcord, setStartRecord] = useState(false);
  const [getVoiceSearch, StratVoiceSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {t} = useTranslation();
  useFocusEffect(
    React.useCallback(() => {
      Voice.onSpeechStart = onSpeechStartHandler;
      Voice.onSpeechEnd = onSpeechEndHandler;
      Voice.onSpeechResults = onSpeechResultsHandler;
      // setLoading(true)
      searchFunction('');
    }, []),
  );
  const onSpeechStartHandler = (e) => {
  }
  const onSpeechEndHandler = (e) => {
    setStartRecord(false);
    try {
      Voice.start('en-Us')
    } catch (error) {
    }

  }
  const onSpeechResultsHandler = (e) => {
    StratVoiceSearch(e.value[0])
    searchFunctionvoice(e.value[0])
  }
  const startRecording = async () => {
    try {
      await Voice.start('en-Us')
    } catch (error) {
    }
  }
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setStartRecord(false);

    } catch (error) {
    }
  }

  const searchFunction = async text => {
    setText(text);
    setSearching(true);
    let res = await GET_PRODUCTS(text);
    stopRecording();

    setSearching(false);
    if (res) {
      setdata(res?.products.items);
    }
  };
  const searchFunctionvoice = async text => {
    let res = await GET_PRODUCTS(text);
    stopRecording();

    setSearching(false);
    if (res) {
      setstore(res?.products.items);
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
        <Text style={[styles.navBarText]}>{Constants.Laungagues.search == null ? 'Search' : Constants.Laungagues.search}</Text>
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
        buttonTitle={Constants.Laungagues.go_shopping == null ? 'Go shopping' : Constants.Laungagues.go_shopping}
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
      {voiceget == false ? renderHeader() : <View />}
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
        {voiceget == false ? <View style={{
          width: '90%',
          height: 50,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
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
              placeholder={Constants.Laungagues.search_for_perfume == null ? "Search for perfume" : Constants.Laungagues.search_for_perfume}
            style={{
              fontFamily: fontConstant.satoshi,
              fontStyle: 'normal',
              fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
              fontWeight: fontConstant.WEIGHT_LEIGHT,
            }}
          />
        </View>
        </View> : <Text style={[styles.navBarText, { marginLeft: '15%' }]}>{t('Voice search')}</Text>}
        <TouchableOpacity
          onPress={() => {
            if (voiceget == false) {
              setvoiceSlect(true)

            } else {
              setvoiceSlect(false);
              setstore([]);
              StratVoiceSearch('');
            }
          }}
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
            name={voiceget == false ? "mic-none" : "close"}
            size={25}
            color={colorConstant.LIGHT_GREY}
            style={{alignSelf: 'center', marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>

      {voiceget == false ? <View
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
                {Constants.Laungagues.popular_search == null ? 'POPULAR SEARCHES' : Constants.Laungagues.popular_search}
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
      </View> :
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignSelf: 'center', height: '55%', width: '100%', position: 'absolute', paddingBottom: store.length > 0 ? '200%' : 0, }}>
              <LottieView source={require("../../../assets/sinewave.json")} autoPlay loop style={{ width: '100%', }} />

              {/* <Image style={{ width: '100%' }} source={require("../../../assets/loopwaves.gif")}></Image> */}
            </View>
            {getstartrewcord == false ? <TouchableOpacity onPress={() => {
              setStartRecord(true);
              startRecording();
            }} style={{ width: '100%', height: '15%', alignSelf: 'center', justifyContent: 'center', marginBottom: store.length > 0 ? 0 : '10%', marginTop: store.length > 0 ? '10%' : 0 }}>

              <Image source={require("../../../assets/voice.png")} style={{ alignSelf: 'center' }}></Image>
            </TouchableOpacity> :
              <TouchableOpacity onPress={() => { setStartRecord(false) }} style={{ width: '100%', height: '13%', alignSelf: 'center', justifyContent: 'center', marginBottom: store.length > 0 ? 0 : '10%', marginTop: store.length > 0 ? '10%' : 0 }}>
                <LottieView source={require("../../../assets/ripple.json")} autoPlay loop />
                {/* <Image source={require("../../../assets/micripple.gif")} style={{ alignSelf: 'center', width: '20%', height: '90%', }}></Image> */}
              </TouchableOpacity>}
            <View style={{ marginLeft: '5%', marginRight: '5%', marginTop: store.length > 0 ? '10%' : 0, justifyContent: 'center' }}>
              <Input
                placeholder={Constants.Laungagues.search_for_perfume == null ? 'Search for perfume' : Constants.Laungagues.search_for_perfume}
                placeholderTextColor={"gray"}
                value={getVoiceSearch}
                onChangeText={e => StratVoiceSearch(e)}
                style={
                  {
                    borderWidth: 1,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    borderColor: getVoiceSearch.length > 0 ? colorConstant.DARK_PRIMARY : colorConstant.LIGHT_MIDIUM_GREY,
                    marginTop: 5,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }
                }
              />
              {getVoiceSearch != '' && store.length == 0 ? <TouchableOpacity onPress={() => {
                StratVoiceSearch('');
                setStartRecord(true);
                startRecording();
              }} style={{ position: 'absolute', height: 40, width: '25%', right: 0, justifyContent: 'center' }}>
                <Text style={{
                  fontFamily: fontConstant.satoshi,
                  fontStyle: 'normal',
                  fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
                  fontWeight: fontConstant.WEIGHT_REGULAR,
                  color: colorConstant.DARK_PRIMARY,
                }}>{Constants.Laungagues.try_again == null ? 'Try again' : Constants.Laungagues.try_again}</Text>
              </TouchableOpacity> :
                <View />}
            </View>
            {store.length > 0 ? <View style={{
              width: '90%',
              height: '70%',
              alignSelf: 'center',
              // marginTop: '5%'
            }}>
              <FlatList
                numColumns={2}
                ItemSeparatorComponent={(item, index) => {
                  return <View style={{ marginVertical: 8 }}></View>;
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
                      {Constants.Laungagues.popular_search == null ? 'POPULAR SEARCHES' : Constants.Laungagues.popular_search}
                    </Text>
                  );
                }}
                // itemDimension={130}
                data={store}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
                renderItem={renderItem}
              // ListEmptyComponent={renderEmptyAndNoLogin}
              />
            </View> : <View />}

          </View>

        </View>

      }
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
