import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Alert } from 'react-native';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
export const GET_COUNTAC_US_API = async () => {
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
            query{
                storeConfig {
                store_phone
                store_landline_phone
                support_email
                store_enable
                store_icon
                country
                office_name
                region
                postcode
                city
                street_line1
                street_line2
                }
              }
            ` ,

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

export const UPDATE_COUNTAC_US_API = async (comment, email, name, telephone) => {
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
            mutation contactUs($comment:String!,$email:String!,$name:String!,$telephone:String!){
                contactUs(input: { comment: $comment, email: $email, name: $name,telephone:$telephone }) {
                  status
                }
              }
            ` ,
            variables: {
                comment: comment,
                email: email,
                name: name,
                telephone: telephone
            }

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

export const OUR_STORES_GET__API = async () => {
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
            query StorePickUpData {
                StorePickUpData {
                    allStoreLocation {
                        address
                        apply_by_cron
                        assign_type
                        city
                        code
                        country
                        country_id
                        description
                        email
                        facebook
                        image_path
                        instagram
                        is_active
                        is_pickup_available
                        latitude
                        longitude
                        name
                        open_now
                        order
                        phone_number
                        postcode
                        prepared_data_for_customer
                        region
                        skype
                        store_ids
                        website_url
                        whatsapp
                        working_hours
                        working_hours_info
                        working_hours_type
                    }
                }
            }
            
            
            ` ,
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