import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import colorConstant from '../constant/colorConstant';
const COLORS = [colorConstant.PRIMARY, colorConstant.CARD_COLOR];

export const isEmpty = str => {
  if (str == null || str.trim() == '') {
    return true;
  } else {
    return false;
  }
};

export const inValidEmail = str => {
  let email_regex =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (!email_regex.test(str)) {
    return true;
  } else {
    return false;
  }
};

export const inValidPassword = str => {
  // let pass_regex = /^[@#](?=.{7,13}$)(?=\w{7,13})(?=.*[A-Z])(?=.*\d)/;
  // let pass_regex = /^(?=.*[A-Z])(?=.*\d)/;
  // let pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  let pass_regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!pass_regex.test(str)) {
    return true;
  } else {
    return false;
  }
};

export const isNotPasswordSame = (pass, repass) => {
  if (pass !== repass) {
    return true;
  } else {
    return false;
  }
};

export const inValidPhoneNumber = str => {
  if (str.length < 10 || str.length > 12) {
    return true;
  } else {
    return false;
  }
};

export const showDefaultAlert = (message, title = '', action = null) => {
  Alert.alert(title, message, action);
};
export const  getRandomColor = () => {
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[colorIndex];
  }
export const openURLs = Url => {
  Linking.openURL(Url).catch(err => console.error('Error', err));
};

export function isStringNotNull(key) {
  return key !== undefined && key != null && key !== '';
}

export function isArrayNullOrEmpty(array) {
  return array == null || array === undefined || array.length === 0;
}

export function isObjectNullOrUndefined(obj) {
  return (
    obj == null ||
    obj === undefined ||
    obj === 'null' ||
    Object.keys(obj).length === 0
  );
}