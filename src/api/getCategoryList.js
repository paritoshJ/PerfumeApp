import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

import Constants from '../Comman/Constants';

export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
const client1 = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
    // authorization: "Bearer " + getAuthTokenHeaders(),
    authorization:
      'Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE4MCwidXR5cGlkIjozLCJpYXQiOjE2ODM3OTc5OTksImV4cCI6MTY4MzgwMTU5OX0.yG_cgt8S9QVZzjP154zWErBTG4lYEYDVrXWfeHhsEZk',
  },
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
        resolve(data);
      }
    } catch (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      reject(error);
    }
  });
};

export const ADD_WISH_LST_API = async (wishlistId, wishlistItems) => {
  console.log(wishlistId)
  console.log(wishlistItems)
  const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
      store: Constants.StoreCode,
      authorization: Constants.Token,
    }
  });
  try {
    const { data, error } = await client.mutate({
      mutation: gql`
      mutation addProductsToWishlist($wishlistId: ID!, $wishlistItems: [WishlistItemInput!]!) {
        addProductsToWishlist(
          wishlistId: $wishlistId
          wishlistItems: $wishlistItems
        ){
          user_errors {
            code
            message
          }
          wishlist {
            id
            items_count
            name
            sharing_code
            updated_at
            visibility
          }
        }
      }
    `,
      variables: {
        wishlistId: wishlistId,
        wishlistItems: [wishlistItems],
      },
    });
    if (error) {
      return;
    }
    return data;
  } catch (error) {
    alert(error?.message);
    console.log(error)
    return [];
  }
};
export const ADD_ITEAM_WLIST = gql`
  mutation addProductsToWishlist($wishlistId: String!,$wishlistItems: WishlistItemInput!) {
    addProductsToWishlist(
      input: {wishlistId: $wishlistId, wishlistItems: $wishlistItems}
    ) {
      user_errors {
        code
        message
      }
      wishlist {
        id
        items_count
        name
        sharing_code
        updated_at
        visibility
      }
    }
  }
`;

export const Add_CATEGORY_LIST_CARD = async (wishlistid, arr) => {
  const client1 = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
      store: Constants.StoreCode,
      authorization:
        'Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE4MCwidXR5cGlkIjozLCJpYXQiOjE2ODM3ODQ1NDMsImV4cCI6MTY4Mzc4ODE0M30.Y6bT8kaJ77yIhiEoU_WpDNc121RQ9PoEPTbo5c3gmqM',
    },
  });
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client1.mutate({
        mutation: gql`
          mutation addProductsToWishlist(
            $wishlistId: String!
            $wishlistItems: Array!
          ) {
            addProductsToWishlist(wishlistId: $wishlistid, wishlistItems: arr) {
              user_errors {
                code
                message
              }
              wishlist {
                id
                items_count
                name
                sharing_code
                updated_at
                visibility
              }
            }
          }
        `,
        variables: {
          wishlistId: wishlistid,
          wishlistItems: arr,
        },
      });
      if (data) {
        // alert(`Response: ${JSON.stringify(data)}`);
        resolve(data);
      }
    } catch (error) {
      //   alert(`error => ${JSON.stringify(error)}`);
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
              id
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
        resolve(data);
      }
    } catch (error) {
      //   alert(`error => ${JSON.stringify(error)}`);
      reject(error);
    }
  });
};
