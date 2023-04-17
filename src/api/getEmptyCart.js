import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';


export const client = new ApolloClient({
    uri: "https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const EMPTY_CART = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation CreateEmptyCart {
        createEmptyCart
    }`});
    if (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
  };
