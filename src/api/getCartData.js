import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const client = new ApolloClient({
    uri: "https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const CART_DATA = async (cartId) => {
  try {
    // const cartId  = await AsyncStorage.setItem('CART_ID');
  console.log("cart id from api", cartId)

    const { data, error } = await client.mutate({
       mutation: gql`{cart(cart_id: ${cartId}) {
          email
          billing_address {
            city
            country {
              code
              label
            }
            firstname
            lastname
            postcode
            region {
              code
              label
            }
            street
            telephone
          }
          shipping_addresses {
            firstname
            lastname
            street
            city
            region {
              code
              label
            }
            country {
              code
              label
            }
            telephone
            available_shipping_methods {
              amount {
                currency
                value
              }
              available
              carrier_code
              carrier_title
              error_message
              method_code
              method_title
              price_excl_tax {
                value
                currency
              }
              price_incl_tax {
                value
                currency
              }
            }
            selected_shipping_method {
              amount {
                value
                currency
              }
              carrier_code
              carrier_title
              method_code
              method_title
            }
          }
          items {
            id
            product {
              name
              sku
            }
            quantity
            errors {
              code
              message
            }
          }
          available_payment_methods {
            code
            title
          }
          selected_payment_method {
            code
            title
          }
          applied_coupons {
            code
          }
          prices {
            grand_total {
              value
              currency
            }
          }
        }
      }`});
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', error);
    return [];
  }
  
  };
