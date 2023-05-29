import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';
import {getAuthTokenHeaders} from '../Helper/helper';
import {MERGE_CART_DATA} from './getAddToCartData';

export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
    authorization: getAuthTokenHeaders(),
  },
});

export const EMPTY_CART = async () => {
  const {data, error} = await client.mutate({
    mutation: gql`
      mutation CreateEmptyCart {
        createEmptyCart
      }
    `,
  });
  if (error) {
    alert(`error => ${JSON.stringify(error)}`);
    console.log('error', JSON.stringify(error));
    return;
  } else {
    console.log('data', JSON.stringify(data));
    return data;
  }
  // alert(`Response: ${JSON.stringify(data)}`);
  // resolve(!error)
};
