import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  I18nManager,
  Alert
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import Input from '../../Component/Input';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../Component/Loader';
import { UPDATE_COUNTAC_US_API } from '../../api/ContactUs';
import { inValidEmail, isEmpty, showDefaultAlert } from '../../Helper/helper';
import fontConstant from '../../constant/fontConstant';

export default function WriteUs({navigation}) {
  const [inputDetail, setinputDetail] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const saveConctUs = () => {
    setLoading(true);
    UPDATE_COUNTAC_US_API(inputDetail, email, name, phone).then((Responce) => {
      console.log('Responce', Responce)
      setLoading(false);
      Alert.alert('Success', 'Contact us sent successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }).catch((error) => {
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
        <Text style={styles.navBarText}>{t('WRITE US')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <View>
          <KeyboardAwareScrollView>
            <Text style={styles.mainText}>
              {t('Cant find what you’re looking for? Send us your request by filling in the details as below:')}
            </Text>
            <Input
              placeholder={t("Name")}
              placeholderTextColor="gray"
              style={{ fontFamily: fontConstant.satoshifont, fontSize: 16, fontweight: '400' }}
              onChangeText={e => setName(e)}
            />
            <Input
              placeholder={t("Email")}
              placeholderTextColor="gray"
              autoCapitalize='none'
              keyboardType='email-address'
              autoCorrect={false}
              autoCompleteType='email'

              style={{ fontFamily: fontConstant.satoshifont, fontSize: 16, fontweight: '400' }}
              onChangeText={e => setEmail(e)}
            />
            <Input
              placeholder={t('Phone (optional)')}
              placeholderTextColor="gray"
              keyboardType='numeric'
              style={{ fontFamily: fontConstant.satoshifont, fontSize: 16, fontweight: '400' }}
              maxLength={11} 

              onChangeText={e => setPhone(e)}
            />
            <TextInput
              style={styles.fillInput}
              placeholder={t('Fill in your query')}
              placeholderTextColor="gray"
              value={inputDetail}

              multiline={true}
              numberOfLines={15}
              onChangeText={e => setinputDetail(e)}
            />
            <AppButton
              preset="primary"
              text={t('Submit')}
              disabled={name == '' || email == '' || inputDetail == '' ? true : false}
              style={{marginTop: Metrics.rfv(16)}}
              onPress={() => {
                if (inValidEmail(email)) {
                  showDefaultAlert('Please enter a valid email address');
                  return false;
                } else {
                  saveConctUs();
                }
              }}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <Loader loading={loading} />
    </>
  );
}

const styles = StyleSheet.create({
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
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
  },
  TextInput: {
    backgroundColor: COLORS_NEW.white,
    width: '100%',
    height: Metrics.rfv(50),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: COLORS_NEW.black,
    paddingLeft: Metrics.rfv(15),
  },
  fillInput: {
    backgroundColor: COLORS_NEW.white,
    width: '100%',
    height: Metrics.rfv(180),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    // alignSelf: 'center',
    color: COLORS_NEW.black,
    paddingHorizontal: Metrics.rfv(15),
    paddingTop: Metrics.rfv(15),
    fontFamily: fontConstant.satoshifont,
    fontSize: 16,
    fontweight: '400'
  },
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  mainText: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.black,
    fontFamily: fontConstant.satoshifont,
    fontSize: 16
  },
});
