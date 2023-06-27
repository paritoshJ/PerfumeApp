import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  ImageBackground,
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
import Input from '../../Component/Input';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import Constants from '../../Comman/Constants';

export default function CreditCard({navigation}) {
  const [creditCardInput, setCreditCardInput] = useState();
  const [loading, setLoading] = useState(false);
  const [getCartID, SetCartid] = useState();
  const [getCardnumber, setCardnumber] = useState('')
  const [getCvv, setCvv] = useState('')
  const [getExpiredate, setExpiredate] = useState('')
  const [getName, setName] = useState("")
  var [getDateFormate, setDateFormate] = useState('') 
   const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      setLoading(false);
      AsyncStorage.getItem('CART_ID').then((Data) => {
        console.log('get Cartid', Data)
        SetCartid(Data)
      }).catch((error) => {
        setLoading(false);

      });


      return () => { };
    }, []),
  );
  const handleExpiryDateChange = (text) => {
    // Remove any non-numeric characters from the input
    const cleanedText = text.replace(/[^0-9]/g, '');

    // Format the input as MM/YY
    let formattedText = cleanedText;
    if (cleanedText.length > 2) {
      formattedText = `${cleanedText.slice(0, 2)}/${cleanedText.slice(2, 4)}`;
    }
    const expirationDate = formatAndValidateExpirationDate(formattedText);
    console.log(expirationDate); // Output: 06/25 or Invalid
    setDateFormate(expirationDate);
    setExpiredate(formattedText);
  };
  const formatAndValidateExpirationDate = (input) => {
    // Remove any non-digit characters from the input
    const cleanedInput = input.replace(/[^\d]/g, '');

    // If the cleaned input has a length of 4, assume it's in MMYY format
    if (cleanedInput.length === 4) {
      const month = cleanedInput.slice(0, 2);
      const year = cleanedInput.slice(2, 4);

      // Format the expiration date as MM/YY
      const formattedDate = moment(`${month}${year}`, 'MMYY').format('MM/YY');

      // Validate the expiration date using moment.js
      const currentDate = moment();
      const expirationDate = moment(`${year}-${month}-01`, 'YY-MM-DD');

      if (expirationDate.isValid() && expirationDate.isAfter(currentDate)) {
        // Valid expiration date
        return formattedDate;
      } else {
        // Invalid expiration date
        return 'Invalid';
      }
    } else {
      // Invalid input length
      return 'Invalid';
    }
  };
  return (
    <KeyboardAwareView doNotForceDismissKeyboardWhenLayoutChanges={true}>
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

          <Text style={styles.navBarText}>{Constants.Laungagues.add_new_card == null ? 'Add new card' : Constants.Laungagues.add_new_card}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>


      <View
          style={{ flex: 1, }}>
          <View style={{
            width: '100%',
            height: '40%',
          }}>
            <ImageBackground
              style={{
                width: '100%',
                height: '100%',
                alignSelf: 'center'
              }}
              resizeMode={'cover'}
              source={require('../../assets/images/creditcard.png')}
            >
              <Text style={{
                fontSize: Metrics.rfv(18),
                color: COLORS_NEW.white,
                marginTop: '27%',
                letterSpacing: 2,
                marginLeft: '11%'
              }}>{getCardnumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1  ').trim()}</Text>
              <View style={{
                marginTop: '3%',
                marginLeft: '11%',
                flexDirection: 'row',
              }}>
                {getExpiredate === '' ? <View /> : <View style={{ width: '12%', }}>
                  <Text style={{
                    fontSize: Metrics.rfv(10),
                    color: COLORS_NEW.white,
                  }}>{'VALID THRU'}</Text>
                </View>}
                <Text style={{
                  fontSize: Metrics.rfv(18),
                  color: COLORS_NEW.white,
                  letterSpacing: 2,
                }}>{getExpiredate}</Text>
              </View>
              <Text style={{
                fontSize: Metrics.rfv(18),
                color: COLORS_NEW.white,
                marginTop: '2%',

                letterSpacing: 2,
                marginLeft: '11%'
              }}>{getName}</Text>
            </ImageBackground>
          </View>
          <ScrollView>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Input
                placeholder="Card number"
                placeholderTextColor="gray"
                keyboardType={'number-pad'}
                style={{ fontSize: Metrics.rfv(14), }}
                maxLength={22}
                onChangeText={(data) => { setCardnumber(data) }}
                value={getCardnumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1  ').trim()}
              />
            </View>
            <View style={{ width: '90%', alignSelf: 'center', justifyContent: "space-between", flexDirection: 'row' }}>
              <View style={{ width: '48%', alignSelf: 'center' }}>
                <Input
                  placeholder="Expire"
                  keyboardType={'numeric'}

                  style={{ fontSize: Metrics.rfv(14), color: getDateFormate == 'Invalid' ? 'red' : 'black' }}
                  placeholderTextColor="gray"
                  maxLength={5}
                  onChangeText={handleExpiryDateChange}
                  value={getExpiredate}
                />
              </View>
              <View style={{ width: '48%', alignSelf: 'center', }}>
                <Input
                  placeholder="CVV"
                  placeholderTextColor="gray"
                  keyboardType={'numeric'}
                  maxLength={3}
                  style={{ fontSize: Metrics.rfv(14), }}
                  onChangeText={(e) => { setCvv(e) }}
                  value={getCvv}
                />
              </View>
            </View>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Input
                placeholder="Holder's name"
                placeholderTextColor="gray"
                maxLength={30}
                style={{ fontSize: Metrics.rfv(14), }}
                onChangeText={(e) => { setName(e) }}
                value={getName}
              />
            </View>
          </ScrollView>
          {/* <CreditCardInput
          requiresName={true}
          validColor="black"
          onChange={form => setCreditCardInput(form)}
        /> */}
      </View>
      <View style={{ marginHorizontal: Metrics.rfv(16) }}>
        <AppButton
            disabled={getCvv === '' ||
              getName === '' ||
              getCardnumber === '' || getExpiredate === '' || getDateFormate == 'Invalid' ? true : false}
            tx={Constants.Laungagues.save == null ? 'Save' : Constants.Laungagues.save}
          style={{
            marginTop: Metrics.rfv(16),
            marginBottom: Metrics.rfv(10),
          }}
          onPress={async () => {
            setLoading(true);
            var Response = await ADD_CREDIT_CARD_API(getCvv, getName, getCardnumber, getExpiredate)
            console.log('Response', Response)
            setLoading(false);

            if (Response?.SetCardDetail.card_deatil.status == true) {
              navigation.goBack();
            }
          }}
        />
      </View>

      <Loader loading={loading} />
    </View>

    </KeyboardAwareView>
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
