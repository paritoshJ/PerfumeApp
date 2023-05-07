import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
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
import {AppButton} from '../../Component/button/app-button';
import PhoneInput from 'react-native-phone-number-input';
import Input from '../../Component/Input';
import CustomSwitch from '../../Component/toggleSwitch';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import MobileInput from '../../Component/MobileInput';
import colorConstant from '../../constant/colorConstant';
import { isStringNotNull } from '../../Helper/helper';
import { SAVE_BILLING_ADDRESS, SAVE_GUEST_EMAIL, SAVE_SHIPPING_ADDRESS } from '../../api/SaveAddress';
import Loader from '../../Component/Loader';

export default function AddressBook({route,navigation}) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [inputDetail, setinputDetail] = useState();
  const [value, setValue] = useState('');
    const [countryCode, setCountryCode] = useState('AE');
    const [countryPhoneCode, setCountryPhoneCode] = useState('+971');
  // const [country, setCountry] = useState(null);
  const { t } = useTranslation()
    const [formattedValue, setFormattedValue] = useState('');

  const onSelectSwitch = index => {
  };
  useEffect(() => {
    console.log(route?.params)
  
  }, [])
  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountryPhoneCode(country.callingCode[0]);
    // setCountry(country);
    console.log(country);
  };

  const onSaveAddress = async() =>{

    let obj = {
      address  : {
        city:city,
        country_code:countryCode,
        firstname:firstname,
        lastname:lastName,
        postcode:zipCode,
        telephone:mobile,
        street:[`${buildingName} ${address}`],
      }
    }
               

          setLoading(true)
        const res = await SAVE_SHIPPING_ADDRESS([obj]);
          setLoading(false)
          if(res){
             if(route?.params.onAddAddress)
              route?.params?.onAddAddress(res?.setShippingAddressesOnCart?.cart?.shipping_addresses);
              navigation.goBack();
          }
          const res1 = await SAVE_BILLING_ADDRESS(obj);
          if(res1){
            console.log("SAVE_BILLING_ADDRESS",res1);
          }
          const resEmail = await SAVE_GUEST_EMAIL(email);
           if(resEmail){
            console.log(resEmail);
           }
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
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
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Toggle Switch */}
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
          {/* Input Fields */}
          <Text style={styles.addressHeading}>{t('Main information')}</Text>
          <View>
            <Input
              placeholder={t("First Name")}
              placeholderTextColor="gray"
              value={firstname}
              onChangeText={e => setFirstName(e)}
            />
            <Input
              placeholder={t("Last Name")}
              placeholderTextColor="gray"
              value={lastName}
              onChangeText={e => setLastName(e)}
            />
            <Input
              placeholder={t("Email")}
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
              onChangeText={e => setZipCode(e)}
            />
            <Input
              placeholder={t("Country")}
              placeholderTextColor="gray"
              value={country}
              onChangeText={e => setCountry(e)}
            />
            <Input
              placeholder={t("City")}
              placeholderTextColor="gray"
              value={city}
              onChangeText={e => setCity(e)}
            />
          </View>
          <Text style={styles.addressHeading1}>{t('Delivery address')}</Text>
          <View>
            <Input
              placeholder={t("Enter the address or select it on the map")}
              placeholderTextColor="gray"
              value={address}
              onChangeText={e => setAddress(e)}
            />
            <Input
              placeholder={t("Building name/floor number/flat number")}
              placeholderTextColor="gray"
              value={buildingName}
              onChangeText={e => setBuildingName(e)}
            />
          </View>
          <View style={{marginBottom: Metrics.rfv(10)}}>
            <AppButton 
            disabled={!isStringNotNull(firstname) || !isStringNotNull(lastName) || !isStringNotNull(email) ||!isStringNotNull(mobile) || !isStringNotNull(zipCode) || !isStringNotNull(city) || !isStringNotNull(address) ||!isStringNotNull(buildingName)}
            onPress={()=>{
              onSaveAddress();
            }}
            tx={t("Save address")} style={{marginTop: Metrics.rfv(16)}} />
          </View>
        </ScrollView>
      )}
      <Loader loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
