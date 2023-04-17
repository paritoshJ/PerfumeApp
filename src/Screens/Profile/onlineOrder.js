/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import fontConstant from '../../constant/fontConstant';

export default function OnlineOrder({navigation}) {
  const [open, setOpen] = useState(false);
  const plusImg = require('../../../assets/plus-sign.png');
  const minusImg = require('../../../assets/minus-color-sign.png');

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
    {
      id: 4,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
    {
      id: 5,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
    {
      id: 6,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
    {
      id: 7,
      title: 'Does it reduce ageing symptoms?',
      body: 'A veritable masterpiece from the W Series of our Signature Collection. The Amber Wood perfume, is imbued with deep and intricate fruity-floral and spicy notes that have been judiciously entwined with cedar, amber wood and patchouli; to give you a sense of inimitable power.',
    },
  ];
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
        <Text style={styles.navBarText}>ONLINE ORDER</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Second View */}
        {List.map(item => {
          return (
            <Collapse index={item.id} onToggle={handleClick}>
              <CollapseHeader
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: Metrics.rfv(5),
                  borderBottomColor: COLORS_NEW.gray,
                  borderBottomWidth: open ? 0 : 1,
                }}>
                <Text
                  style={{
                    color: open ? COLORS_NEW.blue : COLORS_NEW.black,
                    marginBottom: Metrics.rfv(10),
                    fontSize: Metrics.rfv(15),
                    fontFamily: fontConstant.satoshi,
                    fontStyle: 'normal',
                  }}>
                  {item.title}
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
      </ScrollView>
      <View style={styles.mainView} />
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
    paddingHorizontal: Metrics.rfv(20),
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
    fontFamily: fontConstant.satoshi,
    fontStyle: 'normal',
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
});
