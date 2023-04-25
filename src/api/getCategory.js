import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const GET_CATEGORY = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
        query {
          category(id: 2) {
              display_sub_categories
              children_count
              id
              uid
              level
              name
              path
              url_path
              url_key
              image
              description
              children {
                  id
                  uid
                  level
                  name
                  path
                  display_sub_categories
                  image
                  url_key
                  children_count
                  products (pageSize:4){
                      total_count
                      items {
                          id
                          uid
                          sku
                          url_key
                          url_path
                          name
                          color
                          name
                          price_range {
                            minimum_price {
                              discount {
                                  amount_off
                                  percent_off
                              }
                              regular_price {
                                value
                                currency
                              }
                              final_price {
                                value
                                currency
                              }
                            }
                            maximum_price {
                              discount {
                                  amount_off
                                  percent_off
                              }
                              regular_price {
                                value
                                currency
                              }
                              final_price {
                                value
                                currency
                              }
                            }
                          }
                          price_tiers {
                            quantity
                            final_price {
                              value
                              currency
                            }
                          }
                          size
                          special_price
                          image {
                            label
                            url
                          }
                     }
                  }
                  children {
                      display_sub_categories
                      children_count
                      id
                      uid
                      level
                      name
                      path
                      url_path
                      url_key
                      image
                      description
                      products (pageSize:4){
                          total_count
                          items{
                              id
                              sku
                              name
                            image {
                            label
                            url
                          }
                          }
                      }
                  }
              }
          }
        }`});
      if (data) {
        // alert(`Response: ${JSON.stringify(data)}`);
        // console.log('data', JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
