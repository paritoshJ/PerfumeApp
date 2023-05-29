import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Alert } from 'react-native';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';

export const ADD_CREDIT_CARD_API = async (currentPassword, newPassword) => {
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            store: Constants.StoreCode,
            authorization: Constants.Token,
        }
    });
    console.log('getode')
    try {
        const { data, error } = await client.mutate({
            mutation: gql`
            mutation changeCustomerPassword($currentPassword: String!,$newPassword: String!) {
                changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
                    addresses {
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
                    allow_remote_shopping_assistance
                    compare_list {
                      item_count
                      uid
                    }
                    created_at
                    date_of_birth
                    default_billing
                    default_shipping
                    dob
                    email
                    firstname
                    gender
                    gift_registries {
                      created_at
                      event_name
                      message
                      owner_name
                      privacy_settings
                      status
                      uid
                    }
                   
                  }
                
              }
            ` ,
            variables: {
                currentPassword: currentPassword,
                newPassword: newPassword,
            },
        });
        if (error) {
            console.log('error', JSON.stringify(error));
            return;
        }
        console.log('data', JSON.stringify(data));
        return data;
    } catch (error) {
        console.log('error', JSON.stringify(error));
        return [];
    }
};

export const FORGOT_PASSWORD_API = async (email) => {
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            store: Constants.StoreCode,
            authorization: Constants.Token,
        }
    });
    console.log('getode')
    try {
        const { data, error } = await client.mutate({
            mutation: gql`
            mutation requestPasswordResetEmail($email: String!) {
                requestPasswordResetEmail(email: $email)
            }
        `,
            variables: {
                email: email,
            },
        });
        if (error) {
            console.log('error', JSON.stringify(error));
            return;
        }
        console.log('data', JSON.stringify(data));
        return data;
    } catch (error) {
        console.log('error', JSON.stringify(error));
        return [];
    }
};
export const REQUEST_PASSWORD_RESET_EMAIL = gql`
    mutation requestPasswordResetEmail($email: String!) {
        requestPasswordResetEmail(email: $email)
    }
`;