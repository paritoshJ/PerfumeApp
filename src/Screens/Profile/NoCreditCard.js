import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import Loader from '../../Component/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { GET_CREDIT_CARD_API } from '../../api/AddCreditCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoCreditCard({navigation}) {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      AsyncStorage.getItem('CART_ID').then((cartid) => {
        console.log('get Cartid', cartid)
        GetCreditCard(cartid);
      }).catch((error) => {

      });

      return () => { };
    }, []),
  );
  const GetCreditCard = (cartid) => {
    GET_CREDIT_CARD_API(cartid).then((res) => {
      setLoading(false);
    }).catch((err) => {
      setLoading(false);

    })
  }
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

        <Text style={styles.navBarText}>{t('Credit cards')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <Image
          style={styles.cartImage}
          source={require('../../../assets/NoCreditCard.png')}
          onPress={() => navigation.navigate(-1)}
        />
        <Text style={styles.text1}>{t('You dont have credit cards yet')}</Text>
        <Text style={styles.text2}>{t('Add a card for further quick purchases')}</Text>
        <AppButton
          preset="primary"
          text={t("Add card")}
          style={{marginTop: Metrics.rfv(16)}}
          onPress={() => navigation.navigate('AddCreditCard')}
          textStyle={{fontSize: Metrics.rfv(15), fontWeight: '400'}}
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
    flex: 1,
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
    borderBottomColor: '#EEEDE7',
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
  cartImage: {
    height: Metrics.rfv(60),
    width: Metrics.rfv(60),
  },
  createAccountButton: {
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.blue,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    backgroundColor: COLORS_NEW.blue,
  },
  goShopping: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
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
});
