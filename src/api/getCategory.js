import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

export const client1 = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true
});
export const GET_CATEGORY = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client.mutate({
        mutation: gql`
        query {
          category(id: 165) {
            display_mode
            is_anchor
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
                 products (pageSize:1){
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
                       customAttributesAjmalData{
                         display_category
                         display_size
                         gender
                       }
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
                     items {
                         id
                         uid
                         sku
                         url_key
                         url_path
                         name
                         color
                         name
                       customAttributesAjmalData{
                         display_category
                         display_size
                         gender
                       }
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

                 }
             }
         }        }`});
      if (data) {
        // alert(`Response: ${JSON.stringify(data)}`);
        console.log('data Category', JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
export const GET_CATEGORY1 = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client1.mutate({
        mutation: gql`
        query {
          amMegaMenuTree {
            items {
             children{
                 id
                  uid
                  name
                  label
                  path
                  parent_id
                  status
                  label
                  is_active
              }
              column_count
              content
              desktop_font
              has_active
              icon
              id
              is_active
              is_category
              is_parent_active
              label
              label_background_color
              label_text_color
              level
              mobile_font
              name
              parent_id
              parent_uid
              path
              status
              subcategories_position
              submenu_type
              uid
              url
              width
              width_value
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
