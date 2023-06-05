/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  I18nManager,
  DeviceEventEmitter,
  Alert
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AccordionList} from 'accordion-collapse-react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import Modal from 'react-native-modal';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import {EMPTY_CART} from '../../api/getEmptyCart';
import Loader from '../../Component/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { GET_PROFILE_DETAIL } from '../../api/getProfiledetail';
import { GET_WISHLIST_PRODUCTS } from '../../api/getWishlistApi';

export default function ProfilePage({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [loading, setLoading] = useState(false);
  const [getProfileData, setProfileDAta] = useState();
  const [getName, setname] = useState('Perfume');
  const [getUsername, setUsername] = useState('Perfume');

  const {t} = useTranslation();

  const DATA = [
    {
      id: 1,
      name: t('Orders'),
      image: require('../../../assets/Cart.png'),
      navigation: 'Order',
    },
    {
      id: 2,
      name: t('credit-cards'),
      image: require('../../../assets/Credit-card.png'),
      navigation: 'NoCreditCard',
    },
    {
      id: 3,
      name: t('address-book'),
      image: require('../../../assets/Address-book.png'),
      navigation: 'AddressBookList',
    },
    {
      id: 4,
      name: t('change-password'),
      image: require('../../../assets/Password.png'),
      navigation: 'Changepassword',
    },
    {
      id: 5,
      name: t('wallet'),
      image: require('../../../assets/Wallet.png'),
      navigation: 'Wallet',
    },
    {
      id: 6,
      name: t('loyalty-points'),
      image: require('../../../assets/Loyalty-point.png'),
      navigation: 'LoyaltyPoint',
    },
    {
      id: 7,
      name: t('gift-cards'),
      image: require('../../../assets/Gift-card.png'),
      navigation: 'GiftCard',
    },
    {
      id: 8,
      name: t('WISHLIST'),
      image: require('../../../assets/Wishlist.png'),
      navigation: 'WishList',
    },
    {
      id: 9,
      name: t('returns'),
      image: require('../../../assets/Return.png'),
      navigation: 'Returns',
    },
    {
      id: 10,
      name: t('refer-a-friend'),
      image: require('../../../assets/Refer.png'),
      navigation: 'ReferFriend',
    },
  ];
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getProfileDetail();

      return () => { };
    }, []),
  );
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
    //  RNRestart.Restart();
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
  const getProfileDetail = () => {
    GET_PROFILE_DETAIL().then((res) => {
      console.log('Respomnce get Profile', res)
      setLoading(false);
      if (res.customerExtraData.firstname == '') {
        setname('Perfuem')
      } else {
        setname(res.customerExtraData.firstname);
        setUsername(res.customerExtraData.firstname + ' ' + res.customerExtraData.lastname);
      }
      setProfileDAta(res.customerExtraData)


    }).catch((err) => {
      setLoading(false);
      console.log('error', err)
      if (err == "ApolloError: The current customer isn't authorized.") {
        Alert.alert('Session Expired', 'Your session has expired. Please login again to continue working.', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', onPress: async () => {

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
            }
          },
        ]);
      }
    });
    GET_WISHLIST_PRODUCTS().then(async (res) => {
      console.log('Add wishlist', res);
      try {
        await AsyncStorage.setItem('wishlist', JSON.stringify(res.wishlist.items));
      } catch (e) {
        console.log(e);
      }
    }).catch((error) => {

    })
  }


  return (
    <>
      <View style={{flex: 1}}>
        <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
        <ImageBackground
          source={require('../../../assets/ProfileBack.png')}
          resizeMode="stretch">
          <View style={styles.navBarView}>
            <TouchableOpacity>
              <Image style={styles.navBarImage1} source={''} />
            </TouchableOpacity>
            <Text style={styles.navBarText}>{t('text-profile-caps')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                <Image
                  style={styles.navBarImage1}
                  source={require('../../../assets/Bell-Icon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                <Image
                  style={[styles.navBarImage1, {marginLeft: Metrics.rfv(20)}]}
                  source={require('../../../assets/Logout.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.profileInfoView}
              onPress={() => navigation.navigate('PersonalInfo')}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.avatar}
                    source={{ uri: 'https://eu.ui-avatars.com/api/?name=$' + getName + '&size=250' }}
                  />
                </View>
                <View
                  style={{
                    marginTop: Metrics.rfv(15),
                  }}>
                  <Text style={styles.loginPageComponentview2}>{getUsername}</Text>
                  <Text
                    style={{
                      marginLeft: Metrics.rfv(15),
                      color: COLORS_NEW.black,
                    }}>
                    {getProfileData?.email}
                  </Text>
                </View>
              </View>
              <View style={styles.loginPageComponentText}>
                <Image
                  style={styles.pencilIcon}
                  source={require('../../../assets/Pencil.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {/* Profile Information */}
          {/* First Component */}
          <View style={styles.listView}>
            {DATA.map(item => {
              return (
                <TouchableOpacity
                  style={styles.profilePageListView}
                  onPress={e => navigation.navigate(item.navigation)}>
                  <View style={styles.loginPageComponentview1}>
                    <View>
                      <Image
                        style={styles.loginPageComponent}
                        source={item.image}
                      />
                    </View>
                    <Text style={styles.loginPageComponentview2}>
                      {t(item.name)}
                    </Text>
                  </View>
                  <View style={styles.loginPageComponentText}>
                    <Image
                      style={{
                        width: Metrics.rfv(10),
                        height: Metrics.rfv(10),
                        marginTop: Metrics.rfv(5),
                        resizeMode: 'contain',
                        transform: I18nManager.isRTL
                          ? [{rotate: '180deg'}]
                          : '',
                      }}
                      source={require('../../../assets/arrow.png')}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* Below Component */}
          <View style={styles.secondView}>
            <TouchableOpacity
              style={styles.loginPageComponentView}
              onPress={() => navigation.navigate('Country')}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.loginPageComponent}
                    source={require('../../../assets/UAE.png')}
                  />
                </View>
                <Text style={styles.loginPageComponentview2}>
                  {t('Country')}
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
              onPress={() => navigation.navigate('Notification')}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.loginPageComponent}
                    source={require('../../../assets/Bell-Icon.png')}
                  />
                </View>
                <Text style={styles.loginPageComponentview2}>
                  {t('Notification')}
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
              onPress={() => navigation.navigate('ContactUs')}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image
                    style={styles.loginPageComponent}
                    source={require('../../../assets/CONTACT_US.png')}
                  />
                </View>
                <Text style={styles.loginPageComponentview2}>
                  {t('CONTACT US')}
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

            <View style={styles.loginPageComponentView}>
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
                <Text>English</Text>
                <Switch
                  trackColor={{false: '#767577', true: '#DFC8AF'}}
                  thumbColor="white"
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text>العربية</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.mainView} />
        <Loader loading={loading} />
      </View>
      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.ModalView}>
          <View style={styles.ModalInsideView}>
            <View>
              <Image
                style={styles.ModalImage}
                source={require('../../assets/icon/logout.png')}
              />
            </View>
            <Text style={styles.text1}>{t('logout')}</Text>
            <Text style={styles.text2}>{t('are_you_sure_logout')}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: Metrics.rfv(20),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={handleModal}
              style={{
                flex: 0,
                backgroundColor: COLORS_NEW.white,
                width: '45%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(25),
                marginTop: Metrics.rfv(10),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),
                borderColor: '#BC8B57',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.cancelButton}>{t('Cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                try {
                  DeviceEventEmitter.emit('event.logout', {});
                  await AsyncStorage.setItem('token', '');
                  createEmptyCartForLogout();
                } catch (error) {
                  console.log(error);
                }
                handleModal();
                setTimeout(() => {
                  navigation.replace('LoadingPage');
                }, 500);
              }}
              style={{
                flex: 0,
                backgroundColor: '#BC8B57',
                width: '45%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(200),
                marginTop: Metrics.rfv(10),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.nextButtontext}>{t('Log out?')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  scrollView: {
    backgroundColor: COLORS_NEW.white,
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
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
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 8,
  },
  avatar: {
    height: Metrics.rfv(70),
    width: Metrics.rfv(70),

    borderRadius: Metrics.rfv(70) / 2,
    overflow: "hidden",
    borderWidth: 3,


  },
  pencilIcon: {
    width: Metrics.rfv(20),
    height: Metrics.rfv(20),
    marginTop: Metrics.rfv(25),
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.rfv(15),
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: Metrics.rfv(1),
    alignItems: 'center',
    paddingVertical: Metrics.rfv(15),
  },
  loginPageComponentText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginPageComponentview2: {
    marginLeft: Metrics.rfv(15),
    marginTop: Metrics.rfv(1),
    color: COLORS_NEW.black,
  },
  loginPageArrow: {
    width: Metrics.rfv(10),
    height: Metrics.rfv(10),
    marginTop: Metrics.rfv(5),
    resizeMode: 'contain',
  },
  loginPageComponent: {
    width: Metrics.rfv(20),
    height: Metrics.rfv(20),
    // marginBottom: Metrics.rfv(5),
    resizeMode: 'contain',
  },
  profilePageListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.rfv(15),
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: Metrics.rfv(1),
    paddingVertical: Metrics.rfv(15),
    alignItems: 'center',
  },
  secondView: {
    marginTop: Metrics.rfv(30),
    marginBottom: Metrics.rfv(30),
  },
  profileInfoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(15),
    paddingTop: Metrics.rfv(3),
  },
  ModalView: {
    backgroundColor: COLORS_NEW.white,
    height: '35%',
    borderRadius: 20,
  },
  ModalInsideView: {
    flex: 1,
    padding: Metrics.rfv(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtontext: {
    // flex: 1,
    // padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  cancelButton: {
    // flex: 1,
    // padding: Metrics.rfv(12),
    textAlign: 'center',
    color: '#BC8B57',
  },
  text1: {
    fontSize: Metrics.rfv(24),
    marginTop: Metrics.rfv(10),
    color: COLORS_NEW.black,
  },
  text2: {
    fontSize: Metrics.rfv(14),
    marginTop: Metrics.rfv(10),
    textAlign: 'center',
    color: COLORS_NEW.black,
  },
});
