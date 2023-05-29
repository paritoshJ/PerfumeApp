import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  ScrollView,
  Alert,
  RefreshControl
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import Loader from '../../Component/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { GET_CREDIT_CARD_API, DELETE_CREDIT_CARD_API } from '../../api/AddCreditCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeout from 'react-native-swipeout';
import EditPencilSVG from '../../assets/svg/EditPencil';
import TrashIconSVG from '../../assets/svg/TrashIconSVG';
import CheckedRadioSVG from '../../assets/svg/CheckedRadio';
import UnCheckedRadioSVG from '../../assets/svg/UnCheckedRadio';
import fontConstant from '../../constant/fontConstant';
import PlusSVG from '../../assets/svg/PlusSVG';
import Modal from 'react-native-modal';

export default function NoCreditCard({navigation}) {
  const [loading, setLoading] = useState(false);
  var [getCreditcardList, setCreditcardList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const [getRefrash, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [getDeleteid, setDeleteid] = useState('');

  const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      setCreditcardList([]);
      getCreditcardList = [];
      GetCreditCard();

      return () => { };
    }, []),
  );
  const GetCreditCard = () => {
    GET_CREDIT_CARD_API().then((res) => {
      console.log('response', res)
      setCreditcardList(res.GetCardDetail.fetchcarddetails)
      setLoading(false);

    }).catch((err) => {
      setCreditcardList([])
      setLoading(false);

    })
    console.log('response', getCreditcardList.length)

  }


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

        <Text style={styles.navBarText}>{t('Credit cards')}</Text>
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
      } contentContainerStyle={{ flexGrow: 1 }}>
        {getCreditcardList?.length > 0 ? (
          getCreditcardList.map((e, index) => {
            console.log('enter', index)
            return (
              <Swipeout
                autoClose={true}
                close={index == selectedItem ? false : true}
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
                          style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS_NEW.systemRed,
                          }}
                          onPress={() => {
                            setIsModalVisible(true);
                            setDeleteid(e.card_id);
                            // Alert.alert('Delete Address', 'Are you sure want to delete this address?', [
                            //   {
                            //     text: 'Cancel',
                            //     onPress: () => console.log('Cancel Pressed'),
                            //     style: 'cancel',
                            //   },
                            //   {
                            //     text: 'OK', onPress: () => {
                            //       console.log('Card_id', e.card_id)

                            //     }
                            //   },
                            // ])
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
                    console.log('eeeeee', e)
                  }}
                  style={{
                    borderRadius: 8,
                    borderWidth: 1,
                    margin: 16,
                    padding: 16,
                    borderColor: 'rgba(43, 40, 38, 0.1)',
                    flexDirection: 'row',
                  }}>
                  {selectedItem == e.id ? (
                    <CheckedRadioSVG />
                  ) : (
                    <UnCheckedRadioSVG />
                  )}
                  <View style={{ flexDirection: 'column', marginHorizontal: 16 }}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                        letterSpacing: 0.4,
                      }}>{`${e?.cardholder_name}`}</Text>
                    <Text
                      style={{
                        marginTop: 6,
                        fontWeight: '400',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                      }}>{`${e?.card_number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}`}</Text>
                    <Text
                      style={{
                        marginTop: 6,
                        fontWeight: '400',
                        fontFamily: fontConstant.satoshi,
                        fontSize: 14,
                        color: COLORS_NEW.mainBlack,
                      }}>{`${t('Expiration :')} ${e?.expiry_date}`}</Text>
                  </View>
                </TouchableOpacity>

              </Swipeout>
            );
          })
        ) : (
            <View style={styles.mainView}>
        <Image
          style={styles.cartImage}
          source={require('../../../assets/NoCreditCard.png')}
          onPress={() => navigation.navigate(-1)}
        />
        <Text style={styles.text1}>{t('You dont have credit cards yet')}</Text>
        <Text style={styles.text2}>{t('Add a card for further quick purchases')}</Text>
        <AppButton
          preset="primary"
          text={t("Add card")}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('AddCreditCard')}
          textStyle={{fontSize: Metrics.rfv(15), fontWeight: '400'}}
        />
      </View>
        )}
        {getCreditcardList?.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddCreditCard')

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
        ) : null}
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.ModalView}>
          <View style={styles.ModalInsideView}>
            <View>
              <Image
                style={styles.ModalImage}
                source={require('../../assets/icon/del.png')}
              />
            </View>
            <Text style={styles.text1}>{t('Delete card')}</Text>
            <Text style={styles.text2}>{t('Are you sure you want to delete the card?')}</Text>
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
                marginTop: Metrics.rfv(5),
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
                setLoading(true);
                DELETE_CREDIT_CARD_API(getDeleteid).then((responce) => {
                  setSelectedItem(0)
                  GetCreditCard();


                }).catch((error) => {
                  setLoading(false);

                })
                handleModal();
              }}
              style={{
                flex: 0,
                backgroundColor: '#BC8B57',
                width: '45%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(200),
                marginTop: Metrics.rfv(5),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.nextButtontext}>{t('Delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loader loading={loading} />

    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
    padding: Metrics.rfv(10),
    borderBottomColor: '#EEEDE7',
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
  cartImage: {
    height: Metrics.rfv(60),
    width: Metrics.rfv(60),
  },
  createAccountButton: {
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.blue,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    backgroundColor: COLORS_NEW.blue,
  },
  goShopping: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
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
  ModalView: {
    backgroundColor: COLORS_NEW.white,
    height: '30%',
    borderRadius: 20,
  },
  ModalInsideView: {
    flex: 1,
    padding: Metrics.rfv(10),
    justifyContent: 'center',
    alignItems: 'center',
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
  nextButtontext: {
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  cancelButton: {
    textAlign: 'center',
    color: '#BC8B57',
  },
});
