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
import {USER_LOGIN} from '../../api/useLogin';

export default function EnterYourDetails({navigation}) {
  const [inputDetail, setinputDetail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonValue, setButtonValue] = useState('Next');
  const [isSelected, setSelection] = useState(false);

  const {t} = useTranslation();

  const showPasswordField = () => {
    if (isNaN(inputDetail)) {
      return (
        <Input
          placeholder={t('Password')}
          placeholderTextColor="gray"
          onChangeText={e => setPassword(e)}
        />
      );
    }
  };

  const handleLogin = async () => {
    if (buttonValue === 'Next') {
      navigation.navigate('EnterTheCode');
    } else {
      console.log('login called ...');
      let res = await USER_LOGIN(inputDetail, password);
      
      console.log(res, ':::: Final res :::::');
      if(res) {
      navigation.navigate('Profile');
      }
    }
  };

  useEffect(() => {
    if (isNaN(inputDetail)) {
      setButtonValue('text-login');
    } else {
      setButtonValue('Next');
    }
  }, [inputDetail, isSelected]);

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
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Remember Me</Text>
        </View>
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
      <KeyboardAwareScrollView style={styles.ScrollView} enableOnAndroid>
        <Input
          placeholder={t('Email or number')}
          placeholderTextColor="gray"
          value={inputDetail}
          onChangeText={e => setinputDetail(e)}
        />
        {showPasswordField()}
        {showTextLine()}

        <AppButton
          disabled={inputDetail === '' ? true : false}
          tx={t(buttonValue)}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => handleLogin()}
        />
      </KeyboardAwareScrollView>
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
