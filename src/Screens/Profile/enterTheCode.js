import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  I18nManager,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import MyStatusBar from '../../Component/MyStatusBar';

export default function EnterTheCode({navigation}) {
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

        <Text style={styles.navBarText}>ENTER THE CODE</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <View style={styles.ScrollView}>
        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            navigation.navigate('Profile');
          }}
          editable={true}
        />
        <View />
        <Text style={styles.didNotReceiveText}>You didn’t receive a code?</Text>
        <Text style={{color: COLORS_NEW.blue, marginTop: Metrics.rfv(10)}}>
          Resend
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
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
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: COLORS_NEW.white,
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
  },
});
