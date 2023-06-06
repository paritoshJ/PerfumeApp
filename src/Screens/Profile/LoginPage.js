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
  Platform
} from 'react-native';
import {AppButton} from '../../Component/button/app-button';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import fontConstant from '../../constant/fontConstant';
import RNRestart from 'react-native-restart';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colorConstant from '../../constant/colorConstant';
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useFocusEffect } from '@react-navigation/native';

export default function LoginPage({navigation}) {
  const {t, i18n} = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useFocusEffect(
    React.useCallback(() => {
      GmailConfiguration();

      return () => { };
    }, []),
  );
  const GmailConfiguration = () => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '59454198171-riv4i7q7g70esra0l8c2efe9kvnove2c.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      iosClientId: '59454198171-jdlajp40s9m11g47uqp9n2db7fpj2tbc.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
      openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
  }
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
  const FBGraphRequest = (fields, callback) => {
    const accessData = AccessToken.getCurrentAccessToken();
    const request = new GraphRequest('/me',
      {
        accessToken: accessData.accessToken,
        parameters: {
          fields: {
            string: fields
          }
        }
      },
      (error, result) => {
        if (result) {
          this.setState({ isLoading: true });
          this.Facebooklogin(result.email, result.id, result.name)
        } else {
          reject(error)
        }
      }
    )
    new GraphRequestManager().addRequest(request).start();
  }
  const FacebookLogin = () => {
    try {
      if (Platform.OS == 'ios') {
        LoginManager.setLoginBehavior('browser');
      }
      else {
        LoginManager.setLoginBehavior('web_only');
      }
      LoginManager.logInWithPermissions(['public_profile', 'email']).then((result) => {
        if (result.isCancelled) {
        } else {
          this.FBGraphRequest('id,email,picture.width(1024).height(1024),name', this.FBLoginCallback);
        }
      });
    } catch (nativeError) {
      try {
        LoginManager.setLoginBehavior('NATIVE_ONLY');
      } catch (webError) {
      }
    }
  }
  const signIn = async () => {
    try {
      console.log('if ');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('if 1', userInfo);


    } catch (error) {
      console.log('Error', error);
      // const typedError = error as NativeModuleError;
      if (typedError.code === statusCodes.SIGN_IN_REQUIRED) {
        this.setState({
          error: new Error('User not signed it yet, please sign in :)'),
        });
      } else {
        this.setState({ error: typedError });
      }
    }
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
          onPress={() => navigation.replace('EnterDetail')}
        />
        <AppButton
          preset="secondary"
          text={t('Create account')}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.replace('CreateAccount')}
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
          <TouchableOpacity onPress={() => { signIn() }} style={styles.socialLoginLogoComponent}>
            <Image
              style={styles.button}
              source={require('../../../assets/Google.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            FacebookLogin();
          }} style={styles.socialLoginLogoComponent}>
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
              <Text
                style={{
                  paddingEnd: Metrics.rfv(8),
                  color: colorConstant.black,
                }}>
                English
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#DFC8AF'}}
                thumbColor="white"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text
                style={{
                  paddingStart: Metrics.rfv(8),
                  color: colorConstant.black,
                }}>
                العربية
              </Text>
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
