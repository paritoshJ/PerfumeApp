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
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { USER_SOCIAL_LOGIN } from '../../api/useLogin';
import Loader from '../../Component/Loader';
import Constants from '../../Comman/Constants';
import ContactUs from './ContactUs';

export default function LoginPage({navigation}) {
  const {t, i18n} = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('languageselect')
        .then(response => {
          setIsEnabled(response == 1 ? true : false)
        })
        .catch(error => {
        });
      GmailConfiguration();
      if (Platform.OS == 'ios') {
        return appleAuth.onCredentialRevoked(async () => {
          console.warn('If this function executes, User Credentials have been Revoked');
        });
      }

      return () => { };
    }, []),
  );
  const toggleSwitch = () => {
    console.log('update')
    setIsEnabled(!isEnabled)
    AsyncStorage.setItem('languageselect', isEnabled ? '0' : '1');
    languageChange();
  };
  ////******* Gmail Login *********//////////

  const GmailConfiguration = () => {
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      // webClientId: '876587074927-d7saicn7ljn3g427npg96mndpk2kr5pl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      webClientId: Platform.OS == 'android' ? '876587074927-pgaqucjblfui74hh73gd6glsaba2a96u.apps.googleusercontent.com' : '876587074927-d7saicn7ljn3g427npg96mndpk2kr5pl.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      androidClientId: '876587074927-pgaqucjblfui74hh73gd6glsaba2a96u.apps.googleusercontent.com',

      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      accountName: '', // [Android] specifies an account name on the device that should be used
      // iosClientId: '59454198171-jdlajp40s9m11g47uqp9n2db7fpj2tbc.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
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

  ////******* Facebook Login *********//////////

  const FBGraphRequest = (fields, callback) => {
    console.log('access token responce', fields)

    const accessData = AccessToken.getCurrentAccessToken();
    console.log('access token responce 1', accessData)

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
        console.log('access token responce 2', result)
        if (result) {
          LoginManager.logOut();
          setLoading(true);

          socail_login_api(result.name, "", result.email, result.id, 'facebook')

          // FacebookLogin(result.email, result.id, result.name)
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
        console.log('responce', result)
        if (result.isCancelled) {
        } else {

          FBGraphRequest('id,email,picture.width(1024).height(1024),name', this.FBLoginCallback);
        }
      });
    } catch (nativeError) {
      try {
        LoginManager.setLoginBehavior('NATIVE_ONLY');
      } catch (webError) {
      }
    }
  }

  ////******* Gmail Login *********//////////
  const signIn = async () => {
    try {
      console.log('if ');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setLoading(true);
      console.log('if 1', userInfo);
      socail_login_api(userInfo.user.familyName,
        userInfo.user.givenName,
        userInfo.user.email,
        userInfo.user.id,
        "google");
      signOut();
    } catch (error) {
      console.log('Error', error);
      // const typedError = error as NativeModuleError;
      if (typedError.code === statusCodes.SIGN_IN_REQUIRED) {
        // this.setState({
        //   error: new Error('User not signed it yet, please sign in :)'),
        // });
      } else {
        // this.setState({ error: typedError });
      }
    }
  };
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };


  ////******* Apple Login *********//////////

  const appleDeveloperLogin = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log('appleAuthRequestResponse', appleAuthRequestResponse.email);

    var emmail = appleAuthRequestResponse.email == null || appleAuthRequestResponse.email == "" ? null : appleAuthRequestResponse.email;
    socail_login_api(appleAuthRequestResponse.fullName.familyName,
      appleAuthRequestResponse.fullName.givenName,
      emmail,
      appleAuthRequestResponse.user,
      "apple");
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
    }
  }

  const handleCartId = async () => {
    let res = await EMPTY_CART();
    const sourceCartId = await AsyncStorage.getItem('CART_ID');

    console.log(res);
    if (res && res?.createEmptyCart) {
      try {
        await AsyncStorage.setItem('CART_ID', res?.createEmptyCart);

        setTimeout(() => {
          handleMergeCart(sourceCartId, res?.createEmptyCart);
        }, 1000);
        // setCartId(res?.createEmptyCart)
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
  };
  const socail_login_api = async (firtname, lastname, email, user, socialLoginType) => {
    await USER_SOCIAL_LOGIN(firtname, lastname, email, user, socialLoginType)
      .then(async res => {
        setLoading(false);
        console.log('login called ...', res?.token);

        Constants.Token = "Bearer " + res?.token;
        console.log('login called ...', Constants.Token);

        await AsyncStorage.setItem('token', res?.token);
        handleCartId();
        navigation.replace('Profile');
      })
      .catch(async err => {
        showDefaultAlert(err?.message);
        setLoading(false);
      });
  }
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      {/* <StatusBar barStyle="dark-content" /> */}
      <View style={styles.navBarView}>
        <TouchableOpacity style={styles.navBarImage1}>
          {/* <Image style={styles.navBarImage1} source={''} /> */}
        </TouchableOpacity>
        <Text style={styles.navBarText}>{Constants.Laungagues.log_in}</Text>
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
          {Constants.Laungagues.log_in_to_make_purchases_and_track_order == null ? 'Log in to make purchases and track order' : Constants.Laungagues.log_in_to_ + make_purchases_and_track_order}
        </Text>
        <AppButton
          preset="primary"
          text={Constants.Laungagues.log_in}
          style={{ marginTop: Metrics.rfv(16), textTransform: 'capitalize' }}
          onPress={() => navigation.replace('EnterDetail')}
        />
        <AppButton
          preset="secondary"
          text={Constants.Laungagues.create_account}
          style={{ marginTop: Metrics.rfv(16), fontFamily: fontConstant.satoshifont, fontSize: 16, fontWeight: '400' }}
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
          <TouchableOpacity onPress={async () => {
            appleDeveloperLogin();
          }} style={styles.socialLoginLogoComponent}>
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
              <Text style={styles.loginPageComponentview2}>{Constants.Laungagues.country}</Text>
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
              <Text style={styles.loginPageComponentview2}>{Constants.Laungagues.faq == null ? "FAQ" : Constants.Laungagues.faq}</Text>
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
                {Constants.Laungagues.contact_us}
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
      <Loader loading={loading} />

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
    fontFamily: fontConstant.satoshifont,
    fontStyle: 'normal',
    textTransform: 'uppercase'
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
    fontFamily: fontConstant.satoshifont,
    fontStyle: 'normal',
    textTransform: 'uppercase'
  },
});
