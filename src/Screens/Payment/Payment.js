import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  I18nManager,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import MyStatusBar from './../../Component/MyStatusBar';
import {COLORS_NEW} from '../../Helper/colors.new';
import {useTranslation} from 'react-i18next';
import CheckedRadioSVG from '../../assets/svg/CheckedRadio';
import UnCheckedRadioSVG from '../../assets/svg/UnCheckedRadio';
import colorConstant from '../../constant/colorConstant';
import ArrowRightGray from '../../assets/svg/ArrowRightGray';
import VerificationModal from './VerificationModal';
import fontConstant from '../../constant/fontConstant';
import Metrics from '../../Helper/metrics';

export default function Payment({route, navigation}) {
  const {t} = useTranslation();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showVerification, setVerification] = useState(false);

  const [showPaymentDetailScreen, setShowPaymentDetailScreen] = useState(false);
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    console.log('payment', route.params);
    // setOrders(route?.params?.cart?.items);
    setPaymentData(route?.params?.payment);
  }, []);

  const renderHeader = () => {
    return (
      <View style={[styles.navBarView, styles.devider]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.navBarText}>{t('Payment')}</Text>
      </View>
    );
  };
  const rendePaymentItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(item);
          if (item?.code == 'cashondelivery') {
            setShowPaymentDetailScreen(true);
          }
          // setPaymentMethod(item);
          // navigation.navigate('Payment', {
          //   payment: cartData?.available_payment_methods,
          // });
        }}
        style={{flex: 1, marginTop: 16, flexDirection: 'row'}}>
        {/* {paymentData?.code === item.code ? (
          <CheckedRadioSVG />
        ) : (
          <UnCheckedRadioSVG />
        )} */}
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
            borderBottomWidth: 1,
            borderBottomColor: colorConstant.LIGHT_GREY,
            paddingBottom: 10,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{letterSpacing: 1, flex: 1}}>{item?.title}</Text>
            <ArrowRightGray />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handlePhoneVerify = () => {
    setVerification(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <MyStatusBar backgroundColor={COLORS_NEW.white} />
      {renderHeader()}
      {showPaymentDetailScreen ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 20,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: 20,
                color: COLORS_NEW.black,
                fontFamily: fontConstant.gambetta,
              }}>
              {t('Cash on delivery')}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS_NEW.black,
                paddingTop: 8,
                fontFamily: fontConstant.satoshi,
              }}>
              {t('Please verify you number')}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: COLORS_NEW.black,
                fontFamily: fontConstant.satoshi,
              }}>
              +48 985 988 788
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                setShowPaymentDetailScreen(false);
              }}
              style={{
                flex: 0,
                backgroundColor: COLORS_NEW.white,
                width: '48%',
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
              <Text style={styles.cancelButton}>{t('Change')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowVerificationModal(true);
              }}
              style={{
                flex: 0,
                backgroundColor: '#BC8B57',
                width: '48%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(200),
                marginTop: Metrics.rfv(10),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.nextButtontext}>{t('Confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          extraData={paymentData}
          data={paymentData}
          contentContainerStyle={{paddingVertical: 16, paddingHorizontal: 10}}
          keyExtractor={(item, index) => 'index' + index}
          ItemSeparatorComponent={() => {
            return <View style={{marginHorizontal: 3}} />;
          }}
          renderItem={rendePaymentItem}
        />
      )}
      {showVerificationModal && (
        <VerificationModal
          // onOpenDailog={onOpenDailog}
          showVerification={showVerification}
          mobile={99909090909}
          verifyPhoneNumber={handlePhoneVerify}
          setOnOpenDailog={() => {
            setShowVerificationModal(!showVerificationModal);
            setVerification(false);
          }}
          handleOTPSubmit={() => {
            setShowVerificationModal(!showVerificationModal);
            setVerification(false);
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    marginBottom: 32,
  },
  mainView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBarView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  methodView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: 1,
  },
  methodClick: {flexDirection: 'row', alignItems: 'center'},
  devider: {borderBottomColor: '#EEEDE7', borderBottomWidth: 1},
  navBarImage1: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  navBarText: {
    fontSize: 16,
    color: COLORS_NEW.black,
    textAlign: 'center',
    flex: 1,
  },
  modalStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
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
});
