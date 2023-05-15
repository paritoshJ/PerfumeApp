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
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-credit-card-input';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import Loader from '../../Component/Loader';
import { useFocusEffect } from '@react-navigation/native';
import { AppButton } from '../../Component/button/app-button';
import { ADD_CREDIT_CARD_API } from '../../api/AddCreditCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreditCard({navigation}) {
  const [creditCardInput, setCreditCardInput] = useState();
  const [loading, setLoading] = useState(false);
  const [getCartID, SetCartid] = useState();

   const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      AsyncStorage.getItem('CART_ID').then((Data) => {
        console.log('get Cartid', Data)
        SetCartid(Data)
      }).catch((error) => {

      });


      return () => { };
    }, []),
  );
  return (
    <View style={{ flex: 1 }}>
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
      <View
        style={{
          flex: 1,
          paddingHorizontal: Metrics.rfv(15),
          paddingTop: Metrics.rfv(20),
        }}>
        <CreditCardInput
          requiresName={true}
          validColor="black"
          onChange={form => setCreditCardInput(form)}
        />
      </View>
      <View style={{ marginHorizontal: Metrics.rfv(16) }}>
        <AppButton
          disabled={false}
          tx={t('Save')}
          style={{
            marginTop: Metrics.rfv(16),
            marginBottom: Metrics.rfv(10),
          }}
          onPress={async () => {
            setLoading(true);
            var Response = await ADD_CREDIT_CARD_API(creditCardInput.values.cvc, creditCardInput.values.name, creditCardInput.values.number, getCartID, creditCardInput.values.expiry)
            console.log('Response', Response)
            if (Response?.SetCardDetail.card_deatil.status == true) {
              navigation.goBack();
            }
          }}
        />
      </View>
      <Loader loading={loading} />
    </View>

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
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: COLORS_NEW.white,
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
  },
  text2: {
    fontSize: Metrics.rfv(12),
    marginTop: Metrics.rfv(10),
  },
});
