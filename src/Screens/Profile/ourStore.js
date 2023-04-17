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
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import CustomSwitch from '../../Component/toggleSwitch';
import RBSheet from 'react-native-raw-bottom-sheet';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'

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
  const [selectedCity, setSelectedCity] = useState('Dubai');
  const refRBSheet = useRef();
  const { t } = useTranslation()

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
          <Text style={styles.navBarText}>{t('OUR STORES')}</Text>
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
          <Text>{t('Filters')}</Text>
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
          <Text style={styles.text1}>You don't have address yet</Text>
          <Text style={styles.text2}>
            Add a address for further quick purchases
          </Text>
          <AppButton
            preset="primary"
            text="Save address"
            style={{marginTop: Metrics.rfv(16)}}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Toggle Switch */}
          <View style={{alignItems: 'center', margin: 20}}>
            <CustomSwitch
              selectionMode={2}
              roundCorner={true}
              option1={t('List')}
              option2={t('On the map')}
              onSelectSwitch={onSelectSwitch}
              selectionColor={COLORS_NEW.blue}
            />
          </View>
          {/* Store List */}
          {DATA.map(item => {
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
          })}
        </ScrollView>
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
              <Text style={styles.popupFilterText}>Filter</Text>
            </View>
            <View>
              <Text>Country</Text>
              {COUNTRY_DATA.map(item => {
                return (
                  <TouchableOpacity
                    style={styles.loginPageComponentView}
                    onPress={() => onSelectCountry(item.name)}>
                    <View style={styles.loginPageComponentview1}>
                      <View>
                        <Image style={styles.countryLogo} source={item.image} />
                      </View>
                      <Text style={styles.countryText}>{t(item.name)}</Text>
                    </View>
                    {selectedCountry === item.name && (
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
            <View>
              <Text>City</Text>
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
              text="Apply"
              style={{marginTop: Metrics.rfv(16)}}
            />
          </View>
        </ScrollView>
      </RBSheet>
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
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
  },
  popupFilterText: {
    fontSize: Metrics.rfv(25),
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
