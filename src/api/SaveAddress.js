import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
import { SET_BILLING_ADDRESS_ON_CART, SET_GUEST_EMAIL_ON_CART, SET_SHIPPING_ADDRESS_ON_CART } from './Checout_mutation';
export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers:{
      store: Constants.StoreCode,
      authorization: Constants.Token,
    }
  });


  export const SAVE_SHIPPING_ADDRESS= async (shipping_addresses) => {
    console.log(shipping_addresses)
    console.log(AsyncStorage.getItem('CART_ID'))
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

export const GET_REGION_COUNTRY = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client.mutate({
        mutation: gql` query {
      countries {
        id
        full_name_locale
        available_regions {
          id
          name
          code
        }
      }
    }`});
      if (data) {
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};

export const GET_ADDRESS_LIST = async () => {
  const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
      store: Constants.StoreCode,
      authorization: Constants.Token,
    }
  });

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client.mutate({
        mutation: gql` 
        query {
          customer {
            firstname
            lastname
            suffix
            email
            addresses {
              firstname
              lastname
              street
              id
              city
              country_id
              region {
                region_code
                region
                region_id
              }
              postcode
              country_code
              telephone
            }
          }
        }
        `});
      if (data) {

        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
export const DELETE_ADDRESS = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client.mutate({
        mutation: gql` 
        mutation deleteCustomerAddress($id:Int!){
          deleteCustomerAddress(id: $id)
        }
        `, variables: {
          id: id
        }
      });
      if (data) {
        console.log('data', JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
export const SAVE_BOOK_ADDRESS = async (region, country_code, street, telephone, postcode, city, firstname, lastname, default_shipping, default_billing, country_id) => {
  return new Promise(async (resolve, reject) => {
    console.log('enter value', region, country_code, street, telephone, postcode, city, firstname, lastname, default_shipping, default_billing, country_id)
    try {
      let { data } = await client.mutate({
        mutation: gql` 
        mutation createCustomerAddress(
          $region:CustomerAddressRegionInput!, 
          $country_code:CountryCodeEnum!, 
          $street:[String]!,
          $telephone:String!,
          $postcode:String!, 
          $city:String!, 
          $firstname:String!, 
          $lastname:String!, 
          $default_shipping: Boolean!, 
          $default_billing: Boolean!,
          $country_id:CountryCodeEnum!) {
          createCustomerAddress(
              input: {
              region:$region,
              country_code: $country_code,
              street: $street,
              telephone: $telephone,
              postcode:$postcode,
              city:$city,
              firstname: $firstname,
              lastname: $lastname,
              default_shipping: $default_shipping,
              default_billing: $default_billing,
              country_id:$country_id
            }
          ){
            id
            region{
              region
              region_code
            }
            country_code
            street
            telephone
            postcode
            city
            firstname
            lastname
            default_shipping
            default_billing
          }
        }
        `,
        variables: {
          region: region,
          country_code: country_code,
          street: street,
          telephone: telephone,
          postcode: postcode,
          city: city,
          firstname: firstname,
          lastname: lastname,
          default_shipping: default_shipping,
          default_billing: default_billing,
          country_id: country_id
        }
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
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

 export const SAVE_GUEST_EMAIL= async (email) => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: SET_GUEST_EMAIL_ON_CART,
      variables: {
        cart_id: cartId,
        email: email,
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