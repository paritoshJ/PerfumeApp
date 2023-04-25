import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const CUSTOMER_ADDRESS = async () => {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation CreateCustomerAddress {
        createCustomerAddress(input: null) {
            city
            company
            country_code
            country_id
            customer_id
            default_billing
            default_shipping
            fax
            firstname
            id
            lastname
            middlename
            postcode
            prefix
            region_id
            street
            suffix
            telephone
            vat_id
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
