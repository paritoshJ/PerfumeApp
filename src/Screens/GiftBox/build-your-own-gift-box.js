import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
} from 'react-native';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import Metrics from '../../Helper/metrics';
import {ScrollView} from 'react-native-gesture-handler';
import FilterBar from '../../Component/toggleFilter';
import ProductCard from '../../Component/ProducCard';
import PerfumeData from '../../utils/perfumedata';
import {FlatGrid} from 'react-native-super-grid';
import { useTranslation } from 'react-i18next'
import MyStatusBar from '../../Component/MyStatusBar';

export default function BuildYourOwnGiftBox({navigation}) {
  const { t } = useTranslation()

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
        <Text style={styles.navBarText}>BUILD YOUR OWN</Text>
        <TouchableOpacity>
          <Image
            style={styles.navBarImage1}
            source={require('../../../assets/close-button.png')}
          />
        </TouchableOpacity>
      </View>
      {/* Progress Bar */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: Metrics.rfv(20),
          }}>
          <Text>Box</Text>
          <Text>Gifts</Text>
          <Text>Sticker</Text>
          <Text>Review</Text>
        </View>
        <Progress.Bar
          progress={0.5}
          width={null}
          height={1}
          color={COLORS_NEW.blue}
        />
      </View>
      <ImageBackground
        source={require('../../../assets/build-your-own-gift-box.png')}
        resizeMode="stretch"
        style={styles.img}>
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
        <View
          style={{
            paddingHorizontal: Metrics.rfv(20),
            marginTop: Metrics.rfv(130),
          }}>
          <FilterBar
            option1={t('Sort')}
            option2={t('Filters')}
            selectionColor={COLORS_NEW.lightGray}
          />
        </View>
      </ImageBackground>
      {/*  */}
      <ScrollView style={styles.ScrollView}>
        <FlatGrid
          itemDimension={130}
          data={PerfumeData}
          renderItem={({item}) => (
            <ProductCard item={item} offer={true} wishlist={true} onSizeSelect={(data)=>{}} 
      onFullItemPress ={() => {
          // setSelectedProduct(item);
          // setonOpenDailog(true);
        }} />
          )}
        />
      </ScrollView>
      <View
        style={{
          marginHorizontal: Metrics.rfv(20),
          marginVertical: Metrics.rfv(30),
        }}>
        <AppButton
          preset="primary"
          text={t("Next")}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('AddGiftBoxMessage')}
        />
      </View>
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
    borderColor: '#BC8B57',
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    backgroundColor: '#BC8B57',
  },
  goShopping: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: 'white',
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
  blueCardView: {
    marginHorizontal: Metrics.rfv(15),
    paddingHorizontal: Metrics.rfv(150),
    paddingVertical: Metrics.rfv(90),
    borderRadius: Metrics.rfv(20),
    backgroundColor: '#F5FAFE',
    position: 'relative',
  },
  showAmountView: {
    flexDirection: 'row',
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    borderRadius: Metrics.rfv(100),
    backgroundColor: '#fff',
    width: Metrics.rfv(100),
    height: Metrics.rfv(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrics.rfv(10),
  },
  textHeading: {
    fontSize: Metrics.rfv(20),
    color: COLORS_NEW.black,
    fontFamily: 'Gambetta-MediumItalic',
  },
  scrollViewImage: {
    marginTop: Metrics.rfv(20),
    height: Metrics.rfv(200),
    width: '100%',
    backgroundColor: COLORS_NEW.beige,
    borderRadius: Metrics.rfv(20),
    justifyContent: 'center',
  },
  messageView: {
    marginTop: Metrics.rfv(10),
  },
  BoxImage: {
    width: '100%',
    height: Metrics.rfv(200),
  },
  itemTag: {
    backgroundColor: COLORS_NEW.itemTagColor,
    width: Metrics.rfv(60),
    padding: Metrics.rfv(2),
    fontSize: Metrics.rfv(12),
    textAlign: 'center',
    borderBottomRightRadius: Metrics.rfv(10),
    borderTopLeftRadius: Metrics.rfv(10),
  },
  itemTagView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  img: {
    height: Metrics.rfv(150),
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
});
