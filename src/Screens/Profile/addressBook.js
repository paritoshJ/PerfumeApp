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
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import PhoneInput from 'react-native-phone-number-input';
import Input from '../../Component/Input';
import CustomSwitch from '../../Component/toggleSwitch';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next'

export default function AddressBook({navigation}) {
  const [open, setOpen] = useState(false);
  const [inputDetail, setinputDetail] = useState();
  const [value, setValue] = useState('');
  const { t } = useTranslation()

  const onSelectSwitch = index => {
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
              transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.navBarText}>{t('ADDRESS BOOK')}</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      {open ? (
        <View style={styles.mainView}>
          <Image
            style={styles.emptyCartImage}
            source={require('../../../assets/address-book-color.png')}
          />
          <Text style={styles.text1}>You don't have address yet</Text>
          <Text style={styles.text2}>
            Add a address for further quick purchases
          </Text>
          <AppButton
            preset="primary"
            text="Save address"
            style={{marginTop: Metrics.rfv(16)}}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {/* Toggle Switch */}
          <View style={{alignItems: 'center', margin: 20}}>
            <CustomSwitch
              selectionMode={2}
              roundCorner={true}
              option1={t('Fill in inputs')}
              option2={t('Click on the map')}
              onSelectSwitch={onSelectSwitch}
              selectionColor={COLORS_NEW.blue}
            />
          </View>
          {/* Input Fields */}
          <Text style={styles.addressHeading}>{t('Main information')}</Text>
          <View>
            <Input
              placeholder={t("Name")}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
            <Input
              placeholder={t("Surname")}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
            <View style={styles.TextInput}>
              <PhoneInput
                defaultValue={value}
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
              />
            </View>
            <Input
              placeholder={t('Zip code (optional)')}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
            <Input
              placeholder={t("Country")}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
            <Input
              placeholder={t("City")}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
          </View>
          <Text style={styles.addressHeading}>{t('Delivery address')}</Text>
          <View>
            <Input
              placeholder={t("Enter the address or select it on the map")}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
            <Input
              placeholder={t("Building name/floor number/flat number")}
              placeholderTextColor="gray"
              value={inputDetail}
              onChangeText={e => setinputDetail(e)}
            />
          </View>
          <View style={{marginBottom: Metrics.rfv(10)}}>
            <AppButton tx={t("Save address")} style={{marginTop: Metrics.rfv(16)}} />
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyCartImage: {
    height: Metrics.rfv(80),
    width: Metrics.rfv(80),
    resizeMode: 'contain',
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
  TextInput: {
    backgroundColor: COLORS_NEW.white,
    width: '100%',
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    color: COLORS_NEW.lightGray,
  },
  addressHeading: {
    fontSize: Metrics.rfv(18),
    marginVertical: Metrics.rfv(5),
    color: COLORS_NEW.black,
  },
});
