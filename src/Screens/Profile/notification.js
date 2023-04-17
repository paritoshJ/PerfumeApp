import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';


export default function Notification({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { t } = useTranslation();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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

        <Text style={styles.navBarText}>NOTIFICATION</Text>
        <TouchableOpacity>
          <Image style={styles.navBarImage1} source={''} />
        </TouchableOpacity>
      </View>
      <View style={styles.mainView}>
        <TouchableOpacity style={styles.loginPageComponentView}>
          <View style={styles.loginPageComponentview1}>
            <View>
              <Text style={styles.notificationText}>{t('Discount and sales')}</Text>
            </View>
            <View>
              <Switch
                trackColor={{false: '#767577', true: '#DFC8AF'}}
                thumbColor="white"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginPageComponentView}>
          <View style={styles.loginPageComponentview1}>
            <View>
              <Text style={styles.notificationText}>{t('Your exclusives')}</Text>
            </View>
            <Switch
              trackColor={{false: '#767577', true: '#DFC8AF'}}
              thumbColor="white"
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginPageComponentView}>
          <View style={styles.loginPageComponentview1}>
            <View>
              <Text style={styles.notificationText}>{t('Stock notifications')}</Text>
            </View>
            <View>
              <Switch
                trackColor={{false: '#767577', true: '#DFC8AF'}}
                thumbColor="white"
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: COLORS_NEW.white,
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
  loginPageComponentview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginPageComponentView: {
    borderBottomColor: COLORS_NEW.lightGray,
    borderBottomWidth: Metrics.rfv(1),
    paddingVertical: Metrics.rfv(15),
    marginHorizontal: Metrics.rfv(15),
  },
  countryLogo: {
    width: Metrics.rfv(25),
    height: Metrics.rfv(25),
    marginBottom: Metrics.rfv(5),
  },
  notificationText: {
    marginTop: Metrics.rfv(2),
    marginLeft: Metrics.rfv(10),
    fontSize: 15,
    color: COLORS_NEW.black,
  },
});
