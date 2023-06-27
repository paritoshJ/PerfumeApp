/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  Share,
  TouchableOpacity,
  ImageBackground,
  I18nManager,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {Avatar, Button, Card} from 'react-native-paper';
import {AppButton} from '../../Component/button/app-button';
import {COLORS_NEW} from '../../Helper/colors.new';
import MyStatusBar from '../../Component/MyStatusBar';
import { useTranslation } from 'react-i18next';
import Constants from '../../Comman/Constants';

  export default function ReferFriend({navigation}) {
  const { t } = useTranslation();

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share This App',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;
  return (
    <>
      <MyStatusBar backgroundColor={'rgba(255, 255, 255, 1)'} />
      <ImageBackground
        source={require('../../../assets/refer-image.png')}
        resizeMode="stretch"
        style={styles.img}>
        <View style={styles.navBarView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                width: Metrics.rfv(15),
                height: Metrics.rfv(15),
                 resizeMode: 'contain',
                transform: I18nManager.isRTL ? [{ rotate: '180deg' }] : '',
              }}
              source={require('../../../assets/back-white.png')}
            />
          </TouchableOpacity>

          <Text style={styles.navBarText}>{Constants.Laungagues.refer_a_friend == null ? 'REFER A FRIEND' : Constants.Laungagues.refer_a_friend}</Text>
          <TouchableOpacity>
            <Image style={styles.navBarImage1} source={''} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: Metrics.rfv(20),
            alignItems: 'center',
            justifyContent: 'center',
            top: 20,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </ImageBackground>
      <View style={styles.cardView}>
        <Card>
          <View style={styles.cardTextView}>
            <Text style={styles.text1}>
              {Constants.Laungagues.we_value_friendship_at_exactly_20 == null ? 'We value friendship. At exactly € 20' : Constants.Laungagues.we_value_friendship_at_exactly_20}
            </Text>
            <Text style={styles.text2}>
              Refer your friends to us, and they’ll each get € 20. On top of
              that, we’ll give you € 20 for each friend that books their first
              flight through.
            </Text>
          </View>
        </Card>
        <AppButton
          preset="primary"
          text={Constants.Laungagues.send_an_invitation == null ? 'Send an invitation' : Constants.Laungagues.send_an_invitation}
          style={{marginTop: Metrics.rfv(20)}}
          onPress={onShare}
          textStyle={{fontSize: Metrics.rfv(15), fontWeight: '400'}}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  navBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.rfv(15),
    padding: Metrics.rfv(10),
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
    marginTop: Metrics.rfv(60),
    fontSize: Metrics.rfv(25),
    color: COLORS_NEW.white,
    fontFamily: 'Gambetta-BoldItalic',
  },
  cardView: {
    paddingVertical: Metrics.rfv(20),
    flex: 1,
    backgroundColor: COLORS_NEW.white,
    paddingHorizontal: Metrics.rfv(20),
    justifyContent: 'space-between',
  },
  cardTextView: {
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginTop: Metrics.rfv(20),
  },
  text1: {
    fontSize: Metrics.rfv(20),
    marginHorizontal: Metrics.rfv(20),
    color: COLORS_NEW.black,
  },
  text2: {
    fontSize: Metrics.rfv(16),
    marginHorizontal: Metrics.rfv(20),
    marginVertical: Metrics.rfv(20),
    color: COLORS_NEW.black,
    fontWeight: '100',
  },
  nextButtontext: {
    flex: 1,
    padding: Metrics.rfv(12),
    textAlign: 'center',
    color: COLORS_NEW.white,
  },
  img: {
    height: Metrics.rfv(140),
    width: '100%',
    marginBottom: Metrics.rfv(40),
  },
});
