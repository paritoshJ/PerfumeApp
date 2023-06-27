import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://integration2-hohc4oi-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
});

export const ADD_ITEM_TO_CART = async () => {
  const {data, error} = await client.mutate({
    mutation: gql`
      mutation {
        addSimpleProductsToCart(
          input: {
            cart_id: "MaehFmL3WmwJu4bsVAl3eM4DqM4lMBu0"
            cart_items: [{data: {quantity: 2, sku: "6293708416080"}}]
          }
        ) {
          cart {
            items {
              id
              product {
                sku
                stock_status
              }
              quantity
            }
          }
        }
      }
    `,
  });
  if (error) {
    alert(`error => ${JSON.stringify(error)}`);
    console.log('error', JSON.stringify(error));
    return;
  }
  alert(`Response: ${JSON.stringify(data)}`);
  console.log('data', JSON.stringify(data));
};
