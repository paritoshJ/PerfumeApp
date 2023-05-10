import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../Comman/Constants';
import {getAuthTokenHeaders} from '../Helper/helper';
import {
  PLACE_ORDER,
  SET_BILLING_ADDRESS_ON_CART,
  SET_PAYMENT_METHOD_ON_CART,
  SET_SHIPPING_ADDRESS_ON_CART,
  SET_SHIPPING_METHOD_ON_CART,
} from './Checout_mutation';
import alertMsgConstant from '../constant/alertMsgConstant';
import {Alert} from 'react-native';
export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    authorization: getAuthTokenHeaders(),
  },
});

export const SET_DELIVERY_CHECKOUT_METHOD = async shipping_methods => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: SET_SHIPPING_METHOD_ON_CART,
      variables: {
        cart_id: cartId,
        shipping_methods: [shipping_methods],
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

export const SAVE_PAYMENT_METHOD = async payment_method => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: SET_PAYMENT_METHOD_ON_CART,
      variables: {
        cart_id: cartId,
        payment_method: payment_method,
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

export const CONFIRM_PAYMENT_METHOD = async () => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: PLACE_ORDER,
      variables: {
        cart_id: cartId,
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
    // Alert.alert(error.message)
    return [];
  }
};
