import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {Alert} from 'react-native';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const USER_LOGIN = async (email, password) => {
  console.log(email, password, '::: data ....');
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
          mutation generateCustomerToken($email: String!, $password: String!) {
            generateCustomerToken(email: $email, password: $password) {
              token
            }
          }
        `,
        variables: {
          email: email,
          password: password,
        },
      });
      if (data) {
        // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
        console.log('data', JSON.stringify(data.generateCustomerToken.token));
        resolve(data?.generateCustomerToken?.token);
      }
    } catch (error) {
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};

export const USER_LOGIN_MOBILE = async (mobile, password, websiteId) => {
  // console.log(mobile, password, '::: data ....');

  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
          mutation createCustomerTokenWithOtpPassword(
            $mobile: String!
            $password: String!
            $websiteId: Int!
          ) {
            createCustomerTokenWithOtpPassword(
              mobile: $mobile
              password: $password
              websiteId: $websiteId
            ) {
              message
              token
            }
          }
        `,
        variables: {
          mobile: mobile,
          password: password,
          websiteId: websiteId,
        },
      });
      if (data) {
        // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
        console.log('data', JSON.stringify(data));
        resolve(data?.createCustomerTokenWithOtpPassword);
      } else {
        Alert.alert(error?.message);
        console.log('error', JSON.stringify(error));
      }
    } catch (error) {
      Alert.alert(error?.message);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
