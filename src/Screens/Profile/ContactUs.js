/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import colorConstant from '../../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontConstant from '../../constant/fontConstant';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';


export default function ContactUs({navigation}) {
  const { t } = useTranslation();

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <ImageBackground
        style={styles.header_container}
        source={require('../../../assets/contact-back.png')}
        resizeMode="stretch">
        <View style={styles.share_view}>
          <AntDesign
            name="left"
            size={22}
            color={colorConstant.WHITE}
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginLeft: 15}}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
          }}>
          <Text style={styles.navBarText}>{t('CONTACT US')}</Text>
        </View>
      </ImageBackground>
      {/* <ImageBackground
        source={require('../../../assets/contact-back.png')}
        resizeMode="stretch"
        style={styles.img}>
        <View style={styles.navBarView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.navBarImage1}
              source={require('../../../assets/back-white.png')}
            />
          </TouchableOpacity>

          <Text style={styles.navBarText}>CONTACT US</Text>
          <TouchableOpacity>
            <Image style={styles.navBarImage1} source={''} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: Metrics.rfv(20),
            alignItems: 'center',
            justifyContent: 'center',
            top: 20,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </ImageBackground> */}
      <ScrollView>
        <View style={styles.mainView}>
          <View>
            <View style={styles.dateView}>
              <Text style={styles.orderDetailViewLabel}>{t('CORPORATE OFFICE')}</Text>
              <Text style={styles.orderDetailViewText}>
                Ajmal International Trading Co. (LLC) One By Omniyat, 27th Floor
                Business Bay P.O. Box - 8809 Dubai, United Arab Emirates
              </Text>
            </View>
            <View style={styles.statusView}>
              <Text style={styles.orderDetailViewLabel}>{t('TOLL FREE')}</Text>
              <Text style={styles.orderDetailViewText}>80025625</Text>
            </View>
            <View style={styles.customerView}>
              <Text style={styles.orderDetailViewLabel}>{t('PHONE')}</Text>
              <Text style={styles.orderDetailViewText}>+971 (4) 457 4111</Text>
            </View>
            <View style={styles.addressView}>
              <Text style={styles.orderDetailViewLabel}>{t('FAX')}</Text>
              <Text style={styles.orderDetailViewText}>+971 (4) 552 0821</Text>
            </View>
            <View style={styles.phoneView}>
              <Text style={styles.orderDetailViewLabel}>{t('EMAIL')}</Text>
              <Text style={styles.orderDetailViewText}>estore@ajmal.net</Text>
            </View>
          </View>
          <View style={styles.termView}>
            <TouchableOpacity
              style={styles.belowTextView}
              onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Text style={styles.termText}>{t('Privacy policy')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.belowTextView}
              onPress={() => navigation.navigate('TermsAndCondition')}>
              <Text style={styles.termText}>{t('Terms &  Conditions')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: Metrics.rfv(20),
            marginBottom: Metrics.rfv(20),
            justifyContent: 'space-between',
            backgroundColor: COLORS_NEW.white,
          }}>
          <TouchableOpacity
            style={{
              flex: 0,
              backgroundColor: COLORS_NEW.white,
              width: '45%',
              height: Metrics.rfv(45),
              borderRadius: Metrics.rfv(20),
              marginTop: Metrics.rfv(16),
              alignSelf: 'center',
              marginBottom: Metrics.rfv(15),
              borderColor: COLORS_NEW.blue,
              borderWidth: 1,
            }}
            onPress={() => navigation.navigate('OurStores')}>
            <Text style={styles.cancelButton}>{t('OUR STORES')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('WriteUs')}
            style={{
              flex: 0,
              backgroundColor: COLORS_NEW.blue,
              width: '45%',
              height: Metrics.rfv(45),
              borderRadius: Metrics.rfv(200),
              marginTop: Metrics.rfv(16),
              alignSelf: 'center',
              marginBottom: Metrics.rfv(15),
            }}>
            <Text style={styles.nextButtontext}>{t('Write us')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header_container: {
    width: '100%',
    height: 150,
    // backgroundColor: colorConstant.PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  share_view: {
    width: '100%',
    height: 40,
    // marginTop: '5%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '10%',
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
    color: COLORS_NEW.white,
  },
  navBarImage2: {
    height: Metrics.rfv(15),
    width: Metrics.rfv(15),
  },
  navBarText: {
    fontSize: Metrics.rfv(25),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
  },
  orderDetailViewLabel: {
    fontSize: Metrics.rfv(17),
    color: COLORS_NEW.black,
    marginTop: Metrics.rfv(15),
    opacity: 0.2,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
  orderDetailViewText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
    paddingVertical: Metrics.rfv(10),
  },
  termView: {
    marginTop: Metrics.rfv(20),
  },
  belowTextView: {
    marginTop: Metrics.rfv(20),
    borderBottomColor: COLORS_NEW.borderBottomColor,
    borderBottomWidth: 1,
    paddingBottom: Metrics.rfv(10),
  },
  termText: {
    fontSize: Metrics.rfv(15),
    marginBottom: Metrics.rfv(5),
    color: 'black',
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
  },
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
    fontSize: Metrics.rfv(15),
  },
  cancelButton: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.blue,
    fontSize: Metrics.rfv(15),
  },
  img: {
    height: Metrics.rfv(120),
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
});
