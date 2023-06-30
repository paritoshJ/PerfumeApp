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

export const MERGE_CART = async (source_cart_id, destination_cart_id) => {
  const token = await getAuthTokenHeaders();

  const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
      store: Constants.StoreCode,
      authorization: token,
    },
  });
  const {data, error} = await client.mutate({
    mutation: MERGE_CART_DATA,
    variables: {
      source_cart_id: source_cart_id,
      destination_cart_id: destination_cart_id,
    },
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
