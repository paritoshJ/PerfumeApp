import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';


export const client = new ApolloClient({
    uri: "http://integration2-hohc4oi-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql",
    cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
  });

export const SHIPPING_ADDRESS = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation {
        setShippingAddressesOnCart(
          input: {
            cart_id: "{ CART_ID }"
            shipping_addresses: [
              {
                address: {
                  firstname: "John"
                  lastname: "Doe"
                  company: "Company Name"
                  street: ["3320 N Crescent Dr", "Beverly Hills"]
                  city: "Los Angeles"
                  region: "CA"
                  region_id: 12
                  postcode: "90210"
                  country_code: "US"
                  telephone: "123-456-0000"
                  save_in_address_book: false
                }
              }
            ]
          }
        ) {
          cart {
            shipping_addresses {
              firstname
              lastname
              company
              street
              city
              region {
                code
                label
              }
              postcode
              telephone
              country {
                code
                label
              }
              available_shipping_methods{
                carrier_code
                carrier_title
                method_code
                method_title
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
