/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import fontConstant from '../../constant/fontConstant';
import {removeHtmlTags} from '../../Helper/helper';
import {AccordionList} from 'accordion-collapse-react-native';
import colorConstant from '../../constant/colorConstant';

export default function FAQList({navigation, route}) {
  const [open, setOpen] = useState(false);
  const [faqList, setFaqList] = useState([]);
  const [skuValue, setSkuValue] = useState('');
  const plusImg = require('../../../assets/plus-sign.png');
  const minusImg = require('../../../assets/minus-color-sign.png');

  useEffect(() => {
    if (route?.params?.faqList) {
      setFaqList(route?.params?.faqList);
    }
    if (route?.params?.sku) {
      setSkuValue(route?.params?.sku);
    }
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };
  const head = (item, index, isExpanded) => {
    return (
      <View
        style={{
          paddingTop: 15,
          paddingBottom: 15,
          borderBottomColor: '#EEEDE7',
          borderBottomWidth: 1,
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: isExpanded ? COLORS_NEW.blue : colorConstant.BLACK,
            fontFamily: fontConstant.satoshi,
            fontSize: fontConstant.TEXT_16_SIZE_REGULAR,
            fontWeight: fontConstant.WEIGHT_REGULAR,
            flex: 1,
          }}>
          {item.title}
        </Text>
        <AntDesign
          name={isExpanded ? 'minus' : 'plus'}
          size={20}
          color={colorConstant.BLACK}
        />
      </View>
    );
  };

  const body = item => {
    return (
      <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
        <Text style={{textAlign: 'left', color: colorConstant.BLACK}}>
          {removeHtmlTags(item.answer)}
        </Text>
      </View>
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
        <Text style={styles.navBarText}>FAQ</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <AccordionList
        list={faqList}
        header={head}
        body={body}
        keyExtractor={item => `${item.id}`}
      />
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
