import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from '../Comman/Constants';
import {getAuthTokenHeaders} from '../Helper/helper';

export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    authorization: getAuthTokenHeaders(),
  },
});

export const ADD_TO_CART_DATA = async (quantity, sku) => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: ADD_PRODUCTS_TO_CART,
      variables: {
        cartId: cartId,
        sku: sku,
        quantity: quantity,
      },
    });
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return [];
  }
};
// export const ADD_TO_CART_DATA = async (quantity, sku) => {
//   try {

// const cartId = await AsyncStorage.getItem('CART_ID')
// const { data, error } = await client.mutate({
//        mutation: gql`
//     mutation addProductsToCart(
//         $cartId: String!
//         $sku: String!
//         $quantity: Float!
//     ) {
//         addProductsToCart(
//             cartId: $cartId
//             cartItems: [{ sku: $sku, quantity: $quantity }]
//         ) {
//             cart {
//                 id
//                 items {
//                     uid
//                     product {
//                         uid
//                         name
//                         sku
//                         image {
//                             url
//                         }
//                         categories {
//                             uid
//                             name
//                         }
//                         size
//                         customAttributesAjmalData {
//                             base_note_image
//                             base_note_name
//                             display_category
//                             display_size
//                             gender
//                             heart_note_image
//                             heart_note_name
//                             ingredient
//                             product_color
//                             product_lasting_hours
//                             top_note_image
//                             top_note_name
//                         }
//                         special_price
//                         price_range {
//                             minimum_price {
//                                 discount {
//                                     amount_off
//                                     percent_off
//                                 }
//                                 fixed_product_taxes {
//                                     amount {
//                                         currency
//                                         value
//                                     }
//                                     label
//                                 }
//                                 final_price {
//                                     currency
//                                     value
//                                 }
//                                 regular_price {
//                                     currency
//                                     value
//                                 }
//                             }
//                         }
//                         price {
//                             regularPrice {
//                                 amount {
//                                     currency
//                                     value
//                                 }
//                             }
//                         }
//                     }
//                     quantity
//                 }
//                 prices {
//                     applied_taxes {
//                         amount {
//                         currency
//                         value
//                         }
//                         label
//                     }
//                     discount {
//                         amount {
//                         currency
//                         value
//                         }
//                         label
//                     }
//                     discounts {
//                         amount {
//                         currency
//                         value
//                         }
//                         label
//                     }
//                     gift_options {
//                         gift_wrapping_for_items {
//                         currency
//                         value
//                         }
//                         gift_wrapping_for_order {
//                         currency
//                         value
//                         }
//                         printed_card {
//                         currency
//                         value
//                         }
//                     }
//                     grand_total {
//                         currency
//                         value
//                     }
//                     subtotal_excluding_tax {
//                         currency
//                         value
//                     }
//                     subtotal_including_tax {
//                         currency
//                         value
//                     }
//                     subtotal_with_discount_excluding_tax {
//                         currency
//                         value
//                     }
//                     }
//             }
//             user_errors {
//                 code
//                 message
//             }
//         }
//     }
// `, variables:{
//   cartId:cartId,
//   sku:sku,
//   quantity:quantity,
// }});
//     if (error) {
//       // alert(`error => ${JSON.stringify(error)}`);
//       console.log('error', JSON.stringify(error));
//       return;
//     }
//     // alert(`Response: ${JSON.stringify(data)}`);
//     console.log('data', JSON.stringify(data));
//     return data;
//   } catch (error) {
//     console.log('error', JSON.stringify(error));
//     return [];
//   }

//   };
export const REMOVE_CART_ITEM_DATA = async cartItemId => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: REMOVE_ITEM_FROM_CART,
      variables: {
        cartId: cartId,
        cartItemId: cartItemId,
      },
    });
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return [];
  }
};
export const UPDATE_ITEM_FROM_CART_API = async item => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    const {data, error} = await client.mutate({
      mutation: UPDATE_ITEM_FROM_CART,
      variables: {
        cartId: cartId,
        cartItems: [item],
      },
    });
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return [];
  }
};
export const REMOVE_ITEM_FROM_CART = gql`
  mutation removeItemFromCart($cartId: String!, $cartItemId: ID!) {
    removeItemFromCart(input: {cart_id: $cartId, cart_item_uid: $cartItemId}) {
      cart {
        id
        items {
          uid
          product {
            uid
            name
            sku
            image {
              url
            }
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
            categories {
              uid
              name
            }
            size
            special_price
            price_range {
              minimum_price {
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
            price {
              regularPrice {
                amount {
                  currency
                  value
                }
              }
            }
          }
          quantity
        }
        prices {
          applied_taxes {
            amount {
              currency
              value
            }
            label
          }
          discount {
            amount {
              currency
              value
            }
            label
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
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
        }
      }
    }
  }
`;
export const UPDATE_ITEM_FROM_CART = gql`
  mutation updateCartItems(
    $cartId: String!
    $cartItems: [CartItemUpdateInput]!
  ) {
    updateCartItems(input: {cart_id: $cartId, cart_items: $cartItems}) {
      cart {
        id
        items {
          uid
          product {
            uid
            name
            sku
            image {
              url
            }
            categories {
              uid
              name
            }
            size
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
            special_price
            price_range {
              minimum_price {
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
            price {
              regularPrice {
                amount {
                  currency
                  value
                }
              }
            }
          }
          quantity
        }
        prices {
          applied_taxes {
            amount {
              currency
              value
            }
            label
          }
          discount {
            amount {
              currency
              value
            }
            label
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
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
        }
      }
    }
  }
`;
export const ADD_PRODUCTS_TO_CART = gql`
  mutation addProductsToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
  ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: [{sku: $sku, quantity: $quantity}]
    ) {
      cart {
        id
        items {
          uid
          product {
            uid
            name
            sku
            image {
              url
            }
            categories {
              uid
              name
            }
            size
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
            special_price
            price_range {
              minimum_price {
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
            price {
              regularPrice {
                amount {
                  currency
                  value
                }
              }
            }
          }
          quantity
        }
        prices {
          applied_taxes {
            amount {
              currency
              value
            }
            label
          }
          discount {
            amount {
              currency
              value
            }
            label
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
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
        }
      }
      user_errors {
        code
        message
      }
    }
  }
`;

//Merge cart

export const MERGE_CART_DATA = gql`
  mutation mergeCarts($source_cart_id: String!, $destination_cart_id: String!) {
    mergeCarts(
      source_cart_id: $source_cart_id
      destination_cart_id: $destination_cart_id
    ) {
      applied_coupon {
        code
      }
      applied_coupons {
        code
      }
      available_payment_methods {
        code
        title
      }
      email
      gift_message {
        from
        message
        to
      }
      gift_receipt_included
      id
      is_virtual
      printed_card_included
      selected_payment_method {
        code
        purchase_order_number
        title
      }
      total_quantity
    }
  }
`;
