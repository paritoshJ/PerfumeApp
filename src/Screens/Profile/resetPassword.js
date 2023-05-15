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
import {AppButton} from '../../Component/button/app-button';
import Input from '../../Component/Input';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import { FORGOT_PASSWORD_API } from '../../api/ChangePassword';
import Loader from '../../Component/Loader';

import {
  isEmpty,
  isNotPasswordSame,
  showDefaultAlert,
} from '../../Helper/helper';
export default function ResetPassword({navigation}) {
  const [inputDetail, setinputDetail] = useState('');
  const [loading, setLoading] = useState(false);

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
              transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>

        <Text style={styles.navBarText}>RESET PASSWORD</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView style={styles.ScrollView}>
        <View style={styles.mainView}>
          <Input
            placeholder="Email or Number"
            placeholderTextColor="gray"
            onChangeText={e => setinputDetail(e)}
          />
        </View>
        <AppButton
          preset="primary"
          text="Reset password"
          style={{marginTop: Metrics.rfv(20)}}
          onPress={() => {
            console.log('inputDetail', inputDetail);
            setLoading(true);
            FORGOT_PASSWORD_API(inputDetail).then((Repsonse) => {
              console.log('response', Repsonse);
              setLoading(false);
              showDefaultAlert('Your reset password link has been sent to registered email address. ');

            }).catch((error) => {
              setLoading(false);

              console.log('error', error);

            })
          }}
          textStyle={{fontSize: Metrics.rfv(15), fontWeight: '400'}}
        />
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </>
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
    color: COLORS_NEW.black,
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
    paddingLeft: Metrics.rfv(40),
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    marginTop: Metrics.rfv(10),
    fontSize: Metrics.rfv(12),
  },
  forgotPasswordField: {
    paddingLeft: Metrics.rfv(40),
    marginTop: Metrics.rfv(10),
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
