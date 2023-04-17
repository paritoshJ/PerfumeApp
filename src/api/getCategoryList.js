import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';


export const client = new ApolloClient({
    uri: "https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true
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
              items{
                id
                sku
                name
                url_key
                stock_status
                new
                image{
                  url
                  label
                  position
                }
                small_image{
                  url
                  label
                  position
                }
                thumbnail{
                  url
                  label
                  position
                }
                short_description{
                  html
                }
                description{
                  html
                }
                price_range{
                  minimum_price{
                    regular_price{
                      value
                      currency
                    }
                    final_price{
                      value
                      currency
                    }
                  }
                  maximum_price{
                    regular_price{
                      value
                      currency
                    }
                    final_price{
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
                price_tiers{
                  quantity
                  final_price{
                    value
                    currency
                  }
                  discount{
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
        }`});
      if (data) {
        alert(`Response: ${JSON.stringify(data)}`);
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
