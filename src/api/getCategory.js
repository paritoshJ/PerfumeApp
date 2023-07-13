import React from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from '../Comman/Constants';

export const client = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
    authorization: Constants.Token,
  }
});

export const client1 = new ApolloClient({
  uri: Constants.BASE_GRAPH_QL,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
    authorization: Constants.Token,
  }
});
export const GET_CATEGORY = async (ID) => {
  console.log('=======>', Constants.StoreCode)
  console.log('=======>', ID)

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client.mutate({
        mutation: gql`
        query {
          category(id: "${ID}") {
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
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
export const GET_SUB_CATEGORY = async (itemID) => {
  console.log(itemID)

  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client.mutate({
        mutation: gql`
        query {
          category(url_key: "${itemID}") {
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
             }
         }`});
      if (data) {
        // alert(`Response: ${JSON.stringify(data)}`);
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
export const GET_CATEGORY_PRODUCT = async (search, filter, pageSize, currentPage, sort) => {
  const client1 = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers: {
      store: Constants.StoreCode,
      authorization: Constants.Token,
    }
  });
  console.log('search', search, filter, pageSize, currentPage, sort);
  return new Promise(async (resolve, reject) => {
    try {
      let { data } = await client1.query({
        query: gql`
        query Getproducts($search: String! = "",, $filter: ProductAttributeFilterInput!, $pageSize: Int! = 20, $currentPage: Int! = 1,$sort:ProductAttributeSortInput!){
          products(
            search:$search,
            filter: $filter,
            pageSize: $pageSize,
            currentPage: $currentPage,
            sort: $sort
          ) {
                aggregations {
                attribute_code
                count
                label
                options {
                    label
                    value
                    count
                }
                }
                sort_fields {
                  default
                  options {
                        label
                        value
                    }
                }
                items {
                    id
                    uid
                    name
                    sku
                    url_key
                    url_path
                    stock_status
                    image {
                        disabled
                        label
                        position
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
                    special_price
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
                }
                total_count
                page_info {
                    page_size
                    total_pages
                    current_page
                }
            }
            
        }`,
        variables: {
          search: search,
          filter: filter,
          pageSize: pageSize,
          currentPage: currentPage,
          sort: sort,
        },
      });
      if (data) {
        resolve(data);
      }
    } catch (error) {
      alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      reject(error);
    }
  });
};
export const GET_PRODUCT_LISTS_API = gql`
query getProducts($search: String! = "", $filter: ProductAttributeFilterInput!, $pageSize: Int! = 25, $currentPage: Int! = 1,$sort: ProductAttributeSortInput! = {name: DESC}){
    products(
        search: $search,
        filter: $filter,
        pageSize: $pageSize,
        currentPage: $currentPage,
        sort: $sort,
       
    ) {
        aggregations {
        attribute_code
        count
        label
        options {
            label
            value
            count
        }
        }
        items {
            id
            uid
            name
            sku
            url_key
            url_path
            image {
                disabled
                label
                position
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
            special_price
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
        }
        page_info {
        page_size
        }
    }
    category(id: $category_id) {
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
   }
}`;

export const GET_PRODUCT_LISTS = gql`
query getProducts($search: String!, $filter: filter!, $pageSize: Int! , $currentPage: Int!,$sort:sort!){
    products(
      search:""
      filter: {category_id: {eq: "165"}}
      pageSize: 20
      currentPage: 1
      sort: {}
    ) {
        aggregations {
        attribute_code
        count
        label
        options {
            label
            value
            count
        }
        }
        items {
            id
            uid
            name
            sku
            url_key
            url_path
            image {
                disabled
                label
                position
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
            special_price
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
        }
        total_count
        page_info {
            page_size
            total_pages
            current_page
        }
    }
    category(id: $category_id) {
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
   }
}`;