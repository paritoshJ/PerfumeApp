import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
import { SET_BILLING_ADDRESS_ON_CART, SET_SHIPPING_ADDRESS_ON_CART } from './Checout_mutation';
export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers:{
      authorization: getAuthTokenHeaders(),
    }
  });


  export const SAVE_SHIPPING_ADDRESS= async (shipping_addresses) => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: SET_SHIPPING_ADDRESS_ON_CART,
      variables: {
        cart_id: cartId,
        shipping_addresses: shipping_addresses,
      },
    });
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return [];
  }
};


 export const SAVE_BILLING_ADDRESS= async (billing_address) => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: SET_BILLING_ADDRESS_ON_CART,
      variables: {
        cart_id: cartId,
        billing_address: billing_address,
      },
    });
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return [];
  }
};