/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  DeviceEventEmitter
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import Input from '../../Component/Input';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {
  isEmpty,
  isNotPasswordSame,
  showDefaultAlert,
} from '../../Helper/helper';
import { ADD_CREDIT_CARD_API } from '../../api/ChangePassword';
import Loader from '../../Component/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ChnagePassword({navigation}) {
  const [inputDetail, setinputDetail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [buttonValue, setButtonValue] = useState('Next');
  const [isSelected, setSelection] = useState(false);
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideRepeatPassword, setHideRepeatPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const {t} = useTranslation();

  const validateFields = () => {
    if (isEmpty(currentPassword)) {
      showDefaultAlert('Please enter old password');
      return false;
    } else if (isEmpty(newPassword)) {
      showDefaultAlert('Please enter new password');
      return false;
    }
    else if (isEmpty(repeatPassword)) {
      showDefaultAlert('Please re-enter password');
      return false;
    }
    else if (isNotPasswordSame(newPassword, repeatPassword)) {
      showDefaultAlert("Passwords doesn't match");
      return false;
    } else {
      return true;
    }
  };

  const handleSave = () => {
    if (validateFields()) {
      console.log('Enter')
      setLoading(true)
      ADD_CREDIT_CARD_API(currentPassword, newPassword).then(async (Response) => {
        console.log('Response', Response)
        setLoading(false)
        try {
          DeviceEventEmitter.emit('event.logout', {});
          await AsyncStorage.setItem('token', '');
          createEmptyCartForLogout();
        } catch (error) {
          console.log(error);
        }

        setTimeout(() => {
          navigation.replace('LoadingPage');
        }, 500);
        // navigation.goBack();
      }).catch((error) => {
        setLoading(false)
        // showDefaultAlert("Passwords doesn't match");

      });
    }
  };
  const createEmptyCartForLogout = async () => {
    let res = await EMPTY_CART();
    console.log(res);
    if (res && res?.createEmptyCart) {
      try {
        await AsyncStorage.setItem('CART_ID', res?.createEmptyCart);
      } catch (e) {
        console.log(e);
      }
    }
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

        <Text style={styles.navBarText}>{t('CHANGE PASSWORD')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView style={styles.ScrollView}>
        <View style={styles.mainView}>
          <Input
            placeholder="Current Password"
            placeholderTextColor={COLORS_NEW.gray}
            onChangeText={e => setCurrentPassword(e)}
            value={currentPassword}
            hidePassword={hideCurrentPassword}
            handleImagePress={() =>
              setHideCurrentPassword(!hideCurrentPassword)
            }
            imageSource={
              hideCurrentPassword
                ? require('./../../assets/icon/EyeClosed.png')
                : require('./../../assets/icon/open-eye.png')
            }
            showRightIcon
            iw={24}
            ih={24}
          />
          <TouchableOpacity
            style={styles.forgotPasswordField}
            onPress={() => navigation.navigate('Resetpassword')}>
            <Text style={{color: COLORS_NEW.black}}>
              {t('Forgot password?')}
            </Text>
          </TouchableOpacity>
          <View style={{marginTop: Metrics.rfv(15)}}>
            <Input
              placeholder={t('New password')}
              placeholderTextColor={COLORS_NEW.gray}
              onChangeText={e => setNewPassword(e)}
              value={newPassword}
              hidePassword={hideNewPassword}
              handleImagePress={() => setHideNewPassword(!hideNewPassword)}
              imageSource={
                hideNewPassword
                  ? require('./../../assets/icon/EyeClosed.png')
                  : require('./../../assets/icon/open-eye.png')
              }
              showRightIcon
              iw={24}
              ih={24}
            />
            <Input
              placeholder={t('Repeat new password')}
              placeholderTextColor={COLORS_NEW.gray}
              onChangeText={e => setRepeatPassword(e)}
              value={repeatPassword}
              hidePassword={hideRepeatPassword}
              handleImagePress={() =>
                setHideRepeatPassword(!hideRepeatPassword)
              }
              imageSource={
                hideRepeatPassword
                  ? require('./../../assets/icon/EyeClosed.png')
                  : require('./../../assets/icon/open-eye.png')
              }
              showRightIcon
              iw={24}
              ih={24}
            />
          </View>
        </View>
        <AppButton
          preset="primary"
          text={t('Save')}
          onPress={handleSave}
          style={{marginTop: Metrics.rfv(20)}}
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
    paddingLeft: Metrics.rfv(-10),
    marginTop: Metrics.rfv(15),
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
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
});
