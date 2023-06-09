import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';
export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
  });

export const GET_SLIDER_PRODUCTS = async (slider_name) => {
  console.log('slider name', slider_name)
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
        query {
   getSliderProducts(
        slider_name: "${slider_name}"
    ){
            slider_id
            title
            slider_name
            display_title
            discover_all
            status
            description
            type
            infinite
            speed
            autoplay
            autoplay_speed
            rtl
            display_price
            display_cart
            display_wishlist
            display_compare
            products_number
            items {
                id
                sku
              special_price
                name
                qty
                type_id
                stock_status
                attribute_set_id
                has_options
                required_options
                created_at
                updated_at
                row_id
                created_in
                updated_in
                status
                visibility
                tax_class_id
                short_description
                meta_keyword
                meta_title
                meta_description
                image
                small_image
                swatch_image
                thumbnail
                page_layout
                options_container
                url_key
                msrp_display_actual_price_type
                gift_message_available
                gift_wrapping_available
                is_returnable
                weight
                is_salable
                rating_count
                customAttributesAjmalData {
                    top_note_name
                    top_note_image
                    heart_note_name
                    heart_note_image
                    base_note_name
                    base_note_image
                    display_category
                    product_video_url
                    display_size
                    gender
                    product_lasting_hours
                    ingredient
                    product_color
                }
                rating {
                    vote_id
                    value
                    percent
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
                      discount {
                        amount_off
                        percent_off
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
                      	discount {
                          amount_off
                          percent_off
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
    //   alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
