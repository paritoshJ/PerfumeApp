import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
  });

export const CUSTOMER_ADDRESS = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation {
        setGuestEmailOnCart(input: {
          cart_id: "{ CART_ID }"
          email: "guest@example.com"
        }) {
          cart {
            email
          }
        }
      }`});
    if (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
  };
