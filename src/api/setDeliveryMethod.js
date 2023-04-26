import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const SET_DELIVERY_METHOD = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation {
        setShippingMethodsOnCart(
          input: {
            cart_id: "De1824WWUtq5jBHUVr8BfihUzCESYL6R"
            shipping_methods: [
              {
                carrier_code: "mageworxpickup"
                method_code: "mageworxpickup"
              }
            ]
          }
        ){
          cart{
            shipping_addresses{
              selected_shipping_method{
                carrier_code
                carrier_title
                method_code
                method_title
                amount{
                  value
                  currency
                }
              }
            }
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
