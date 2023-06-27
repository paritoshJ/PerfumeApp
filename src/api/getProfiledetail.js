import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Alert } from 'react-native';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';



const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
        store: Constants.StoreCode,
        // authorization: "Bearer " + getAuthTokenHeaders(),
        authorization: Constants.Token,
        // authorization: "Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE4MCwidXR5cGlkIjozLCJpYXQiOjE2ODM4MTA0MDAsImV4cCI6MTY4MzgxNDAwMH0.9A4W__M99W5D9r31Rm91Op6zD6vkQ4Y5tgq3TEV_p7c",
    }
});
export const GET_PROFILE_DETAIL = async () => {
    console.log('Enter===>', Constants.StoreCode,);
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            store: Constants.StoreCode,
            // authorization: "Bearer " + getAuthTokenHeaders(),
            authorization: Constants.Token,
            // authorization: "Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE4MCwidXR5cGlkIjozLCJpYXQiOjE2ODM4MTA0MDAsImV4cCI6MTY4MzgxNDAwMH0.9A4W__M99W5D9r31Rm91Op6zD6vkQ4Y5tgq3TEV_p7c",
        }
    });
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await client.query({
                query: gql`
                query {
                    customerExtraData {
                        created_at
                        date_of_birth
                        default_billing
                        default_shipping
                        dob
                        email
                        firstname
                        gender
                        group_id
                        id
                        is_subscribed
                        lastname
                        middlename
                        phone_number
                        prefix
                        profile_picture
                        suffix
                        taxvat
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
                            custom_attributes {
                                attribute_code
                                value
                            }
                        }
                    }
                  }
             `});
            if (data) {
                // alert(`Response: ${JSON.stringify(data)}`);
                console.log('data', JSON.stringify(data));
                resolve(data);
            }
        } catch (error) {
            //   alert(`error => ${JSON.stringify(error)}`);
            console.log('error', JSON.stringify(error));
            reject(error);
        }
    });
};

export const ADD_PROFILE_API = async (firastname, lastname) => {
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            store: Constants.StoreCode,
            // authorization: "Bearer " + getAuthTokenHeaders(),
            authorization: Constants.Token,
            // authorization: "Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE4MCwidXR5cGlkIjozLCJpYXQiOjE2ODM4MTA0MDAsImV4cCI6MTY4MzgxNDAwMH0.9A4W__M99W5D9r31Rm91Op6zD6vkQ4Y5tgq3TEV_p7c",
        }
    });
    console.log('updateprofile', firastname)
    console.log('updateprofile', lastname)
    try {
        const { data, error } = await client.mutate({
            mutation: gql`
            mutation updateCustomer($firstname: String!, $lastname: String!) {
                updateCustomer(input: { firstname: $firstname, lastname: $lastname }) {
                    customer {
                        firstname
                        lastname
                    }
                }
            }
        `,
            variables: {
                firstname: firastname,
                lastname: lastname,
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
export const UPDATE_CUSTOMER_INFO = gql`
    mutation updateCustomer($firstname: String!, $lastname: String!) {
        updateCustomer(input: { firstname: $firstname, lastname: $lastname }) {
            customer {
                firstname
                lastname
            }
        }
    }
`;

export const UPDATE_PROFILE_PICTURE_API = async (avtar_base64_encoded, filename) => {
    console.log('getode')
    try {
        const { data, error } = await client.mutate({
            mutation: UPDATE_IMAGE,
            variables: {
                avtar_base64_encoded: avtar_base64_encoded,
                filename: filename,
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
export const UPDATE_IMAGE = gql`
query AvtarImg($avtar_base64_encoded: FilterMatchTypeInput, $filename: String ) {
    avtarImg(avtar_base64_encoded: $avtar_base64_encoded, filename: $filename) {
        
        
        status
        url
    }
}
`;