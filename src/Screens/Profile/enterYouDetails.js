/* eslint-disable react-native/no-inline-styles */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  I18nManager,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Metrics from '../../Helper/metrics';
import CheckBox from '@react-native-community/checkbox';
import Input from '../../Component/Input';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@apollo/client';
import {USER_LOGIN, USER_LOGIN_MOBILE} from '../../api/useLogin';
import {
  inValidEmail,
  inValidPhoneNumber,
  isEmpty,
  showDefaultAlert,
} from '../../Helper/helper';
import MobileInput from '../../Component/MobileInput';
import colorConstant from '../../constant/colorConstant';
import CheckBoxSection from '../../Component/CheckBoxSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../Component/Loader';
import {TapGestureHandler} from 'react-native-gesture-handler';

export default function EnterYourDetails({navigation}) {
  const [inputDetail, setinputDetail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonValue, setButtonValue] = useState('Next');
  const [isSelected, setSelection] = useState(false);
  const [hidePassword, setHidePassword] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
  };
  const [countryCode, setCountryCode] = useState('FR');
  const [country, setCountry] = useState(null);
  const [showMobile, setShowMobile] = useState(false);

  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  // const [withFlag, setWithFlag] = useState(true)
  // const [withEmoji, setWithEmoji] = useState(true)
  // const [withFilter, setWithFilter] = useState(true)
  // const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(true);

  const {t} = useTranslation();

  useEffect(() => {
    getSavedCreds();
  }, []);

  const getSavedCreds = async () => {
    try {
      const value = await AsyncStorage.getItem('@mobile');
      const valuePass = await AsyncStorage.getItem('@pass');
      if (value !== null) {
        console.log(value, '---valfor email');
        setinputDetail(value);
        // return value;
      }
      if (valuePass !== null) {
        console.log(valuePass, '---valfor valuePass');
        setPassword(valuePass);
        // return valuePass;
      }
    } catch (error) {
      console.log(error, 'error');
      return null;
      // Error retrieving data
    }
  };

  const showPasswordField = () => {
    if (inputDetail.length > 0) {
      return (
        <Input
          placeholder={t('Password')}
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

  const checkForRemeberMe = () => {
    if (!isSelected) {
      removeSaved();
    }
  };

  const removeSaved = () => {
    if (!isSelected) {
      removeSavedCreds();
    }
  };

  const removeSavedCreds = async () => {
    try {
      await AsyncStorage.setItem('@mobile', ``);
      await AsyncStorage.setItem('@pass', ``);
    } catch (error) {
      console.log('error saving token', error);
      // Error saving data
    }
  };
  const handleLoginFlow = async fromMobile => {
    console.log('login called ...');
    setLoading(true);
    let res = '';
    if (fromMobile) {
      await USER_LOGIN_MOBILE(inputDetail, password, 1)
        .then(async res => {
          setLoading(false);
          await AsyncStorage.setItem('token', res?.token);

          navigation.navigate('Profile');
        })
        .catch(async err => {
          showDefaultAlert(err?.message);

          setLoading(false);
        });
    } else {
      await USER_LOGIN(inputDetail, password)
        .then(res => {
          setLoading(false);
          navigation.navigate('Profile');
        })
        .catch(err => {
          showDefaultAlert(err?.message);
          setLoading(false);
        });
    }

    console.log(res, ':::: Final res :::::');
  };
  const handleLogin = () => {
    if (showMobile) {
      if (validateMobileFields()) {
        handleLoginFlow(true);
      }
    } else {
      if (validateFields()) {
        handleLoginFlow(false);
      }
    }
    // if (buttonValue === 'Next') {
    //   if (validateMobileFields()) {
    //     // checkForRemeberMe();
    //     // navigation.navigate('EnterTheCode');
    //   }
    // } else {
    //   if (validateFields()) {
    //     console.log('login called ...');
    //     let res = await USER_LOGIN(inputDetail, password);

    //     console.log(res, ':::: Final res :::::');
    //     if (res) {
    //       navigation.navigate('Profile');
    //     }
    //   }
    // }
  };

  const validateFields = () => {
    if (isEmpty(inputDetail)) {
      showDefaultAlert('Please enter email address');
      return false;
    } else if (inValidEmail(inputDetail)) {
      showDefaultAlert('Please enter a valid email address');
      return false;
    } else if (isEmpty(password)) {
      showDefaultAlert("Password can't be empty");
      return false;
    } else {
      return true;
    }
  };

  const validateMobileFields = () => {
    if (isEmpty(inputDetail)) {
      showDefaultAlert('Please enter mobile number');
      return false;
    } else if (inValidPhoneNumber(inputDetail)) {
      showDefaultAlert('Please enter a valid mobile number');
      return false;
    } else if (isEmpty(password)) {
      showDefaultAlert("Password can't be empty");
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (isNaN(inputDetail)) {
      setButtonValue('text-login');
      setShowMobile(false);
    } else {
      setButtonValue('text-login');

      // setButtonValue('Next'); tbu
      // setShowMobile(true);
    }
  }, [inputDetail, isSelected]);

  useEffect(() => {
    if (!isNaN(inputDetail) && inputDetail.length > 0) {
      setShowMobile(true);
    } else {
      setShowMobile(false);
    }
  }, [inputDetail]);

  const setValueInAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('@mobile', `${inputDetail}`);
      await AsyncStorage.setItem('@pass', `${password}`);
    } catch (error) {
      console.log('error saving token', error);
      // Error saving data
    }
  };

  const showTextLine = () => {
    if (isNaN(inputDetail)) {
      return (
        <TouchableOpacity
          style={styles.forgotPasswordField}
          onPress={() => navigation.navigate('Changepassword')}>
          <Text>{t('Forgot password?')}</Text>
        </TouchableOpacity>
      );
    } else if (inputDetail) {
      return (
        <>
          {/* <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Remember Me</Text>
          </View> */}
          <View style={styles.checkboxContainer}>
            <CheckBoxSection
              setChecked={val => {
                setSelection(val);
                setValueInAsyncStorage();
              }}
              checked={isSelected}
              labelStyle={styles.label}
              label={'Remember Me'}
            />
          </View>
        </>
      );
    }
  };

  return (
    <View style={{flex: 1}}>
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

        <Text style={styles.navBarText}>{t('Enter your details')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS == 'ios' ? 45 : 0}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.ScrollView}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            {showMobile ? (
              <View
                style={{
                  marginTop: Metrics.rfv(16),
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <MobileInput
                  onSelect={onSelect}
                  onChangeText={e => setinputDetail(e)}
                  countryCode={countryCode}
                  placeholder={'Select mobile'}
                />
                <View style={{flex: 1}}>
                  <Input
                    placeholder={t('Email')}
                    placeholderTextColor="gray"
                    value={inputDetail}
                    onChangeText={e => setinputDetail(e)}
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
            ) : (
              <View style={{flex: 1}}>
                <Input
                  placeholder={t('Email or number')}
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
            )}
          </View>

          {showPasswordField()}
          {showTextLine()}
        </View>

        <AppButton
          disabled={inputDetail === '' || password === '' ? true : false}
          tx={t(buttonValue)}
          style={{marginTop: Metrics.rfv(16), marginBottom: Metrics.rfv(10)}}
          onPress={() => handleLogin()}
        />
      </KeyboardAvoidingView>
      <Loader loading={loading} />

      {/* <StatusBar barStyle="dark-content" />
      <View style={styles.navBarView}>
        <Image
          style={styles.navBarImage1}
          source={require('../../../assets/Back-Arrow.png')}
          onPress={() => navigation.navigate(-1)}
        />
        <Text style={styles.navBarText}>ENTER YOUR DETAILS</Text>
        <Image style={styles.navBarImage1} source={''} />
      </View>
      <KeyboardAwareScrollView style={styles.ScrollView}>
        <View style={styles.mainView}>
          <Input
            style={styles.TextInput}
            placeholder="Email Or Number"
            placeholderTextColor="gray"
            value={inputDetail}
            onChangeText={e => setinputDetail(e)}
          />
          {showPasswordField()}
          {showTextLine()}
          <TouchableOpacity
            style={{
              flex: 0,
              backgroundColor: '#BC8B57',
              width: 270,
              height: 45,
              borderRadius: 20,
              marginTop: 16,
              alignSelf: 'center',
              marginBottom: 15,
              opacity: inputDetail === '' ? 0.5 : 1,
            }}
            disabled={inputDetail === '' ? true : false}
            onPress={() =>
              buttonValue === 'Next'
                ? navigation.navigate('EnterTheCode')
                : navigation.navigate('Profile')
            }>
            <Text style={styles.nextButtontext}>{buttonValue}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
    paddingBottom: Metrics.rfv(20),
  },
  mainView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  TextInput: {
    backgroundColor: COLORS_NEW.white,
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: 'black',
    paddingLeft: Metrics.rfv(15),
  },
  NextButton: {},
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(15),
    paddingLeft: Metrics.rfv(-10),
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    fontSize: Metrics.rfv(12),
    color: COLORS_NEW.black,
  },
  forgotPasswordField: {
    paddingLeft: Metrics.rfv(-10),
    marginTop: Metrics.rfv(15),
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
