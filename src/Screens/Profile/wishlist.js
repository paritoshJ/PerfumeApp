/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import CustomSwitch from '../../Component/toggleFilter';
import ProductCard from '../../Component/ProducCard';
import PerfumeData from '../../utils/perfumedata';
import {FlatGrid} from 'react-native-super-grid';
import { useTranslation } from 'react-i18next';
import MyStatusBar from '../../Component/MyStatusBar';

export default function WishList({navigation}) {
  const { t } = useTranslation();
  const [feed, setFeed] = useState(true);

  const onSelectSwitch = index => {
  };
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <ImageBackground
        source={require('../../../assets/wishlist-back.png')}
        resizeMode="stretch"
        style={styles.img}>
        <View style={styles.navBarView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: Metrics.rfv(15),
                height: Metrics.rfv(15),
                 resizeMode: 'contain',
                transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
              }}
  
              source={require('../../../assets/back-white.png')}
            />
          </TouchableOpacity>

          <Text style={styles.navBarText}>{t('Wishlist')}</Text>
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
          }}>
          <CustomSwitch
            selectionMode={2}
            roundCorner={true}
            option1={t('Sort')}
            option2={t('Filters')}
            onSelectSwitch={onSelectSwitch}
            selectionColor={COLORS_NEW.lightGray}
          />
        </View>
      </ImageBackground>
      {/* No Return View */}
      {!feed ? (
        <View style={styles.mainView}>
          <Image
            style={styles.emptyCartImage}
            source={require('../../../assets/wishlist-color.png')}
          />
          <Text style={styles.text1}>{t('You have no saved items')}</Text>
          <Text style={styles.text2}>
            {t('Start saving as you shop by selecting the little heart.')}
          </Text>
          <AppButton
            preset="primary"
            text="Go Shopping"
            style={{marginTop: Metrics.rfv(16)}}
          />
        </View>
      ) : (
        <>
          <ScrollView style={styles.scrollView}>
            <FlatGrid
              itemDimension={130}
              data={PerfumeData}
              renderItem={({item}) => (
                <ProductCard item={item} offer={true} wishlist={true} />
              )}
            />
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  ScrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
    marginTop: Metrics.rfv(20),
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
    marginTop: Metrics.rfv(20),
    fontSize: Metrics.rfv(20),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  cartImage: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(150),
    backgroundColor: COLORS_NEW.beige,
    resizeMode: 'contain',
    borderRadius: Metrics.rfv(20),
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(20),
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
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
  },
  upperBarMainView: {
    flexDirection: 'row',
    borderBottomColor: COLORS_NEW.gray,
    borderBottomWidth: 1,
    width: '100%',
  },
  shortView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: Metrics.rfv(10),
    width: '50%',
  },
  filtersView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: Metrics.rfv(5),
    marginVertical: Metrics.rfv(10),
    width: '50%',
    alignItems: 'center',
  },
  verticlLineView: {
    borderLeftColor: COLORS_NEW.gray,
    borderLeftWidth: 1,
  },
  card: {
    width: '49%',
    backgroundColor: '#F5FAFE',
  },
  discountTagView: {
    backgroundColor: COLORS_NEW.black,
    height: Metrics.rfv(30),
    width: Metrics.rfv(60),
    borderTopLeftRadius: Metrics.rfv(20),
    borderBottomRightRadius: Metrics.rfv(20),
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  discountText: {
    color: COLORS_NEW.white,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    left: 15,
    right: 0,
    bottom: 0,
  },
  favIcon: {
    height: Metrics.rfv(20),
    width: Metrics.rfv(15),
    resizeMode: 'contain',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
    left: 130,
    right: 0,
    bottom: 0,
  },
  img: {
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
});
