import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  RefreshControl
} from 'react-native';
import MyStatusBar from '../../Component/MyStatusBar';
import Metrics from '../../Helper/metrics';
import {useTranslation} from 'react-i18next';
import { GET_COUNTRY_LIST, GET_COUNTRY_API, GET_TRANSLATION_JSON } from '../../api/getCountry';
import { isArrayNullOrEmpty } from '../../Helper/helper';
import RNRestart from 'react-native-restart';
import Loader from '../../Component/Loader';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../../Comman/Constants';
import { useFocusEffect } from '@react-navigation/native';


export default function Country({navigation}) {
  const [selectedCountry, setSelectedCountry] = useState(Constants.StoreCode);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [getcountry, setCountry] = useState([]);
  const [getRefrash, setRefresh] = useState(false);

  useFocusEffect(
    React.useCallback(() => {

      console.log(Constants.StoreCode)
    console.log(selectedCountry)
    setLoading(true)
      AsyncStorage.getItem('Country').then((response) => {
        console.log('currant language', response)
        setSelectedCountry(response);
        console.log('currant language', getcountry)

      }).catch((error) => {

      })
    GET_COUNTRY_API().then((Responsce) => {
      console.log(Responsce)
      setCountry(Responsce.allStoreConfigData);
      setLoading(false)

    }).catch((error) => {
      setLoading(false)

    });

      return () => { };
    }, []),
  );
  // useEffect(() => {
  //   console.log(Constants.StoreCode)
  //   console.log(selectedCountry)
  //   setLoading(true)
  //   GET_COUNTRY_API().then((Responsce) => {
  //     console.log(Responsce)
  //     setCountry(Responsce.allStoreConfigData);
  //     setLoading(false)

  //   }).catch((error) => {
  //     setLoading(false)

  //   });
  //   // GET_TRANSLATION_JSON().then((Responce) => {
  //   //   console.log('Responsce', JSON.parse(Responce.AllTranslationsData.Translations))

  //   // }).catch((error) => {

  //   // });
  // }, [])

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => {
        console.log('========>', value);
        AsyncStorage.setItem('CURRENT_LANGUAGE', value);
      })
      .catch(err => console.log(err));
  };
  const languageChange = async () => {
    //changing language based on what was chosen
    if (I18nManager.isRTL) {
      changeLanguage('en');
      await I18nManager.forceRTL(false);
    } else {
      changeLanguage('ar');
      await I18nManager.forceRTL(true);
    }
    RNRestart.Restart();
  };
  const onSelectSwitch = (e) => {
    console.log(e)
    // languageChange();
  };
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View style={styles.navBarView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              width: Metrics.rfv(15),
              height: Metrics.rfv(15),
              resizeMode: 'contain',
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.navBarText}>{t('Country')}</Text>
        <Image style={styles.navBarImage1} source={''} />
      </View>
      <View style={styles.mainView}>
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={getRefrash}
            onRefresh={() => {
              console.log('refrash')
              setRefresh(false)

            }}
          />
        }>
          {getcountry.map((item, index) => {
            var image = Constants.BASE_GRAPH_IMAGE + 'media/flag/' + item.website_code + '.png';
            console.log('enter', image)
          return (
            <View>{item.store_name == 'English' ?
            <TouchableOpacity
              style={styles.loginPageComponentView}
                onPress={() => {
                  console.log('selectedCountry', item.store_code);

                  setSelectedCountry(item.store_code);
                  setRefresh(true)
                  setRefresh(false)

                  AsyncStorage.setItem('Country', item.store_code);
                  console.log('selectedCountry', selectedCountry);

                  // onSelectSwitch(item)
                }}>

              <View style={styles.loginPageComponentview1}>
                  <View >
                    <Image style={{
                      width: 25,
                      height: 25,
                    }} source={{ uri: 'http://mcstaging.en-ae.ajmal.com/media/flag/india.png' }} />
                </View>
                  <Text style={styles.countryText}>{t(item.store_group_code + ' (' + item.base_currency_code + ')')}</Text>
              </View>
                {selectedCountry == item.store_code ?
                <View style={styles.loginPageComponentView}>
                  <Image
                    style={styles.countryLogo}
                      source={require('../../../assets/CheckCircle.png')} />
                  </View> : <View />
                }
              </TouchableOpacity> : null}
            </View>
          );
        })}
        </ScrollView>
      </View>
      <Loader loading={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
    padding: Metrics.rfv(10),
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: 1,
  },
  navBarImage1: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    marginTop: Metrics.rfv(10),
    justifyContent: 'space-between',
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(5),
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: Metrics.rfv(1),
  },
  countryLogo: {
    width: 25,
    height: 25,
    marginBottom: Metrics.rfv(5),

  },
  countryText: {
    marginTop: Metrics.rfv(2),
    marginLeft: Metrics.rfv(10),
    textTransform: 'uppercase'
  },
});
