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
  PermissionsAndroid,
  Pressable,
  Alert,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import PhoneInput from 'react-native-phone-number-input';
import Modal from 'react-native-modal';
import {COLORS_NEW} from '../../Helper/colors.new';
import {AppButton} from '../../Component/button/app-button';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import {showDefaultAlert} from '../../Helper/helper';
import {chooseFromCamera, openImagePicker} from '../../Helper/ImageHelper';
import ImageModal from '../../modal/ImageModal/ImageModal';
import fontConstant from '../../constant/fontConstant';
import { GET_PROFILE_DETAIL, ADD_PROFILE_API, UPDATE_PROFILE_PICTURE_API } from '../../api/getProfiledetail';
import Loader from '../../Component/Loader';
import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';

export default function PersonalInfo({navigation}) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);
  const [formattedValue, setFormattedValue] = useState('');
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [getProfileData, setProfileDAta] = useState();
  const [getfirstName, SetFirstName] = useState();
  const [getLastName, SetLastname] = useState();
  const [getemailaddress, setEmailAddress] = useState();
  const [getPhonenumber, setPhonenumber] = useState();
  const [getName, setname] = useState('Perfume');

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getProfileDetail();

      return () => { };
    }, []),
  );
  const getProfileDetail = () => {
    GET_PROFILE_DETAIL().then((res) => {
      setLoading(false);
      if (res.customerExtraData.firstname == '') {
        setname('Perfuem')
      } else {
        setname(res.customerExtraData.firstname);
      }
      setProfileDAta(res.customerExtraData)
      SetFirstName(res.customerExtraData?.firstname);
      SetLastname(res.customerExtraData?.lastname);
      setEmailAddress(res.customerExtraData?.email);
      setPhonenumber(res.customerExtraData?.phone_number);
      console.log('GET_WISHLIST_PRODUCTS', res.customerExtraData);
    }).catch((err) => {
      setLoading(false);

      console.log('GET_WISHLIST_ERROR', err);
    })
  }
  const openCamera = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ])
        .then(result => {
          if (
            result['android.permission.CAMERA'] &&
            result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
          ) {
            chooseFromCamera('photo').then(({isPicked, data}) => {
              if (isPicked) {
                console.log(data, '--dat');
                setImage(data);
              }
            });
          }
        })
        .catch(err => {
          console.log(err, '----err');
        });
    } else {
      try {
         chooseFromCamera('photo').then(({isPicked, data}) => {
        if (isPicked) {
          console.log(data, '--data');
          setImage(data);
        }
      });
      } catch (error) {
        // Alert.alert(error)
        console.log(error)
      }
     
    }
  };

  const openGallery = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ])
        .then(result => {
          if (
            result['android.permission.READ_EXTERNAL_STORAGE'] &&
            result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
          ) {
            openImagePicker('photo').then(({isPicked, data}) => {
              if (isPicked) {
                setImage(data);
              }
            });
          }
        })
        .catch(err => {
          console.log(err, '----err');
        });
    } else {
      openImagePicker('photo').then(({isPicked, data}) => {
        console.log('UpdateProfile', new Date().toLocaleString(), data.uri);

        if (isPicked) {
          // const base64 = FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
          // console.log(base64);

          RNFS.readFile(data.uri, 'base64')
            .then(res => {
              UPDATE_PROFILE_PICTURE_API(res, new Date().toLocaleString())
            });


          setImage(data);
        }
      });
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
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
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
            <TouchableOpacity onPress={() => setShowMenu(true)}>
              <Image
                style={styles.avatar}
                  source={{ uri: 'https://eu.ui-avatars.com/api/?name=$' + getName + '&size=250' }}


              />
              <Image
                style={{
                    width: 35,
                    height: 35,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                }}
                source={require('./../../assets/icon/camera_btn.png')}
                PlaceholderContent={<ActivityIndicator />}
              />
            </TouchableOpacity>
          </View>
            <Text style={styles.userName}>{getProfileData?.firstname + ' ' + getLastName}</Text>
          <View>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name"
                value={getfirstName}
              placeholderTextColor="gray"
                onChangeText={(text) => {
                  SetFirstName(text);
                }}

            />
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name"
                value={getLastName}
              placeholderTextColor="gray"
                onChangeText={(text) => {

                  SetLastname(text);
                }}
            />
            <TextInput
              style={styles.TextInput}
              placeholder={t('Email')}
              placeholderTextColor="gray"
                value={getemailaddress}
                onChangeText={(text) => {

                  setEmailAddress(text);
                }}
            />
            <View style={styles.TextInput}>
              <PhoneInput
                  defaultValue={getPhonenumber}
                // defaultCode="DM"
                layout="first"
                onChangeText={text => {
                  setPhonenumber(text);
                }}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
              />
            </View>
            </View>
            <View style={{ marginHorizontal: Metrics.rfv(16) }}>

            </View>
          </View>
        </ScrollView>
        <AppButton
          disabled={false}
          tx={t('Save changes')}
          style={{
            marginTop: Metrics.rfv(16),
            marginBottom: Metrics.rfv(10),
          }}
            onPress={async () => {
              setLoading(true);

              ADD_PROFILE_API(getfirstName, getLastName).then((res) => {
                console.log('GET_WISHLIST_ERROR', res);
                // setLoading(false);
                navigation.goBack();

              }).catch((err) => {
                setLoading(false);

              });
            }}
        />
        <Loader loading={loading} />

      {/* Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.ModalView}>
          <View style={styles.ModalInsideView}>
            <View>
              <Image
                style={styles.ModalImage}
                source={require('./../../assets/icon/del.png')}
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
                borderRadius: Metrics.rfv(25),
                marginTop: Metrics.rfv(16),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),
                borderColor: COLORS_NEW.blue,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.cancelButton}>{t('Cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0,
                backgroundColor: COLORS_NEW.blue,
                width: '45%',
                height: Metrics.rfv(45),
                borderRadius: Metrics.rfv(25),
                marginTop: Metrics.rfv(16),
                alignSelf: 'center',
                marginBottom: Metrics.rfv(15),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.nextButtontext}>{t('Delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showMenu && (
        <Pressable
          onPressIn={() => {
            setShowMenu(!showMenu);
          }}
          onPress={() => {
            console.warn('09');
            setShowMenu(!showMenu);
          }}
          style={styles.modalStyle}>
          <ImageModal
            modalVisible={showMenu}
            setModalVisibility={() => {
              setShowMenu(!showMenu);
            }}
            cancelAction={() => {
              setShowMenu(!showMenu);
            }}
            openCamera={() => {
              setShowMenu(!showMenu);
              openCamera();
            }}
            openGallery={() => {
              setShowMenu(!showMenu);
              openGallery();
            }}
          />
        </Pressable>
      )}
      </View>
    </KeyboardAwareView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
    paddingBottom: '20%',
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
    borderRadius: Metrics.rfv(50),
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
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.blue,
    fontSize: 16,
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
    fontFamily: fontConstant.gambetta,
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
  modalStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
  },
});
