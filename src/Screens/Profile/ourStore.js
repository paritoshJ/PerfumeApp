/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  FlatList
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import CustomSwitch from '../../Component/toggleSwitch';
import RBSheet from 'react-native-raw-bottom-sheet';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import { OUR_STORES_GET__API } from '../../api/ContactUs';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../Component/Loader';
import { countries } from 'country-data';
import fontConstant from '../../constant/fontConstant';
import { GET_COUNTRY_API } from '../../api/getCountry';
import { getCurrencies, getLocales } from "react-native-localize";
import Constants from '../../Comman/Constants';

const COUNTRY_DATA = [
  {
    id: 1,
    name: 'UAE (AED)',
    image: require('../../../assets/UAE.png'),
  },
  {
    id: 2,
    name: 'KSA (SAR)',
    image: require('../../../assets/KSA.png'),
  },
  {
    id: 3,
    name: 'Kuwait (KWD)',
    image: require('../../../assets/Kuwait.png'),
  },
  {
    id: 4,
    name: 'Bahrain (BHD)',
    image: require('../../../assets/Bahrain.png'),
  },
  {
    id: 5,
    name: 'Quatar (QAR)',
    image: require('../../../assets/Quatar.png'),
  },
  {
    id: 6,
    name: 'Oman (OMR)',
    image: require('../../../assets/Oman.png'),
  },
];

const CITY_DATA = [
  {
    id: 1,
    name: ' DUBAI',
  },
  {
    id: 2,
    name: 'Abu Dhabi',
  },
  {
    id: 3,
    name: 'Sharjah',
  },
  {
    id: 4,
    name: 'Ajaman',
  },
];

export default function OurStore({navigation}) {
  const [open, setOpen] = useState(false);
  const [inputDetail, setinputDetail] = useState();
  const [formattedValue, setFormattedValue] = useState('');
  const [value, setValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('UAE (AED)');
  const [getCountrylist, setCountrylist] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Dubai');
  const [getCountry, setCountry] = useState([]);
  const refRBSheet = useRef();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      console.log('asdasdasd', countries['uae']?.name);

      setLoading(true);
      GET_COUNTRY_API().then((Responsce) => {
        console.log(Responsce)

        setCountrylist(Responsce.allStoreConfigData);
        setLoading(false)
        Responsce.allStoreConfigData.map((item, index) => {
          console.log('item', item)
        })
      }).catch((error) => {
        setLoading(false)

      });
      OUR_STORES_GET__API().then((Responce) => {
        console.log('Response', Responce)
        setCountry(Responce.StorePickUpData.allStoreLocation);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
      })
      return () => { };
    }, []),
  );

  const onSelectCountry = e => {
    setSelectedCountry(e);
  };

  const onSelectSwitch = index => {
    console.log('Selected index: ' + index);
  };

  const DATA = [
    {
      id: 1,
      address: 'UAE, Dubai. Alexander Platz 32',
      storeAddress: 'United Arab Emirates | Dubai',
    },
    {
      id: 2,
      address: 'UAE, Dubai. Alexander Platz 32',
      storeAddress: 'United Arab Emirates | Dubai',
    },
    {
      id: 3,
      address: 'UAE, Dubai. Alexander Platz 32',
      storeAddress: 'United Arab Emirates | Dubai',
    },
    {
      id: 4,
      address: 'UAE, Dubai. Alexander Platz 32',
      storeAddress: 'United Arab Emirates | Dubai',
    },
  ];

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View
        style={{
          borderBottomColor: COLORS_NEW.lightGray,
          borderBottomWidth: 1,
        }}>
        <View style={styles.navBarView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: Metrics.rfv(15),
                height: Metrics.rfv(15),
                 resizeMode: 'contain',
                transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
              }}
              source={require('../../../assets/Back-Arrow.png')}
            />
          </TouchableOpacity>
          <Text style={styles.navBarText}>{Constants.Laungagues.our_stores == null ? 'OUR STORES' : Constants.Laungagues.our_stores}</Text>
          <TouchableOpacity>
            <Image style={styles.navBarImage1} source={''} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => refRBSheet.current.open()}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: Metrics.rfv(20),
          }}>
          <Text>{Constants.Laungagues.filters == null ? 'Filters' : Constants.Laungagues.filters}</Text>
          <Image
            style={styles.navBarImage1}
            source={require('../../../assets/wishlist-filters.png')}
          />
        </TouchableOpacity>
      </View>
      {open ? (
        <View style={styles.mainView}>
          <Image
            style={styles.emptyCartImage}
            source={require('../../../assets/address-book-color.png')}
          />
          <Text style={styles.text1}>{Constants.Laungagues.you_dont_have_address_yet == null ? "You don't have address yet" : Constants.Laungagues.you_dont_have_address_yet}</Text>
          <Text style={styles.text2}>
            {Constants.Laungagues.add_a_address_for_further_quick_purchases == null ? "Add a address for further quick purchases" : Constants.Laungagues.add_a_address_for_further_quick_purchases}
          </Text>
          <AppButton
            preset="primary"
            text={Constants.Laungagues.save_address == null ? "Save address" : Constants.Laungagues.save_address}
            style={{marginTop: Metrics.rfv(16)}}
          />
        </View>
      ) : (
          <View style={{ flex: 1 }}>
            <View style={{ margin: 20 }}>
            <CustomSwitch
              selectionMode={2}
              roundCorner={true}
                option1={Constants.Laungagues.list == null ? 'List' : Constants.Laungagues.list}
                option2={Constants.Laungagues.on_the_map == null ? 'On the map' : Constants.Laungagues.on_the_map}
              onSelectSwitch={onSelectSwitch}
              selectionColor={COLORS_NEW.blue}
            />
          </View>
            <FlatList

              showsHorizontalScrollIndicator={false}
              data={getCountry}
              keyExtractor={(item) => item.id}
              style={{ marginLeft: '5%', marginRight: '5%' }}
              renderItem={({ item, index }) => {
                // console.log(countries['AJ']?.name, item.name);

                return (
                  <View
                    style={{
                      borderBottomColor: COLORS_NEW.lightGray,
                      borderBottomWidth: 1,
                      marginTop: '5%',
                    }}>
                    <Text
                      style={{
                        fontFamily: fontConstant.satoshi,
                        fontStyle: 'normal',
                        fontWeight: '500',
                        letterSpacing: 1,
                        fontSze: 16,
                        color: 'black',
                        marginLeft: '1%',
                        width: '100%',
                        marginTop: '1%',
                      }}>
                      {item.address}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: '3%', marginBottom: '5%' }}>
                      <Image
                        style={styles.ourStoreImage}
                        source={require('../../../assets/our-store-icon.png')}
                      />
                      <View>

                        <Text style={{
                          fontFamily: fontConstant.satoshi,
                          fontStyle: 'normal',
                          fontWeight: '500',
                          letterSpacing: 1,
                          fontSze: 12, color: '#2B2826',
                          marginLeft: '5%',
                        }}>
                          {item.city + ' ' + countries[item.country_id]?.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              }}
            />
            {/* {getCountry.map((item1, index) => {

              return (
                <View style={{}}>
                  <Text style={{
                    fontFamily: fontConstant.satoshi,
                    fontStyle: 'normal',
                    fontWeight: '500',
                    letterSpacing: 1,
                    fontSze: 12, color: '#2B2826',
                    marginLeft: '5%',
                    width: '100%',
                    marginTop: '3%',
                    marginBottom: '1%'
                  }}>{item1.full_name_english}</Text>
                  <FlatList

                    showsHorizontalScrollIndicator={false}
                    data={item1.available_regions}
                    keyExtractor={(item) => item.id}
                    style={{ marginLeft: '5%', marginRight: '5%' }}
                    renderItem={({ item, index }) => {
                      // console.log(countries['AJ']?.name, item.name);

                      return (
                        <View
                          style={{
                            borderBottomColor: COLORS_NEW.lightGray,
                            borderBottomWidth: 1,
                            marginTop: Metrics.rfv(15),
                          }}>

                          <View style={{ flexDirection: 'row' }}>
                            <Image
                              style={styles.ourStoreImage}
                              source={require('../../../assets/our-store-icon.png')}
                            />
                            <View>
                              <Text
                                style={{
                                  fontFamily: fontConstant.satoshi,
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  letterSpacing: 1,
                                  fontSze: 16,
                                  color: 'black',
                                  marginLeft: '5%',
                                  width: '100%',
                                  marginTop: '1%',
                                }}>
                                {item1.full_name_english + ', ' + item.name}
                              </Text>
                              <Text style={{
                                fontFamily: fontConstant.satoshi,
                                fontStyle: 'normal',
                                fontWeight: '500',
                                letterSpacing: 1,
                                fontSze: 12, color: '#2B2826',
                                marginLeft: '5%',
                              }}>
                                {item1.full_name_english + ', ' + item.name}
                              </Text>
                            </View>
                          </View>
                        </View>
                      )
                    }}
                  />
                </View>
              )
            }
            )} */}
            <ScrollView style={styles.scrollView}>


              {/* {DATA.map(item => {
            return (
              <View
                style={{
                  borderBottomColor: COLORS_NEW.lightGray,
                  borderBottomWidth: 1,
                  marginTop: Metrics.rfv(15),
                }}>
                <Text
                  style={{fontSize: Metrics.rfv(16), color: COLORS_NEW.black}}>
                  {t(item.address)}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={styles.ourStoreImage}
                    source={require('../../../assets/our-store-icon.png')}
                  />
                  <Text style={{marginLeft: Metrics.rfv(5)}}>
                    {item.storeAddress}
                  </Text>
                </View>
              </View>
            );
          })} */}
        </ScrollView>

          </View>
      )}
      {/* Filter Popup */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={Metrics.rfv(600)}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <ScrollView>
          <View style={{marginHorizontal: Metrics.rfv(20)}}>
            <View>
              <Text style={styles.popupFilterText}>{Constants.Laungagues.filter == null ? 'Filter' : Constants.Laungagues.filter}</Text>
            </View>
            <View>
              <Text>{Constants.Laungagues.country == null ? 'Country' : Constants.Laungagues.country}</Text>
              {getCountrylist.map(item => {
                return (
                  <View>{item.store_name == 'English' ?
                  <TouchableOpacity
                    style={styles.loginPageComponentView}
                    onPress={() => onSelectCountry(item.name)}>
                    <View style={styles.loginPageComponentview1}>
                      <View>
                        <Image style={styles.countryLogo} source={item.image} />
                      </View>
                        <Text style={styles.countryText}>{t(item.store_group_code + ' (' + item.base_currency_code + ')')}</Text>
                    </View>
                      {selectedCountry === item.store_group_code && (
                      <View style={styles.loginPageComponentText}>
                        <Image
                          style={styles.countryLogo}
                          source={require('../../../assets/CheckCircle.png')}
                        />
                      </View>
                    )}
                    </TouchableOpacity> : null}
                  </View>
                );
              })}
            </View>
            <View>
              <Text>{Constants.Laungagues.city == null ? 'City' : Constants.Laungagues.city}</Text>
              {CITY_DATA.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.loginPageComponentView}
                    onPress={() => setSelectedCity(item.name)}>
                    <View style={styles.loginPageComponentview1}>
                      <Text style={styles.countryText}>{item.name}</Text>
                    </View>
                    {selectedCity === item.name && (
                      <View style={styles.loginPageComponentText}>
                        <Image
                          style={styles.countryLogo}
                          source={require('../../../assets/CheckCircle.png')}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View
            style={{
              marginHorizontal: Metrics.rfv(20),
              marginBottom: Metrics.rfv(20),
            }}>
            <AppButton
              preset="primary"
              text={Constants.Laungagues.apply == null ? "Apply" : Constants.Laungagues.apply}
              style={{marginTop: Metrics.rfv(16)}}
            />
          </View>
        </ScrollView>
      </RBSheet>
      <Loader loading={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: '#fff',
    paddingHorizontal: Metrics.rfv(20),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
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
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(15),
    paddingTop: Metrics.rfv(3),
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: Metrics.rfv(1),
  },
  loginPageComponentText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginPageComponent: {
    width: Metrics.rfv(20),
    height: Metrics.rfv(20),
    marginBottom: Metrics.rfv(5),
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
    marginLeft: Metrics.rfv(15),
    marginTop: Metrics.rfv(1),
    color: COLORS_NEW.black,
  },
  FirstView: {
    marginTop: Metrics.rfv(10),
  },
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
  },
  text1: {
    fontSize: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  text2: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  TextInput: {
    backgroundColor: 'white',
    width: '100%',
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: '#EEEDE7',
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: 'black',
  },
  addressHeading: {
    fontSize: Metrics.rfv(18),
    marginVertical: Metrics.rfv(5),
    color: COLORS_NEW.black,
  },
  ourStoreImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  popupFilterText: {
    fontSize: Metrics.rfv(30),
    textAlign: 'center',
    fontFamily: 'Gambetta-BoldItalic',
  },
  countryLogo: {
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    marginBottom: Metrics.rfv(5),
  },
  countryText: {
    marginTop: Metrics.rfv(2),
    marginLeft: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
});
