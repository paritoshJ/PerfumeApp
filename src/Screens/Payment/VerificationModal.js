import React, {useEffect, useState} from 'react';
import {
  Alert,
  BackHandler,
  I18nManager,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import colorConstant from '../../constant/colorConstant';
import fontConstant from '../../constant/fontConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {ADD_TO_CART_DATA} from '../../api/getAddToCartData';
import {COLORS_NEW} from '../../Helper/colors.new';
import MobileInput from '../../Component/MobileInput';
import Input from '../../Component/Input';
import Metrics from '../../Helper/metrics';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {AppButton} from '../../Component/button/app-button';

const VerificationModal = props => {
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  const [countryCode, setCountryCode] = useState('AE');
  const [country, setCountry] = useState(null);
  const {
    onOpenDailog,
    setOnOpenDailog,
    image,
    title,
    price,
    cat,
    offer,
    displaySize1,
    sku,
    finalPrice,
    regularPrice,
  } = props;
  const [selected, setSelected] = useState('50 ml');
  const [value, setValue] = useState(1);
  const [inputDetail, setinputDetail] = useState('');

  const onSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country);
    console.warn(country);
  };

  const closeDailog = () => {
    setOnOpenDailog(false);
  };

  const handleAddToCart = async () => {
    if (sku) {
      console.log(sku);
      await ADD_TO_CART_DATA(parseFloat(value).toFixed(1), `${sku}`);
      // navigation.navigate('My cart');
    }
  };
  useEffect(() => {
    if (props.mobile) {
      setinputDetail(props.mobile);
    }
  }, []);
  return (
    <Modal
      backdropColor="rgba(0, 0, 0, 0.6)"
      backdropOpacity={1}
      animationType="slide"
      transparent={true}
      isVisible={onOpenDailog}
      onRequestClose={() => {
        // closeDailog();
      }}
      onBackdropPress={() => {
        // closeDailog();
      }}>
      {/* <MyStatusBar backgroundColor={'rgba(0, 0, 0, 0.6)'} /> */}

      {props.showVerification ? (
        <View style={style.centeredView}>
          <View
            style={{
              minHeight: 450,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 16,
            }}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={Platform.OS == 'ios' ? 45 : 0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  // justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}>
                <AntDesign
                  name="close"
                  size={22}
                  color={colorConstant.DARK_PRIMARY}
                  onPress={() => {
                    props.setOnOpenDailog(false);
                  }}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontConstant.gambetta,
                    fontSize: 24,
                    color: COLORS_NEW.mainBlack,
                    marginTop: 20,
                    fontStyle: 'italic',
                  }}>
                  {t('Please verify you number')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={style.product_name}>
                    an OTP has been sent to {`${inputDetail}`}
                  </Text>
                </View>
                <View style={style.ScrollViewOTP}>
                  <OTPInputView
                    style={{width: '80%', height: 150}}
                    pinCount={4}
                    codeInputFieldStyle={style.underlineStyleBase}
                    codeInputHighlightStyle={style.underlineStyleHighLighted}
                    onCodeFilled={code => {
                      navigation.navigate('Profile');
                    }}
                    onCodeChanged={() => {
                      console.warn('df');
                    }}
                    autoFocusOnLoad
                    editable={true}
                  />
                  <View />
                  <Text style={style.didNotReceiveText}>
                    You didn’t receive a code?
                  </Text>
                  <Text
                    style={{
                      color: COLORS_NEW.blue,
                      marginTop: Metrics.rfv(10),
                    }}>
                    Resend
                  </Text>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      ) : (
        <View style={style.centeredView}>
          <View
            style={{
              minHeight: 450,
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 16,
            }}>
            <KeyboardAvoidingView
              keyboardVerticalOffset={Platform.OS == 'ios' ? 45 : 0}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <View
                style={{
                  flex: 1,
                  // justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}>
                <AntDesign
                  name="close"
                  size={22}
                  color={colorConstant.DARK_PRIMARY}
                  onPress={() => {
                    props.setOnOpenDailog(false);
                  }}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontConstant.gambetta,
                    fontSize: 24,
                    color: COLORS_NEW.mainBlack,
                    marginTop: 20,
                    fontStyle: 'italic',
                  }}>
                  {t('Change number')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={style.product_name}>
                    Enter a new phone number to verify
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 6,
                    flexDirection: 'row',
                    alignItems: I18nManager.isRTL ? 'flex-start' : 'flex-start',
                  }}>
                  <MobileInput
                    onSelect={onSelect}
                    onChangeText={e => setinputDetail(e)}
                    countryCode={countryCode}
                    placeholder={'Select code'}
                  />
                  <View style={{flex: 1}}>
                    <Input
                      placeholder={t('Enter Phone number')}
                      placeholderTextColor="gray"
                      value={`${inputDetail}`}
                      editable={false}
                      keyboardType={'numeric'}
                      onChangeText={e => setinputDetail(e)}
                      maxLength={10}
                      style={{
                        borderWidth: 1,
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderColor: colorConstant.LIGHT_MIDIUM_GREY,
                        marginTop: 5,
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                      }}
                    />
                  </View>
                </View>
              </View>

              <View style={{marginTop: 14}}>
                <View style={style.add_card_view}>
                  <AppButton
                    disabled={
                      inputDetail === '' || inputDetail.length < 9
                        ? true
                        : false
                    }
                    tx={t('Save')}
                    style={{
                      marginTop: Metrics.rfv(16),
                      marginBottom: Metrics.rfv(10),
                    }}
                    onPress={() => {
                      props.verifyPhoneNumber();
                    }}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      )}
    </Modal>
  );
};

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  product_name: {
    fontFamily: fontConstant.satoshi,
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    // fontWeight: fontConstant.WEIGHT_REGULAR,
    color: colorConstant.BLACK,
    // paddingTop: 15,
  },
  product_size: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offer_price: {
    color: colorConstant.DARK_PRIMARY,
    fontStyle: 'normal',
    fontSize: fontConstant.TEXT_20_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_SEMI_BOLD,
  },
  price_view: {flexDirection: 'row', marginTop: 16},
  add_card_view: {
    alignSelf: 'center',
    marginVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  review_add_view: {
    borderRadius: 36,
    paddingHorizontal: 56,
    paddingVertical: 15,
    alignItems: 'center',
  },
  text_viewall: {
    color: colorConstant.DARK_PRIMARY,
    fontFamily: fontConstant.satoshi,
    fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
    fontWeight: fontConstant.WEIGHT_LEIGHT,
  },
  product_size_text: {
    color: colorConstant.BLACK,
  },
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
  },
  ScrollViewOTP: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    alignItems: 'center',
    alignContent: 'center',
  },
  underlineStyleHighLighted: {
    color: COLORS_NEW.black,
    borderColor: COLORS_NEW.black,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: Metrics.rfv(50),
    height: Metrics.rfv(50),
    borderWidth: 1,
    borderColor: COLORS_NEW.blue,
    borderRadius: Metrics.rfv(10),
  },
  otpInput: {
    borderColor: COLORS_NEW.black,
  },
  didNotReceiveText: {
    color: COLORS_NEW.black,
  },
});

export default VerificationModal;
