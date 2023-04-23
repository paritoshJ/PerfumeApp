import AsyncStorage from '@react-native-async-storage/async-storage';

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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
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