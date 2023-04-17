/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
// import {AccordionList} from 'accordion-collapse-react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import CustomSwitch from '../../Component/searchComponent';
import colorConstant from '../../constant/colorConstant';
import AntDesign from 'react-native-vector-icons/AntDesign';
import fontConstant from '../../constant/fontConstant';
import {useTranslation} from 'react-i18next';

import MyStatusBar from '../../Component/MyStatusBar';
export default function FAQ({navigation}) {
  const [open, setOpen] = useState(false);
  const plusImg = require('../../../assets/plus-sign.png');
  const minusImg = require('../../../assets/minus-color-sign.png');
  const {t} = useTranslation();
  const onSelectSwitch = index => {};

  const handleClick = () => {
    setOpen(!open);
  };

  const List = [
    {
      id: 1,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
    {
      id: 2,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
    {
      id: 3,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <ImageBackground
        style={styles.header_container}
        source={require('../../../assets/FAQ-back.png')}
        resizeMode="stretch">
        <View style={styles.share_view}>
          <AntDesign
            name="left"
            size={22}
            color={colorConstant.GRAY}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
              marginLeft: 15,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            height: 80,
            alignItems: 'center',
          }}>
          <Text style={styles.navBarText}>{t('FAQ')}</Text>
        </View>
      </ImageBackground>
      <View style={{bottom: '8%'}}>
        <CustomSwitch
          selectionMode={2}
          roundCorner={true}
          option1={'Sort'}
          option2={'Filters'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={COLORS_NEW.lightGray}
        />
      </View>
      {/* <ImageBackground
        source={require('../../../assets/FAQ-back.png')}
        resizeMode="stretch"
        style={styles.img}>
        <View style={styles.navBarView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.navBarImage1}
              source={require('../../../assets/back-white.png')}
            />
          </TouchableOpacity>

          <Text style={styles.navBarText}>FAQs</Text>
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
        <CustomSwitch
          selectionMode={2}
          roundCorner={true}
          option1={'Sort'}
          option2={'Filters'}
          onSelectSwitch={onSelectSwitch}
          selectionColor={COLORS_NEW.lightGray}
        />
      </ImageBackground> */}
      <ScrollView style={styles.scrollView}>
        {/* Fist View Component */}
        <View style={styles.FirstView}>
          <TouchableOpacity
            style={styles.loginPageComponentView}
            onPress={() => navigation.navigate('OnlineOrder')}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/online-order.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>
                {t('ONLINE ORDERS')}
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
            onPress={() => navigation.navigate('')}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/shipping.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>
                {t('SHIPPING')}
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
            onPress={() => navigation.navigate('')}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/setting.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>
                {t('CUSTOMER SERVICE')}
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
            onPress={() => navigation.navigate('')}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/Return.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>{t('RETURN')}</Text>
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

          <TouchableOpacity style={styles.loginPageComponentView}>
            <View style={styles.loginPageComponentview1}>
              <View>
                <Image
                  style={styles.loginPageComponent}
                  source={require('../../../assets/Payment.png')}
                />
              </View>
              <Text style={styles.loginPageComponentview2}>{t('PAYMENT')}</Text>
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
        </View>
        {/* Second View */}
        <View style={{paddingHorizontal: Metrics.rfv(15)}}>
          <Text
            style={{
              fontSize: Metrics.rfv(18),
              marginVertical: Metrics.rfv(20),
              fontFamily: fontConstant.gambetta,
              fontStyle: 'italic',
              color: colorConstant.BLACK,
            }}>
            {t('Popular FAQs')}
          </Text>
          <View style={styles.ListView}>
            {List.map(item => {
              return (
                <Collapse index={item.id} onToggle={handleClick}>
                  <CollapseHeader
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: Metrics.rfv(15),
                      // borderBottomColor: COLORS_NEW.gray,
                      // borderBottomWidth: open ? 0 : 1,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: open ? COLORS_NEW.blue : COLORS_NEW.black,
                        // marginBottom: Metrics.rfv(10),
                        fontSize: Metrics.rfv(15),
                        fontFamily: fontConstant.satoshi,
                        fontStyle: 'normal',
                      }}>
                      {t(item.title)}
                    </Text>
                    <Image
                      style={styles.navBarImage1}
                      source={open ? minusImg : plusImg}
                    />
                  </CollapseHeader>
                  <CollapseBody
                    style={{
                      borderBottomColor: COLORS_NEW.gray,
                      borderBottomWidth: 1,
                    }}>
                    <Text style={styles.bodyText}>{item.body}</Text>
                  </CollapseBody>
                </Collapse>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.mainView} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  scrollView: {
    marginTop: '-10%',
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
    fontSize: Metrics.rfv(20),
    marginBottom: Metrics.rfv(20),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: Metrics.rfv(15),
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: Metrics.rfv(1),
    paddingVertical: Metrics.rfv(20),
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
  loginPageComponent: {
    width: Metrics.rfv(20),
    height: Metrics.rfv(20),
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
  img: {
    height: Metrics.rfv(120),
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
  ListView: {
    backgroundColor: '#F9F5F1',
    paddingHorizontal: Metrics.rfv(20),
    borderRadius: Metrics.rfv(20),
    marginBottom: '5%',
  },
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
    marginTop: '15%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
