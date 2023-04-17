import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';


export const client = new ApolloClient({
    uri: "http://integration2-hohc4oi-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const BILLING_ADDRESS = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation {
        setBillingAddressOnCart(
          input: {
            cart_id: "2U1u9wHHOFNR3UAnBWMTznJfyKA74ZIc"
            billing_address: {
              address: {
                firstname: "Developer"
                lastname: "Test"
                company: "Developer Test Company"
                country_code: "IN"
                city: "Ahmedabad"
                street: ["Ahmedabad"]
                region: "GJ"
                postcode: "380015"
                telephone: "0123456789"
                save_in_address_book: false
              }
              same_as_shipping: false
            }
          }
        ) {
          cart {
            billing_address {
              firstname
              lastname
              company
              country {
                label
                code
              }
              city
              street
              region {
                label
                code
              }
              postcode
              telephone
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
