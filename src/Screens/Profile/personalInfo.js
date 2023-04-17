/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Switch,
  ActivityIndicator,
  TextInput,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';

export default function PersonalInfo({navigation}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [formattedValue, setFormattedValue] = useState('');
  const [value, setValue] = useState('');
  const { t } = useTranslation();

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

        <Text style={styles.navBarText}>{t('Personal information')}</Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image
            style={styles.navBarImage1}
            source={require('../../../assets/Delete-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Profile Information */}
        <View style={styles.profileInfoView}>
          <View style={styles.loginPageComponentview1}>
            <TouchableOpacity>
              <Image
                style={styles.avatar}
                source={require('../../../assets/Avatar.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Nathalie</Text>
          <View>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
              placeholderTextColor="gray"
            />
            <TextInput
              style={styles.TextInput}
              placeholder={t('Email')}
              placeholderTextColor="gray"
            />
            <View style={styles.TextInput}>
              <PhoneInput
                defaultValue={value}
                // defaultCode="DM"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
              />
            </View>
          </View>
        </View>
        <AppButton
          preset="primary"
          text={t('Save changes')}
          style={{marginTop: Metrics.rfv(16)}}
        />
      </ScrollView>
      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.ModalView}>
          <View style={styles.ModalInsideView}>
            <View>
              <Image
                style={styles.ModalImage}
                source={require('../../../assets/Delete-icon.png')}
              />
            </View>
            <Text style={styles.text1}>{t('Delete account')}</Text>
            <Text style={styles.text2}>
              {t('Once deleted, the account cannot be recovered')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: Metrics.rfv(20),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={handleModal}
              style={{
                flex: 0,
                backgroundColor: COLORS_NEW.white,
                width: '45%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(20),
                marginTop: Metrics.rfv(16),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),
                borderColor: COLORS_NEW.blue,
                borderWidth: 1,
              }}>
              <Text style={styles.cancelButton}>{t('Cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0,
                backgroundColor: COLORS_NEW.blue,
                width: '45%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(200),
                marginTop: Metrics.rfv(16),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),
              }}>
              <Text style={styles.nextButtontext}>{t('Delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  avatar: {
    height: Metrics.rfv(100),
    width: Metrics.rfv(100),
  },
  pencilIcon: {
    width: Metrics.rfv(20),
    height: Metrics.rfv(20),
    marginTop: Metrics.rfv(25),
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loginPageComponentview2: {
    marginLeft: Metrics.rfv(15),
    marginTop: Metrics.rfv(1),
    color: 'black',
  },
  profileInfoView: {
    marginTop: Metrics.rfv(30),
  },
  TextInput: {
    backgroundColor: COLORS_NEW.white,
    width: '100%',
    height: Metrics.rfv(50),
    borderRadius: Metrics.rfv(200),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: 16,
    alignSelf: 'center',
    color: COLORS_NEW.black,
    paddingLeft: Metrics.rfv(15),
  },
  ModalView: {
    backgroundColor: COLORS_NEW.white,
    height: '35%',
    borderRadius: 20,
  },
  ModalInsideView: {
    flex: 1,
    padding: Metrics.rfv(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  cancelButton: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.blue,
  },
  ModalImage: {
    height: Metrics.rfv(30),
    width: Metrics.rfv(30),
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
  userName: {
    fontSize: Metrics.rfv(20),
    color: COLORS_NEW.black,
    textAlign: 'center',
    marginTop: Metrics.rfv(10),
  },
});
