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
export const getRandomColor = () => {
  const colorIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[colorIndex];
};
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

export function removeHtmlTags(data) {
  const regex = /(<([^>]+)>)/gi;
  if (data) {
    const result = data?.replace(regex, '').trim();
    return result;
  } else {
    return '';
  }
}
export const getAuthTokenHeaders = async () => {
  const token = await AsyncStorage.getItem('token');
  console.log('token', token);
  if (isStringNotNull(token)) {
    return 'Bearer ' + token;
  }
  return '';
};

export const getInitials = string => {
  var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  } else {
    initials = names[0].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const findDaysDiffrent = fromDate => {
  let CreatedDate = new Date(fromDate);
  let today = new Date();
  let requiredDiffrentDays;

  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((CreatedDate - today) / oneDay));

  if (diffDays >= 360) {
    requiredDiffrentDays =
      Math.floor(diffDays / 360) == 1
        ? `${Math.floor(diffDays / 365)} year ago`
        : `${Math.floor(diffDays / 365)} years ago`;
  } else if (diffDays >= 30) {
    requiredDiffrentDays =
      Math.floor(diffDays / 30) == 1
        ? `${Math.floor(diffDays / 30)} month ago`
        : `${Math.floor(diffDays / 30)} months ago`;
  } else if (diffDays < 30) {
    requiredDiffrentDays =
      diffDays == 1 || diffDays == 0
        ? `${diffDays} day ago`
        : `${diffDays} days ago`;
  }

  return requiredDiffrentDays;
};
