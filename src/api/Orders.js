import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Alert } from 'react-native';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
export const GET_ORERS_API = async () => {
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
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await client.mutate({
                mutation: GET_ORDERS_CARD,
            });
            if (data) {
                resolve(data);
            }
        } catch (error) {
            // alert(`error => ${JSON.stringify(error)}`);
            console.log('error', JSON.stringify(error));
            reject(error);
        }
    });
};
export const GET_ORDERS_CARD = gql`
query SalesOrder {
    salesOrder {
        salesData {
            created_at
            customer_name
            grand_total
            increment_id
            is_guest_customer
            shipping_method
            billing {
                city
                company
                country
                fax
                name
                postcode
                region
                street
                telephone
            }
            items {
                display_category
                display_gender
                display_size
                image_url
                price
                sku
                title
            }
            shipping {
                city
                company
                country
                fax
                name
                postcode
                region
                street
                telephone
            }
        }
    }
}

`;