import { gql } from "@apollo/client";

import {ApolloClient, createHttpLink,InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
import { setContext } from '@apollo/client/link/context';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

  const httpLink = createHttpLink({
  uri: Constants.BASE_GRAPH_QL,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAuthTokenHeaders();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,

      authorization: token ? `${token}`: "",
    }
  }
});

export const GET_COUNTRY_LIST = (token) => {
    console.log('token', token);
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });
  return new Promise(async (resolve, reject) => {
     try {
      let {data} = await client.query({
          query: GET_COUNTRIES,
      });
         if (data) {
             // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
             console.log('data', JSON.stringify(data));
             resolve(data);
         }
     } catch (error) {
         //   alert(`error => ${JSON.stringify(error)}`);
         console.log('error', `${JSON.stringify(error)}`);
         reject(error);
     }
  });
};

export const GET_COUNTRIES = gql`
    query {
        countries {
            id
            two_letter_abbreviation
            three_letter_abbreviation
            full_name_locale
            full_name_english
            available_regions {
                id
                code
                name
            }
        }
    }
`;

export const GET_REGION_BY_COUNTRY = gql`
    query Country($id: String!) {
        country(id: $id) {
            full_name_english
            full_name_locale
            id
            available_regions {
                code
                id
                name
            }
        }
    }
`;

export const GET_COUNTRY_API = (token) => {
    console.log('token', token);
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await client.query({
                query: gql`
                query {
                    allStoreConfigData {
                        store_code
                       store_group_code
                       store_group_name
                       store_name
                       store_sort_order
                       timezone
                       use_store_in_url
                       website_code
                       website_id
                       website_name
                       is_default_store
                       store_group_code
                       is_default_store_group
                       locale
                       base_currency_code
                       default_display_currency_code
                       timezone
                       weight_unit
                       base_url
                       base_link_url
                       copyright
                       logo_alt 
                       base_static_url
                       base_media_url
                       secure_base_url
                       secure_base_link_url
                       secure_base_static_url
                       secure_base_media_url
                     }
                  }
                `,
            });
            if (data) {
                // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
                console.log('data', JSON.stringify(data));
                resolve(data);
            }
        } catch (error) {
            //   alert(`error => ${JSON.stringify(error)}`);
            console.log('error', `${JSON.stringify(error)}`);
            reject(error);
        }
    });
};

export const GET_TRANSLATION_JSON = (token) => {
    console.log('token', token);
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
        connectToDevTools: true,
    });
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await client.query({
                query: gql`
          query AllTranslationsData {
            AllTranslationsData {
                Translations
            }
        }`,
            });
            if (data) {
                // alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
                resolve(data);
            }
        } catch (error) {
            //   alert(`error => ${JSON.stringify(error)}`);
            reject(error);
        }
    });
};
