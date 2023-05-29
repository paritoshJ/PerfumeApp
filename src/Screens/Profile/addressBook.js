import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import { AppButton } from '../../Component/button/app-button';
import Input from '../../Component/Input';
import CustomSwitch from '../../Component/toggleSwitch';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import MobileInput from '../../Component/MobileInput';
import colorConstant from '../../constant/colorConstant';
import {isStringNotNull} from '../../Helper/helper';
import {
  GET_REGION_COUNTRY,
  SAVE_BOOK_ADDRESS
} from '../../api/SaveAddress';
import Loader from '../../Component/Loader';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import AddAddressModal from './../../modal/AddAddressModal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Lens from '../../assets/svg/Lens';
import { Dropdown } from 'react-native-element-dropdown';

import { useFocusEffect } from '@react-navigation/native';

export default function AddressBook({route, navigation}) {
  const mapRef = useRef(null);
  const googlePlaceAutoCompleteRef = useRef(null);
  const Lastnamer = useRef(null);

  const [loading, setLoading] = useState(false);
  const [visibale, setvisibale] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [value, setValue] = useState('');
  const [markerData, setMarkerData] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [getcountry, setCountrylist] = useState([])
  const [countryCode, setCountryCode] = useState('');
  const [getCountryname, setCountyrname] = useState('');
  const [countryPhoneCode, setCountryPhoneCode] = useState('');
  const {t} = useTranslation();
  const [formattedValue, setFormattedValue] = useState('');
  const [getRegion, setRegion] = useState('');
  const [getRegioncode, setRegioncode] = useState('');
  const [getRegionId, setRegionId] = useState('');
  const [getRegionArray, setRegionArray] = useState([]);
  const [getCountrycodeslect, setCountrycodeselect] = useState('');
  const onSelectSwitch = index => {
    if (index == 1) {
      setShowMap(true);
    } else {
      setShowMap(false);
    }
  };
  useEffect(() => {
    if (route.params.id) {
      setFirstName(route.params.id.firstname);
      setLastName(route.params.id.lastname);
      setMobile(route.params.id.telephone);
      setZipCode(route.params.id.postcode);
      setCity(route.params.id.city);
      setCountrycodeselect(route.params.id.country_code)
      setRegioncode(route.params.id.region.region_code);
      setRegionId(route.params.id.region.region_id);
      setAddress(route.params.id.street[1]);
      setBuildingName(route.params.id.street[0]);
      setRegion(route.params.id.region.region);
      setCountryCode(route.params.id.country_code);
    } 
    setLoading(true);
    GET_REGION_COUNTRY().then((Data) => {
      if (route.params.id) {
        var Countryname = Data.countries.filter((iteam) => {
          return iteam.id == route.params.id.country_code;
        });
        setCountrylist(Data.countries);
        setCountyrname(Countryname[0].full_name_locale);
        setRegionArray(Countryname[0].available_regions);
      } else {
        setCountryCode(Data.countries[0].id)
        setCountrylist(Data.countries);
      }
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
    });
  }, []);
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountryPhoneCode(country.callingCode[0]);
  };

  const onSaveAddress = async () => {
    setLoading(true);
    let Region = {};
    if (getRegionArray == null) {
      Region = {
        region: getRegion,
      };
    }
    else {
      Region = {
        region: getRegion,
        region_code: getRegioncode,
        region_id: getRegionId
      };
    }
    var stree = [];
    stree.push(buildingName)
    stree.push(address)
    SAVE_BOOK_ADDRESS(Region, getCountrycodeslect, stree, mobile, zipCode, city, firstname, lastName, true, false, countryCode).then((response) => {
      setLoading(false);
      navigation.goBack();
    }).catch((error) => {
      setLoading(false);
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
        <Text style={styles.navBarText}>{t('ADDRESS BOOK')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
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
      ) : showMap ? (
        <>
          <View style={{flex: 1}}>
            <View style={[StyleSheet.absoluteFillObject]}>
              <MapView
                style={styles.map}
                scrollEnabled={true}
                zoomEnabled={true}
                minZoomLevel={0}
                maxZoomLevel={10}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 24.1607038,
                  longitude: 55.8069848,
                  latitudeDelta: 0.003,
                  longitudeDelta: 0.003,
                }}
                onRegionChangeComplete={region => {
                  }}>
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    image={require('./../../assets/icon/Location.png')}
                    title={marker.name}
                    description={address}
                    onPress={() => {
                      setvisibale(true);
                      setMarkerData(marker);
                      setAddress(marker.address);
                    }}
                  ></Marker>
                ))}
              </MapView>
            </View>
              <View>
              <GooglePlacesAutocomplete
                ref={googlePlaceAutoCompleteRef}
                placeholder="Enter address"
                minLength={2}
                autoFocus={true}
                onPress={(data, details = null) => {
                  let location = details?.geometry?.location;
                  setAddress(data.description);
                  setShowMap(false)
                  let region = {
                    latitude: location?.lat,
                    longitude: location?.lng,
                    latitudeDelta: 0.1028653841151301,
                    longitudeDelta: 0.0706259161233902,
                  };
                  mapRef.current.animateToRegion(region);
                }}
                fetchDetails={true}
                query={{
                  key: 'AIzaSyDdoMjBprJUivFiEdqhXxwvu8ZDn4OVnXI',
                  language: 'en',
                }}
                renderLeftButton={() => (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingStart: 15,
                      backgroundColor: 'white',
                      height: 40,
                    }}>
                    <Lens />
                  </View>
                )}
                styles={{
                  textInputContainer: {
                    borderColor: '#e7e7e7',
                    width: '100%',
                  },
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    height: 40,
                    color: '#5d5d5d',
                    fontSize: 16,
                    borderRadius: 0,
                  },
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                  },
                }}
                textInputProps={{
                  onFocus: () => { },
                }}
                keepResultsAfterBlur
                debounce={200}
                renderRow={(data, index) => (
                  <View style={{}}>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                      }}>
                      {data?.description}
                    </Text>
                  </View>
                  )} />
              <View style={{paddingHorizontal: 15}}>
                <CustomSwitch
                  selectionMode={1}
                  roundCorner={true}
                  option1={t('Fill in inputs')}
                  option2={t('Click on the map')}
                  onSelectSwitch={onSelectSwitch}
                  selectionColor={COLORS_NEW.blue}
                />
              </View>
            </View>
          </View>
        </>
      ) : (
            <ScrollView style={styles.scrollView}>
          <View style={{alignItems: 'center', marginVertical: 20}}>
            <CustomSwitch
              selectionMode={2}
              roundCorner={true}
              option1={t('Fill in inputs')}
              option2={t('Click on the map')}
              onSelectSwitch={onSelectSwitch}
              selectionColor={COLORS_NEW.blue}
            />
              </View>
          <Text style={styles.addressHeading}>{t('Main information')}</Text>
          <View>
            <Input
              placeholder={t('First Name')}
              placeholderTextColor="gray"
              value={firstname}


                  onSubmitEditing={() => {
                    Lastnamer.current().focus();
                  }}
              onChangeText={e => setFirstName(e)}
            />
            <Input
              placeholder={t('Last Name')}
              placeholderTextColor="gray"
              value={lastName}
                  ref={Lastnamer}
                  // ref={"Lastname"}
              onChangeText={e => setLastName(e)}
            />
            <Input
              placeholder={t('Email')}
              placeholderTextColor="gray"
              value={email}
              onChangeText={e => setEmail(e)}
            />
            <View
              style={{
                marginTop: Metrics.rfv(12),
                flexDirection: 'row',
                alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
              }}>
              <MobileInput
                onSelect={onSelect}
                onChangeText={e => setFormattedValue(e)}
                countryCode={countryCode}
                placeholder={'Select code'}
              />
              <View style={{flex: 1}}>
                <Input
                  placeholder={t('Phone number')}
                  placeholderTextColor="gray"
                  value={`${mobile}`}
                  editable={true}
                  keyboardType={'numeric'}
                  onChangeText={e => setMobile(e)}
                  maxLength={10}
                  style={{
                    borderWidth: 1,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderColor: colorConstant.LIGHT_MIDIUM_GREY,
                    marginTop: 5,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }}
                />
              </View>
            </View>
            <Input
              placeholder={t('Zip code (optional)')}
              placeholderTextColor="gray"
              value={zipCode}
                  onChangeText={e => setZipCode(e)} />
                <Dropdown
                  style={{
                    backgroundColor: 'white',
                    height: Metrics.rfv(45),
                    width: '100%',
                    borderRadius: Metrics.rfv(100),
                    borderColor: '#EEEDE7',
                    borderWidth: 1,
                    marginTop: Metrics.rfv(16),
                    alignSelf: 'center',
                    color: 'black',
                    paddingLeft: Metrics.rfv(15),
                    paddingRight: Metrics.rfv(10),
                  }}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  data={getcountry}
                  search
                  maxHeight={300}
                  labelField="full_name_locale"
                  valueField="value"
                  placeholder={getCountryname}
                  searchPlaceholder="Search..."
                  value={getCountryname}
                  onChange={(item) => {
                    setCountrycodeselect(item.id);
                    setRegionArray(item.available_regions);
                    if (item.available_regions != null) {
                      setRegion(item.available_regions[0].name)
                      setRegionId(item.available_regions[0].id)
                      setRegioncode(item.available_regions[0].code)
                    } else {
                      setRegionArray(null)
                    }
                  }}

                />
                {
                  getRegionArray == null || getRegionArray == '' ? <View /> : <Dropdown
                    style={{
                      backgroundColor: 'white',
                      height: Metrics.rfv(45),
                      width: '100%',
                      borderRadius: Metrics.rfv(100),
                      borderColor: '#EEEDE7',
                      borderWidth: 1,
                      marginTop: Metrics.rfv(16),
                      alignSelf: 'center',
                      color: 'black',
                      paddingLeft: Metrics.rfv(15),
                      paddingRight: Metrics.rfv(10),
                    }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={getRegionArray}
                    search
                    maxHeight={300}
                    labelField="name"
                    valueField="value"
                    placeholder={getRegion}
                    searchPlaceholder="Search..."
                    value={getRegion}
                    onChange={(item) => {
                      setRegion(item.name)
                      setRegionId(item.id)
                      setRegioncode(item.code)
                    }}

                  /> 
                }
            <Input
              placeholder={t('City')}
              placeholderTextColor="gray"
              value={city}
              onChangeText={e => setCity(e)}
            />
          </View>
          <Text style={styles.addressHeading1}>{t('Delivery address')}</Text>
          <View>
            <Input
              placeholder={t('Enter the address or select it on the map')}
              placeholderTextColor="gray"
              value={address}
              onChangeText={e => setAddress(e)}
            />
            <Input
              placeholder={t('Building name/floor number/flat number')}
              placeholderTextColor="gray"
              value={buildingName}
              onChangeText={e => setBuildingName(e)}
            />
          </View>
          <View style={{marginBottom: Metrics.rfv(10)}}>
            <AppButton
              disabled={
                !isStringNotNull(firstname) ||
                !isStringNotNull(lastName) ||
                !isStringNotNull(email) ||
                !isStringNotNull(mobile) ||
                !isStringNotNull(zipCode) ||
                !isStringNotNull(city) ||
                !isStringNotNull(address) ||
                !isStringNotNull(buildingName)
              }
              onPress={() => {
                onSaveAddress();
              }}
              tx={t('Save address')}
              style={{marginTop: Metrics.rfv(16)}}
            />
          </View>
        </ScrollView>
      )}
      <Loader loading={loading} />
      {visibale && (
        <AddAddressModal
          data={markerData}
          onOpenDailog={visibale}
          setOnOpenDailog={setvisibale}
          selectAddress={val => {
            setvisibale(false);
            setShowMap(false);
            setAddress(val?.address);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: COLORS_NEW.white,
    padding: Metrics.rfv(10),
    borderBottomColor: COLORS_NEW.lightGray,
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
    borderBottomColor: COLORS_NEW.lightGray,
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
    backgroundColor: COLORS_NEW.white,
    width: '100%',
    minHeight: Metrics.rfv(40),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: COLORS_NEW.lightGray,
  },
  addressHeading: {
    fontSize: Metrics.rfv(18),
    marginVertical: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  addressHeading1: {
    fontSize: Metrics.rfv(18),
    marginTop: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
});
