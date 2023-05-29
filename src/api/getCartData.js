import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers:{
      store: Constants.StoreCode,
      authorization: getAuthTokenHeaders(),
    }
  });

export const CART_DATA = async (cartId) => {
  try {
    // const cartId  = await AsyncStorage.setItem('CART_ID');
  console.log("cart id from api", cartId)

    const { data, error } = await client.mutate({
       mutation: gql`
  query GetCart($cart_id: String!){
    cart(cart_id: $cart_id) {
      id
      email
      billing_address {
        city
        country {
          code
          label
        }
        firstname
        lastname
        postcode
        region {
          code
          label
        }
        street
        telephone
      }
      shipping_addresses {
        firstname
        lastname
        street
        city
        region {
          code
          label
        }
        country {
          code
          label
        }
        telephone
        available_shipping_methods {
          amount {
            currency
            value
          }
          available
          carrier_code
          carrier_title
          error_message
          method_code
          method_title
          price_excl_tax {
            value
            currency
          }
          price_incl_tax {
            value
            currency
          }
        }
        selected_shipping_method {
          amount {
            value
            currency
          }
          carrier_code
          carrier_title
          method_code
          method_title
        }
      }
      items {
        uid
        product {
          uid
          name
          image {
            label
            url
            position
          }
          sku
          customAttributesAjmalData {
            base_note_image
            base_note_name
            display_category
            display_size
            gender
            heart_note_image
            heart_note_name
            ingredient
            product_color
            product_lasting_hours
            top_note_image
            top_note_name
          }
          price_range{
            minimum_price{
                discount {
                    amount_off
                    percent_off
                }
                fixed_product_taxes {
                    amount {
                        currency
                        value
                    }
                    label
                }
                final_price {
                    currency
                    value
                }
                regular_price {
                    currency
                    value
                }
            }
          }
        }
        prices {
          discounts {
            amount {
              currency
              value
            }
            label
          }
          fixed_product_taxes {
            amount {
              currency
              value
            }
            label
          }
          price {
            currency
            value
          }
          price_including_tax {
            currency
            value
          }
          row_total {
            currency
            value
          }
          row_total_including_tax {
            currency
            value
          }
          total_item_discount {
            currency
            value
          }
        }
        quantity
        errors {
          code
          message
        }
      }
      available_payment_methods {
        code
        title
      }
      selected_payment_method {
        code
        title
      }
      applied_coupons {
        code
      }
      prices {
            applied_taxes {
                label
                amount {
                    currency
                    value
                }
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
            gift_options {
                gift_wrapping_for_items {
                    currency
                    value
                }
                gift_wrapping_for_order {
                    currency
                    value
                }
                printed_card {
                    currency
                    value
                }
            }
            grand_total {
                value
                currency
            }
            subtotal_excluding_tax {
                value
                currency
            }
            subtotal_including_tax {
                value
                currency
            }
            subtotal_with_discount_excluding_tax {
                value
                currency
            }

        }
    }
}`, variables:{
  cart_id:cartId
}});
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', error);
    return [];
  }
  
  };
