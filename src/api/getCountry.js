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