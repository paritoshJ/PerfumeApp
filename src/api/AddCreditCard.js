import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Alert } from 'react-native';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';

export const ADD_CREDIT_CARD_API = async (card_cvv, card_holdername, card_number, cart_id, expiry_date) => {
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            authorization: Constants.Token,
        }
    });
    console.log('getode')
    try {
        const { data, error } = await client.mutate({
            mutation: gql`
            mutation SetCardDetail($card_cvv: String!,$card_holdername: String!, $card_number: String!, $cart_id: String!, $expiry_date: String!) {
                SetCardDetail(
                    input:{
                        card_cvv: $card_cvv  ,
                    card_holdername: $card_holdername  ,
                    card_number: $card_number  ,
                     cart_id: $cart_id  ,
                    expiry_date: $expiry_date}){
                   card_deatil {
                              status
                          
                              }
                  }
              }
            ` ,
            variables: {
                card_cvv: card_cvv,
                card_holdername: card_holdername,
                card_number: card_number,
                cart_id: cart_id,
                expiry_date: expiry_date,
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
export const GET_CREDIT_CARD_API = async (cart_id) => {
    console.log('Get Cartid', cart_id)
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            authorization: Constants.Token,
        }
    });
    console.log('getode')
    try {
        const { data, error } = await client.mutate({
            mutation: GET_CREDIT_CARD,
            variables: {
                cart_id: cart_id,
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
export const GET_CREDIT_CARD = gql`
    query GetCardDetail($cart_id: String) {
        GetCardDetail(cart_id: $cart_id) {
            fetchcarddetails {
                card_number
                cardholder_name
                customer_id
                cvv
                expiry_date
            }
        }
    }
`;