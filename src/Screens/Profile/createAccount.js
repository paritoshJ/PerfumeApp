import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Metrics from '../../Helper/metrics';
import Input from '../../Component/Input';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import {useQuery} from '@apollo/client';
import {USER_REGISTER} from '../../api/useCreateCustomer';

export default function CreateAccount({navigation}) {
  const [isSelected, setSelection] = useState(false);
  const [name, setName] = useState('');
  const [inputDetail, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [buttonValue, setButtonValue] = useState('Next');

  const showPasswordField = () => {
    if (isNaN(inputDetail)) {
      return (
        <Input
          placeholder="Password"
          placeholderTextColor="gray"
          onChangeText={e => setPassword(e)}
        />
      );
    }
  };

  useEffect(() => {
    if (isNaN(inputDetail)) {
      setButtonValue('Create');
    } else {
      setButtonValue('Next');
    }
  }, [inputDetail]);

  
  const handleRegister = async () => {
    if ( buttonValue === 'Next') {
      navigation.navigate('EnterTheCode')
    } else {
      const [{loading, error, data}] =  useQuery(USER_REGISTER(inputDetail, password, name));
      console.log("adfsdgfhjhtgre",data.generateCustomerToken.token)
      await AsyncStorage.setItem('token', data.generateCustomerToken.token);
      navigation.navigate('Profile')
    }
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

        <Text style={styles.navBarText}>CREATE ACCOUNT</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView style={styles.ScrollView}>
        <View style={styles.mainView}>
          <Input
            placeholder="Name"
            placeholderTextColor="gray"
            onChangeText={e => setName(e)}
          />
          <Input
            placeholder="Email Or Number"
            placeholderTextColor="gray"
            onChangeText={e => setInput(e)}
          />
          {showPasswordField()}
          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <CheckBox value={isSelected} onValueChange={setSelection} />
            </View>
            <Text style={styles.label}>
              I agree to the processing of my personal data
            </Text>
          </View>

          <AppButton
            disabled={inputDetail === '' && name === '' ? true : false}
            tx={buttonValue}
            style={{marginTop: Metrics.rfv(16)}}
            onPress={() => handleRegister()}
          />
          {/* <TouchableOpacity
            onPress={() =>
              buttonValue === 'Next' && navigation.navigate('EnterTheCode')
            }
            style={{
              flex: 0,
              backgroundColor: '#BC8B57',
              width: 270,
              height: 45,
              borderRadius: 20,
              marginTop: 16,
              alignSelf: 'center',
              marginBottom: 15,
              opacity: inputDetail === '' && name === '' ? 0.5 : 1,
            }}
            disabled={inputDetail === '' && name === '' ? true : false}>
            <Text style={styles.nextButtontext}>{buttonValue}</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAwareScrollView>
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
    justifyContent: 'space-between',
  },
  TextInput: {
    backgroundColor: COLORS_NEW.white,
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    borderColor: COLORS_NEW.lightGray,
    borderWidth: 1,
    marginTop: 16,
    alignSelf: 'center',
    color: COLORS_NEW.black,
    paddingLeft: Metrics.rfv(15),
  },
  NextButton: {
    flex: 0,
    backgroundColor: '#BC8B57',
    width: Metrics.rfv(270),
    height: Metrics.rfv(45),
    borderRadius: Metrics.rfv(20),
    marginTop: Metrics.rfv(16),
    alignSelf: 'center',
    marginBottom: Metrics.rfv(15),
  },
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: Metrics.rfv(20),
    marginTop: Metrics.rfv(10),
    resizeMode: 'contain',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: Metrics.rfv(8),
    fontSize: Metrics.rfv(12),
    color: COLORS_NEW.black,
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
  },
  navBarText: {
    fontSize: Metrics.rfv(15),
    color: COLORS_NEW.black,
  },
});
