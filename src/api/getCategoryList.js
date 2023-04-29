import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

import Constants from '../Comman/Constants';

export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const GET_CATEGORY_LIST = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
          {
            categoryList {
              products {
                total_count
                items {
                  id
                  sku
                  name
                  url_key
                  stock_status
                  new
                  image {
                    url
                    label
                    position
                  }
                  small_image {
                    url
                    label
                    position
                  }
                  thumbnail {
                    url
                    label
                    position
                  }
                  short_description {
                    html
                  }
                  description {
                    html
                  }
                  price_range {
                    minimum_price {
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
                  new_from_date
                  new_to_date
                  special_price
                  special_from_date
                  special_to_date
                  gift_message_available
                  country_of_manufacture
                  price_tiers {
                    quantity
                    final_price {
                      value
                      currency
                    }
                    discount {
                      amount_off
                      percent_off
                    }
                  }
                }
                page_info {
                  current_page
                  page_size
                }
              }
            }
          }
        `,
      });
      if (data) {
        // alert(`Response: ${JSON.stringify(data)}`);
        // console.log('data', JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      // console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};

export const GET_CATEGORY_LIST_HOME = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
          query {
            categoryList(filters: {parent_id: {eq: "2"}}) {
              app_banner
              automatic_sorting
              available_sort_by
              breadcrumbs {
                category_level
                category_name
                category_uid
                category_url_key
                category_url_path
              }
              canonical_url
              children {
                app_banner
                description
                display_mode
                display_sub_categories
                filter_price_range
                image
                is_anchor
                landing_page
                level
                meta_description
                meta_keywords
                meta_title
                name
                path
                path_in_store
                position
                product_count
                relative_url
                staged
                type
                uid
                url_key
                url_path
                url_suffix
              }
              children_count
              custom_layout_update_file
              default_sort_by
              description
              display_mode
              display_sub_categories
              filter_price_range
              image
              include_in_menu
              is_anchor
              landing_page
              level
              meta_description
              meta_keywords
              meta_title
              name
              path
              path_in_store
              position
              product_count
              relative_url
              staged
              type
              uid
              url_key
              url_path
              url_suffix
            }
          }
        `,
      });
      if (data) {
        // alert(`Response: ${JSON.stringify(data)}`);
        // console.log('data', JSON.stringify(data));
        resolve(data);
      }
    } catch (error) {
      //   alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
