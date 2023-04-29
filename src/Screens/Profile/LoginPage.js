/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  I18nManager,
} from 'react-native';
import {AppButton} from '../../Component/button/app-button';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import fontConstant from '../../constant/fontConstant';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage({navigation}) {
  const {t, i18n} = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [currentLanguage, setLanguage] = useState('ar');
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
    console.log('::: rtl called');
    if (I18nManager.isRTL) {
      changeLanguage('en');
      await I18nManager.forceRTL(false);
    } else {
      changeLanguage('ar');
      await I18nManager.forceRTL(true);
    }
    RNRestart.Restart();
  };

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={styles.navBarView}>
        <TouchableOpacity style={styles.navBarImage1}>
          {/* <Image style={styles.navBarImage1} source={''} /> */}
        </TouchableOpacity>
        <Text style={styles.navBarText}>{t('text login')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Image
            style={styles.navBarImage1}
            source={require('../../../assets/Bell-Icon.png')}
          />
        </TouchableOpacity>
      </View>
      {/* <Navbar Name={'Login'} /> */}
      <View style={styles.mainView}>
        <Text style={styles.loginText}>
          Log in to make purchases and track order
        </Text>
        <AppButton
          preset="primary"
          text={t('text login')}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('EnterDetail')}
        />
        <AppButton
          preset="secondary"
          text={t('Create account')}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('CreateAccount')}
        />
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
          <View style={{flex: 1, height: 1, backgroundColor: '#EEEDE7'}} />
          <View>
            <Text
              style={{width: 30, textAlign: 'center', color: COLORS_NEW.black}}>
              OR
            </Text>
          </View>
          <View style={{flex: 1, height: 1, backgroundColor: '#EEEDE7'}} />
        </View>
        <View style={styles.socialLoginLogo}>
          <TouchableOpacity style={styles.socialLoginLogoComponent}>
            <Image
              style={styles.button}
              source={require('../../../assets/Google.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginLogoComponent}>
            <Image
              style={styles.button}
              source={require('../../../assets/Facebook.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginLogoComponent}>
            <Image
              style={styles.button}
              source={require('../../../assets/Apple.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialLoginLogoComponent}>
            <Image
              style={styles.button}
              source={require('../../../assets/WhatsApp.png')}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.loginPageComponentView}
            onPress={() => {
              navigation.navigate('Country');
            }}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/UAE.png')}
                  onPress={() => navigation.navigate('Country')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>{t('Country')}</Text>
            </View>
            <View style={styles.loginPageComponentText}>
              <Image
                style={{
                  width: Metrics.rfv(10),
                  height: Metrics.rfv(10),
                  marginTop: Metrics.rfv(5),
                  resizeMode: 'contain',
                  transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
                }}
                source={require('../../../assets/arrow.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginPageComponentView}
            onPress={() => navigation.navigate('FAQ')}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/FAQ.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>{t('FAQ')}</Text>
            </View>
            <View style={styles.loginPageComponentText}>
              <Image
                style={{
                  width: Metrics.rfv(10),
                  height: Metrics.rfv(10),
                  marginTop: Metrics.rfv(5),
                  resizeMode: 'contain',
                  transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
                }}
                source={require('../../../assets/arrow.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginPageComponentView}
            onPress={() => navigation.navigate('ContactUs')}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/CONTACT_US.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>
                {t('Contact us')}
              </Text>
            </View>
            <View style={styles.loginPageComponentText}>
              <Image
                style={{
                  width: Metrics.rfv(10),
                  height: Metrics.rfv(10),
                  marginTop: Metrics.rfv(5),
                  resizeMode: 'contain',
                  transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
                }}
                source={require('../../../assets/arrow.png')}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginPageComponentView}
            onPress={languageChange}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/Langauge.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>
                {t('language')}
              </Text>
            </View>
            <View style={styles.loginPageComponentText}>
              <Text style={{paddingEnd: Metrics.rfv(8)}}>English</Text>
              <Switch
                trackColor={{false: '#767577', true: '#DFC8AF'}}
                thumbColor="white"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={{paddingStart: Metrics.rfv(8)}}>العربية</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: Metrics.rfv(20),
  },
  loginText: {
    marginTop: Metrics.rfv(20),
    alignSelf: 'center',
    color: COLORS_NEW.black,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
  buttonView: {
    textAlign: 'center',
    // margin: 'auto',
    alignSelf: 'center',
  },
  LoginButton: {
    backgroundColor: COLORS_NEW.blue,
    // width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    marginTop: Metrics.rfv(16),
  },
  loginButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: 'white',
  },
  createAccountButton: {
    backgroundColor: 'white',
    // width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.blue,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
  },
  createAccountText: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.blue,
  },
  socialLoginLogo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    borderColor: COLORS_NEW.gray,
    borderRadius: Metrics.rfv(50),
    marginVertical: Metrics.rfv(10),
  },
  button: {
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
  },
  socialLoginLogoComponent: {
    width: Metrics.rfv(45),
    height: Metrics.rfv(45),
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS_NEW.white,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPageComponent: {
    width: Metrics.rfv(22),
    height: Metrics.rfv(22),
    // marginBottom: Metrics.rfv(5),
    resizeMode: 'contain',
  },
  loginPageArrow: {
    width: Metrics.rfv(10),
    height: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: Metrics.rfv(15),
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: Metrics.rfv(1),
    paddingVertical: Metrics.rfv(15),
    alignItems: 'center',
  },
  loginPageComponentText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginPageComponentview2: {
    marginLeft: Metrics.rfv(20),
    color: COLORS_NEW.black,
    fontSize: fontConstant.TEXT_14_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
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
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
});
