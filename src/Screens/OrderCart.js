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
import Metrics from '../Helper/metrics';
import {COLORS_NEW} from '../Helper/colors.new';
import colorConstant from '../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontConstant from '../constant/fontConstant';
import MyStatusBar from '../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import StepIndicator from 'react-native-step-indicator';
import CheckMark from '../assets/svg/CheckMark';

export default function OrderCart({navigation}) {
  const {t} = useTranslation();
  const labels = ['Order placed \n 239', 'Shipping', 'Delivered'];
  const customStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 25,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: colorConstant.DARK_PRIMARY,
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: colorConstant.DARK_PRIMARY,
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: colorConstant.DARK_PRIMARY,
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: colorConstant.DARK_PRIMARY,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: colorConstant.DARK_PRIMARY,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: colorConstant.DARK_PRIMARY,
  };

  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <ScrollView>
        <ImageBackground
          style={styles.header_container}
          source={require('./../assets/icon/orderbg.png')}
          resizeMode="stretch">
          {/* <View style={styles.share_view}>
            <AntDesign
              name="left"
              size={22}
              color={colorConstant.BLACK}
              onPress={() => {
                navigation.goBack();
              }}
              style={{marginLeft: 15}}
            />
          </View> */}
        </ImageBackground>

        <View style={styles.mainView}>
          <View>
            <View style={styles.dateView}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 24,
                  fontFamily: fontConstant.gambetta,
                  marginTop: 80,
                }}>
                What happens next?
              </Text>
              <Text
                style={{
                  fontSize: Metrics.rfv(15),
                  color: COLORS_NEW.black,
                  fontFamily: fontConstant.satoshi,
                  fontStyle: 'normal',
                  paddingVertical: Metrics.rfv(10),
                  textAlign: 'center',
                }}>
                Expected delivery date:
                <Text
                  style={{
                    fontSize: Metrics.rfv(15),
                    color: colorConstant.DARK_PRIMARY,
                    fontFamily: fontConstant.satoshi,
                    fontStyle: 'normal',
                    paddingVertical: Metrics.rfv(10),
                    textAlign: 'center',
                  }}>
                  {' '}
                  25.12.2022
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginVertical: 20}}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={0}
            labels={labels}
            stepCount={3}
            renderStepIndicator={() => {
              return <CheckMark />;
            }}
          />
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
              borderRadius: Metrics.rfv(50),
              marginTop: Metrics.rfv(16),
              alignSelf: 'center',
              marginBottom: Metrics.rfv(15),
              borderColor: COLORS_NEW.blue,
              borderWidth: 1,
            }}
            // onPress={() => navigation.navigate('OurStores')}
          >
            <Text style={styles.cancelButton}>{t('View your order')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{name: 'Main'}],
              })
            }
            style={{
              flex: 0,
              backgroundColor: COLORS_NEW.blue,
              width: '45%',
              height: Metrics.rfv(45),
              borderRadius: Metrics.rfv(50),
              marginTop: Metrics.rfv(16),
              alignSelf: 'center',
              marginBottom: Metrics.rfv(15),
            }}>
            <Text style={styles.nextButtontext}>{t('Go home')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header_container: {
    width: '100%',
    height: 380,
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
