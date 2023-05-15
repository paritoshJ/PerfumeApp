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
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import PhoneInput from 'react-native-phone-number-input';
import Input from '../../Component/Input';
import CustomSwitch from '../../Component/toggleSwitch';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';

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

export default function AddressBookList({route, navigation}) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [allShops, setAllShops] = useState([]);

  const [data, setData] = useState([]);
  const {t} = useTranslation();

  const onSelectSwitch = index => {};

  useEffect(() => {
    if (route?.params?.selectedAddress) {
      setSelectedItem(route?.params?.selectedAddress);
    }
    if (route?.params?.storeList) {
      console.warn('dfsfsf', route?.params?.storeList);
      setAllShops(route?.params?.storeList);
    }
  }, []);

  const onAddAddress = items => {
    // let arr = [...data];
    // arr.push(item);
    setData(items);
    // setSelectedItem(item);
  };
  const addAddress = (isEdit = false) => {
    // AddressBook
    navigation.navigate('AddressBook', {
      selectedAddress: isEdit ? selectedAddress : {},
      onAddAddress: onAddAddress,
      storeList: allShops,
    });
  };
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
        buttonTitle={t('Add address')}
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
        <Text style={styles.navBarText}>{t('ADDRESS BOOK')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {data.length > 0 ? (
          data.map(e => {
            return (
              <Swipeout
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
                          onPress={() => {}}>
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
                    setSelectedItem(e);
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
                  {selectedItem?.telephone === e?.telephone ? (
                    <CheckedRadioSVG />
                  ) : (
                    <UnCheckedRadioSVG />
                  )}
                  <View style={{flexDirection: 'column', marginHorizontal: 16}}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                        letterSpacing: 0.4,
                      }}>{`${e?.firstname}`}</Text>
                    <Text
                      style={{
                        marginTop: 6,
                        fontWeight: '400',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                      }}>{`${e?.street?.toString()} ${e?.postcode}`}</Text>
                    <Text
                      style={{
                        marginTop: 6,
                        fontWeight: '400',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                      }}>{`${t('PHONE :')} ${e?.telephone}`}</Text>
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
              }}>{`${t('Add new address')}`}</Text>
            <PlusSVG />
          </TouchableOpacity>
        )}
      </ScrollView>
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
