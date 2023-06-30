import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {Alert} from 'react-native';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
});

export const USER_REGISTER = async (mobile, email, password, name) => {
  console.log(mobile, email, password, name);

  return new Promise(async (resolve, reject) => {
    try {
      const {data, error} = await client.mutate({
        mutation: gql`
          mutation {
            createCustomerCustom(
              input: {
                email: "${email}"
                firstname: "${name}"
                is_subscribed: true
                lastname: " "
                mobile: "${mobile}"
                password: "${password}"
              }
            ) {
              customer {
                created_at
                customer_mobile
                email
                firstname
                is_subscribed

              }
            }
          }
        `,
      });
      if (data) {
        console.warn('data', data?.createCustomerCustom);
        // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
        // console.log('data', JSON.stringify(data.generateCustomerToken.token));
        resolve(data);
      }
    } catch (error) {
      // Alert.alert(error?.message);
      console.log('error', JSON.stringify(error));
      // resolve(null);
      reject(error);
    }

    // if (error) {
    //   alert(`error => ${JSON.stringify(error)}`);
    //   console.log('error', JSON.stringify(error));
    //   return;
    // }
    // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
    // console.log('data', JSON.stringify(data.generateCustomerToken.token));
  });
};
