import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql',
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
        alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
        console.log('data', JSON.stringify(data.generateCustomerToken.token));
        resolve(data.generateCustomerToken.token);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
