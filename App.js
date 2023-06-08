/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, SafeAreaView, LogBox } from 'react-native';
import React, {useState} from 'react';
import Routes from './src/Routes/index';
import {useTranslation} from 'react-i18next';
import './src/Helper/i18n';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {WebSocketLink} from '@apollo/client/link/ws';

const App = () => {
  const {t, i18n} = useTranslation();
  LogBox.ignoreLogs(['Warning: ...']);

  //Ignore all log notifications
  LogBox.ignoreAllLogs();
  const wsLink = new WebSocketLink({
    uri: `ws://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphq`,
    options: {
      reconnect: true,
    },
  });

  const client = new ApolloClient({
    uri: 'https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphq',
    cache: new InMemoryCache(),
    // link WebSocketLink subscription
    link: wsLink,
  });
  
  const [currentLanguage, setLanguage] = useState('en');

  return (
    <ApolloProvider client={client}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3ECE3'}}>
        <Routes />
      </SafeAreaView>
    </ApolloProvider>
  );
};

export default App;
