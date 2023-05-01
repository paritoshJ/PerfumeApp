/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  I18nManager,
  DeviceEventEmitter,
  SafeAreaView,
} from 'react-native';
import Metrics from '../../Helper/metrics';
import {AccordionList} from 'accordion-collapse-react-native';
import {COLORS_NEW} from '../../Helper/colors.new';
import Modal from 'react-native-modal';
import MyStatusBar from '../../Component/MyStatusBar';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Loader from '../../Component/Loader';
export default function LoadingPage({navigation}) {

  useEffect(() => {
    checkIfTokenExists();
    const Logoutlistner = DeviceEventEmitter.addListener("event.logout",
     (event)=>{
   
   navigation.replace('Login')
   
  });
  return () =>{
    Logoutlistner.remove();
    // console.log()
  }
  }, []);

  const checkIfTokenExists = async () => {
    const tokenVal = await AsyncStorage.getItem('token');
    console.log('tokenVal',tokenVal); 
    if(tokenVal){
      navigation.replace('Profile')
      }else{
        navigation.replace('Login')
      }
    
  };

  return (
    <SafeAreaView style={{flex:1}}>  
        <Loader loading={true}/>
    </SafeAreaView>

  );
}

