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
import MyStatusBar from '../../Component/MyStatusBar';
import Metrics from '../../Helper/metrics';
import {useTranslation} from 'react-i18next';

const DATA = [
  {
    id: 1,
    name: 'UAE (AED)',
    image: require('../../../assets/UAE.png'),
  },
  {
    id: 2,
    name: 'KSA (SAR)',
    image: require('../../../assets/KSA.png'),
  },
  {
    id: 3,
    name: 'Kuwait (KWD)',
    image: require('../../../assets/Kuwait.png'),
  },
  {
    id: 4,
    name: 'Bahrain (BHD)',
    image: require('../../../assets/Bahrain.png'),
  },
  {
    id: 5,
    name: 'Quatar (QAR)',
    image: require('../../../assets/Quatar.png'),
  },
  {
    id: 6,
    name: 'Oman (OMR)',
    image: require('../../../assets/Oman.png'),
  },
];
export default function Country({navigation}) {
  const [selectedCountry, setSelectedCountry] = useState('UAE (AED)');
  const {t} = useTranslation();

  const onSelectSwitch = e => {
    setSelectedCountry(e);
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
              transform: I18nManager.isRTL ? [{rotate: '180deg'}] : '',
            }}
            source={require('../../../assets/Back-Arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.navBarText}>{t('Country')}</Text>
        <Image style={styles.navBarImage1} source={''} />
      </View>
      <View style={styles.mainView}>
        {DATA.map((item, index) => {
          return (
            <TouchableOpacity
              style={styles.loginPageComponentView}
              onPress={() => onSelectSwitch(item.name)}>
              <View style={styles.loginPageComponentview1}>
                <View>
                  <Image style={styles.countryLogo} source={item.image} />
                </View>
                <Text style={styles.countryText}>{t(item.name)}</Text>
              </View>
              {selectedCountry === item.name && (
                <View style={styles.loginPageComponentView}>
                  <Image
                    style={styles.countryLogo}
                    source={require('../../../assets/CheckCircle.png')}
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    backgroundColor: '#fff',
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
  },
  loginPageComponentview1: {
    flexDirection: 'row',
    marginTop: Metrics.rfv(10),
    justifyContent: 'space-between',
  },
  loginPageComponentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.rfv(5),
    borderBottomColor: '#EEEDE7',
    borderBottomWidth: Metrics.rfv(1),
  },
  countryLogo: {
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    marginBottom: Metrics.rfv(5),
  },
  countryText: {
    marginTop: Metrics.rfv(2),
    marginLeft: Metrics.rfv(10),
  },
});
