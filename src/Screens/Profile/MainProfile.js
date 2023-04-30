import { View, Text } from 'react-native'
import React,{useState,useEffect} from 'react'
import LoginPage from './LoginPage';
import ProfilePage from './profilePage';

const MainProfile = () => {

    const [token, setToken] = useState('');

  useEffect(() => {
    checkIfTokenExists();
  }, [token]);

  const checkIfTokenExists = async () => {
    const tokenVal = await AsyncStorage.getItem('token');
    console.log("tok",tokenVal);
    setToken(tokenVal);
  };
  return !token ? <LoginPage/> : <ProfilePage/>
  
}

export default MainProfile