import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  I18nManager,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Metrics from '../../Helper/metrics';
import Input from '../../Component/Input';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import {useQuery} from '@apollo/client';
import {USER_REGISTER} from '../../api/useCreateCustomer';
import CheckBoxSection from '../../Component/CheckBoxSection';
import {inValidEmail, isEmpty, showDefaultAlert} from '../../Helper/helper';
import {useTranslation} from 'react-i18next';
import MobileInput from '../../Component/MobileInput';
import colorConstant from '../../constant/colorConstant';
import {inValidPhoneNumber} from '../../Helper/helper';
import Loader from '../../Component/Loader';

export default function CreateAccount({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [inputDetail, setinputDetail] = useState('');
  const [mobileDetail, setMobileDetail] = useState('');

  const [password, setPassword] = useState('');
  const [buttonValue, setButtonValue] = useState('Next');
  const [hidePassword, setHidePassword] = useState(false);
  const [showMobile, setShowMobile] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState(null);

  const {t} = useTranslation();

  const showPasswordField = () => {
    if (inputDetail.length > 0 && mobileDetail.length > 0) {
      return (
        <Input
          placeholder="Password"
          placeholderTextColor="gray"
          onChangeText={e => setPassword(e)}
          showRightIcon
          iw={24}
          ih={24}
          value={password}
          hidePassword={hidePassword}
          handleImagePress={() => setHidePassword(!hidePassword)}
          imageSource={
            hidePassword
              ? require('./../../assets/icon/EyeClosed.png')
              : require('./../../assets/icon/open-eye.png')
          }
        />
      );
    }
  };

  useEffect(() => {
    if (isNaN(inputDetail)) {
      setButtonValue('Create');
    } else {
      setButtonValue('Next');
    }
  }, [inputDetail]);

  const validateFields = () => {
    if (isEmpty(inputDetail)) {
      showDefaultAlert('Please enter email address');
      return false;
    } else if (inValidEmail(inputDetail)) {
      showDefaultAlert('Please enter a valid email address');
      return false;
    } else if (isEmpty(mobileDetail)) {
      showDefaultAlert('Please enter mobile number');
      return false;
    } else if (inValidPhoneNumber(mobileDetail)) {
      showDefaultAlert('Please enter a valid mobile number');
      return false;
    } else if (isEmpty(password)) {
      showDefaultAlert("Password can't be empty");
      return false;
    } else {
      return true;
    }
  };

  const handleRegister = async () => {
    if (buttonValue === 'Next') {
      navigation.navigate('EnterTheCode');
    } else {
      if (validateFields()) {
        setLoading(true);
        await USER_REGISTER(mobileDetail, inputDetail, password, name)
          .then(res => {
            setLoading(false);

            showDefaultAlert('You have successfully signed up', '', [
              {
                text: 'OK',
                onPress: () => {
                  setinputDetail('');
                  setMobileDetail('');
                  setPassword('');
                  setName('');
                  setSelection(false);
                  navigation.navigate('EnterDetail');
                },
              },
            ]);
          })
          .catch(err => {
            showDefaultAlert(err?.message);
            setLoading(false);
          });

        // const [{loading, error, data}] = useQuery(
        //   USER_REGISTER(mobileDetail, inputDetail, password, name),
        // );

        // await AsyncStorage.setItem('token', data.generateCustomerToken.token);
      }
    }
  };

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <View style={styles.navBarView}>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
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

        <Text style={styles.navBarText}>CREATE ACCOUNT</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 45 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.ScrollView}>
        <View style={styles.mainView}>
          <Input
            placeholder="Name"
            placeholderTextColor="gray"
            onChangeText={e => setName(e)}
            value={name}
          />
          {/* <Input
            placeholder="Email or number"
            placeholderTextColor="gray"
            keyboardType={'email-address'}
            onChangeText={e => setInput(e)}
          /> */}
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Input
                placeholder={t('Email')}
                placeholderTextColor="gray"
                value={inputDetail}
                onChangeText={e => setinputDetail(e)}
                style={
                  showMobile && {
                    borderWidth: 1,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    borderColor: colorConstant.LIGHT_MIDIUM_GREY,
                    marginTop: 5,
                    justifyContent: 'center',
                    backgroundColor: 'transparent',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  }
                }
              />
            </View>
          </View>
          <View
            style={{
              marginTop: Metrics.rfv(16),
              flexDirection: 'row',
            }}>
            <MobileInput
              onSelect={onSelect}
              countryCode={countryCode}
              placeholder={'Select mobile'}
            />
            <View style={{flex: 1}}>
              <Input
                placeholder={t('Phone number')}
                placeholderTextColor="gray"
                value={mobileDetail}
                onChangeText={e => setMobileDetail(e)}
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
          {showPasswordField()}
          <View style={styles.checkbox}>
            <CheckBoxSection
              setChecked={setSelection}
              checked={isSelected}
              labelStyle={styles.label}
              label={'I agree to the processing of my personal data'}
            />
          </View>
        </View>
        <AppButton
          disabled={
            mobileDetail === '' ||
            inputDetail === '' ||
            name === '' ||
            password === '' ||
            !isSelected
              ? true
              : false
          }
          tx={buttonValue}
          style={{marginVertical: Metrics.rfv(16)}}
          onPress={() => handleRegister()}
        />
        {/* <TouchableOpacity
            onPress={() =>
              buttonValue === 'Next' && navigation.navigate('EnterTheCode')
            }
            style={{
              flex: 0,
              backgroundColor: '#BC8B57',
              width: 270,
              height: 45,
              borderRadius: 20,
              marginTop: 16,
              alignSelf: 'center',
              marginBottom: 15,
              opacity: inputDetail === '' && name === '' ? 0.5 : 1,
            }}
            disabled={inputDetail === '' && name === '' ? true : false}>
            <Text style={styles.nextButtontext}>{buttonValue}</Text>
          </TouchableOpacity> */}
      </KeyboardAvoidingView>
      <Loader loading={loading} />
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  mainView: {
    flex: 1,
    // justifyContent: 'space-between',
  },
  TextInput: {
    backgroundColor: COLORS_NEW.white,
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: 16,
    alignSelf: 'center',
    color: COLORS_NEW.black,
    paddingLeft: Metrics.rfv(15),
  },
  NextButton: {
    flex: 0,
    backgroundColor: '#BC8B57',
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    marginBottom: Metrics.rfv(15),
  },
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    resizeMode: 'contain',
    alignItems: 'center',
  },
  checkbox: {
    // alignSelf: 'center',
    marginTop: Metrics.rfv(8),
  },
  label: {
    // margin: Metrics.rfv(8),
    fontSize: Metrics.rfv(12),
    color: COLORS_NEW.black,
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
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
});
