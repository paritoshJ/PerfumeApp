import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';


export const client = new ApolloClient({
    uri: "http://localcloudajmalmagento.com/graphql",
    cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
  });

export const REMOVE_ITEM_FROM_CART = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`mutation {
        removeItemFromCart(
          input: {
            cart_id: "IeTUiU0oCXjm0uRqGCOuhQ2AuQatogjG",
            cart_item_id: 14
          }
        )
       {
        cart {
          items {
            id
            product {
              name
            }
            quantity
          }
          prices {
            grand_total{
              value
              currency
            }
          }
        }
       }
      }
      `});
    if (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
  };
