import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  I18nManager,
  Alert,
  DeviceEventEmitter,
  RefreshControl
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import PhoneInput from 'react-native-phone-number-input';
import Input from '../../Component/Input';
import CustomSwitch from '../../Component/toggleSwitch';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {
  GET_ADDRESS_LIST,
  DELETE_ADDRESS
} from '../../api/SaveAddress';
import EmptyPageView from '../../Component/EmptyPageView';
import AddressBookSVG from '../../assets/svg/AddressBookSVG';
import SwiperFlatList from 'react-native-swiper-flatlist';
import EditPencilSVG from '../../assets/svg/EditPencil';
import TrashIconSVG from '../../assets/svg/TrashIconSVG';
import Swipeout from 'react-native-swipeout';
import CheckedRadioSVG from '../../assets/svg/CheckedRadio';
import UnCheckedRadioSVG from '../../assets/svg/UnCheckedRadio';
import fontConstant from '../../constant/fontConstant';
import PlusSVG from '../../assets/svg/PlusSVG';
import Loader from '../../Component/Loader';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GET_ALL_STORES_LIST } from '../../api/store';
import Constants from '../../Comman/Constants';

export default function AddressBookList({route, navigation}) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [allShops, setAllShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getRefrash, setRefresh] = useState(false);
  const [getAddress, setAddress] = useState(false);
  const [geRadio, checkRadio] = useState(false);

  const [data, setData] = useState([]);
  const {t} = useTranslation();

  const onSelectSwitch = index => {};
  useFocusEffect(
    React.useCallback(() => {
      console.log('address', route?.params?.address)
      checkRadio(route?.params?.address)
      if (route?.params?.storeList) {
        setLoading(true);
        setAddress(false);
        console.log('dfsfsf', route?.params?.storeList);
        GET_ALL_STORES_LIST().then((Responce) => {
          console.log('Route res 2', Responce)
          setData(Responce?.StorePickUpData?.allStoreLocation);
        }).catch((error) => {
          console.log('Route res 2', error)
        });
        setLoading(false);
      } else {
        console.log('Route confirm 1', route?.params)
        setAddress(true);
        setSelectedItem(route?.params?.selectedAddress);
        setLoading(true);
        getaddresslist()
      }
      // if (route?.params?.selectedAddress) {

      // }
      // if (route?.params?.storeList) {

      // }

      return () => { };
    }, []),
  );

  const getaddresslist = () => {
    GET_ADDRESS_LIST().then((Response) => {
      setData(Response.customer.addresses);
      setLoading(false);

    }).catch((error) => {
      setLoading(false);
      if (error == "ApolloError: The current customer isn't authorized.") {
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
    })
  }
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
  const onAddAddress = items => {
  };
  const addAddress = (isEdit = false) => {
    navigation.navigate('AddressBook', {
      selectedAddress: isEdit ? selectedAddress : {},
      onAddAddress: onAddAddress,
      storeList: getAddress == true ? '' : data,
    });
  };

  const DeleteAddress = (item) => {
    setLoading(true);
    DELETE_ADDRESS(item.id).then((Respopnse) => {
      console.log('Response', Respopnse);
      setSelectedItem(0)

      getaddresslist();
    }).catch((error) => {
      setLoading(false);
    })
  }
  const renderEmptyAndNoLogin = () => {
    return (
      <EmptyPageView
        icon={<AddressBookSVG />}
        title={t("You don't have address yet")}
        message={t('Add a address for further quick purchases')}
        hideAddButton={false}
        onButtonPress={() => {
          addAddress();
        }}
        buttonTitle={Constants.Laungagues.add_address == null ? 'Add address' : Constants.Laungagues.add_address}
      />
    );
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
        <Text style={styles.navBarText}>{Constants.Laungagues.address_book == null ? 'ADDRESS BOOK' : Constants.Laungagues.address_book}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={getRefrash}
          onRefresh={() => {
            console.log('refrash')
            setRefresh(false)

          }}
        />
      }
        contentContainerStyle={{ flexGrow: 1 }}>
        {data.length > 0 ? (
          data.map((e, index) => {
            return (
              <Swipeout
                autoClose={true}
                close={e.id == selectedItem?.id
                  ? false : true}
                onOpen={(data) => {
                  console.log('oper', data);
                  console.log('oper', index);
                  setSelectedItem(index);
                  setRefresh(true)
                  setRefresh(false)

                }}
                right={[
                  {
                    component: (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          flex: 1,
                          marginVertical: 16,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('AddressBook', { id: e })
                          }}
                          style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS_NEW.black,
                          }}>
                          <EditPencilSVG color={COLORS_NEW.white} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS_NEW.systemRed,
                          }}
                          onPress={() => {
                            Alert.alert('Delete Address', 'Are you sure want to delete this address?', [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              { text: 'OK', onPress: () => DeleteAddress(e) },
                            ])
                          }}>
                          <TrashIconSVG />
                        </TouchableOpacity>
                      </View>
                    ),
                    backgroundColor: COLORS_NEW.white,
                  },
                ]}
                backgroundColor={COLORS_NEW.white}
                buttonWidth={120}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedItem(e)
                    if (route?.params?.onAddressFetch) {
                      route?.params?.onAddressFetch(e);
                      navigation.goBack();
                    }

                  }}
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    margin: 16,
                    padding: 16,
                    borderColor: 'rgba(43, 40, 38, 0.1)',
                    flexDirection: 'row',
                  }}>
                  {geRadio == true ? '' : <View>
                    {selectedItem?.id == e.id ? (
                    <CheckedRadioSVG />
                  ) : (
                    <UnCheckedRadioSVG />
                    )}</View>}
                  <View style={{flexDirection: 'column', marginHorizontal: 16}}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                        letterSpacing: 0.4,
                      }}>{`${getAddress == true ? e?.firstname : e?.name}`}</Text>
                    <Text
                      style={{
                        marginTop: 6,
                        fontWeight: '400',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                      }}>{`${getAddress == true ? e?.street?.toString() : e?.address} ${e?.postcode}`}</Text>
                    <Text
                      style={{
                        marginTop: 6,
                        fontWeight: '400',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                      }}>{`${Constants.Laungagues.phone == null ? 'PHONE :' : Constants.Laungagues.phone} ${getAddress == true ? e?.telephone : e?.phone_number == null ? '' : e?.phone_number}`}</Text>
                  </View>
                </TouchableOpacity>

              </Swipeout>
            );
          })
        ) : (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {renderEmptyAndNoLogin()}
          </View>
        )}
        {data.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              addAddress(false);
            }}
            style={{
              borderRadius: 8,
              borderWidth: 1,
              margin: 16,
              padding: 16,
              borderColor: 'rgba(43, 40, 38, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                marginTop: 6,
                fontWeight: '500',
                fontFamily: fontConstant.satoshi,
                fontSize: 16,
                marginRight: 10,
                color: COLORS_NEW.mainBlack,
                textAlign: 'center',
              }}>{`${Constants.Laungagues.add_new_address == null ? 'Add new address' : Constants.Laungagues.add_new_address}`}</Text>
            <PlusSVG />
          </TouchableOpacity>
        )}
      </ScrollView>
      <Loader loading={loading} />

    </>
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
    backgroundColor: COLORS_NEW.white,
    padding: Metrics.rfv(15),
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
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: COLORS_NEW.lightGray,
  },
  addressHeading: {
    fontSize: Metrics.rfv(18),
    marginVertical: Metrics.rfv(5),
    color: COLORS_NEW.black,
  },
});
