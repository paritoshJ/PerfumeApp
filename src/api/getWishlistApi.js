import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';
import { getAuthTokenHeaders } from '../Helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

console.log('ASSADASD', getAuthTokenHeaders());



export const GET_WISHLIST_PRODUCTS = () => {
    var token = getAuthTokenHeaders();
    console.log('token', token);
    const client = new ApolloClient({
        uri: Constants.BASE_GRAPH_QL,
        cache: new InMemoryCache(),
        connectToDevTools: true,
        headers: {
            // authorization: "Bearer " + getAuthTokenHeaders(),
            authorization: "Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjE4MCwidXR5cGlkIjozLCJpYXQiOjE2ODM3OTc5OTksImV4cCI6MTY4MzgwMTU5OX0.yG_cgt8S9QVZzjP154zWErBTG4lYEYDVrXWfeHhsEZk",
        }
    });
    console.log('asd', client);
  return new Promise(async (resolve, reject) => {
     try {
      let {data} = await client.query({
          query: gql`query {
            wishlist {
                items_count
                name
                sharing_code
                updated_at
                items {
                    id
                    qty
                    description
                    added_at
                    product {
                        sku
                        name
                        image {
                            disabled
                            label
                            position
                            url
                        }
                        media_gallery {
                            disabled
                            label
                            position
                            url
                        }
                        price {
                            maximalPrice {
                                amount {
                                    currency
                                    value
                                }
                                adjustments {
                                    code
                                    description
                                }
                            }
                            minimalPrice {
                                adjustments {
                                    code
                                    description
                                    amount {
                                        currency
                                        value
                                    }
                                }
                                amount {
                                    currency
                                    value
                                }
                            }
                            regularPrice {
                                adjustments {
                                    code
                                    description
                                    amount {
                                        currency
                                        value
                                    }
                                }
                                amount {
                                    currency
                                    value
                                }
                            }
                        }
                        price_range {
                            maximum_price {
                                discount {
                                    amount_off
                                    percent_off
                                }
                                final_price {
                                    currency
                                    value
                                }
                                fixed_product_taxes {
                                    label
                                    amount {
                                        currency
                                        value
                                    }
                                }
                                regular_price {
                                    currency
                                    value
                                }
                            }
                            minimum_price {
                                discount {
                                    amount_off
                                    percent_off
                                }
                                final_price {
                                    currency
                                    value
                                }
                                fixed_product_taxes {
                                    label
                                    amount {
                                        currency
                                        value
                                    }
                                }
                                regular_price {
                                    currency
                                    value
                                }
                            }
                        }
                        review_count
                        reviews {
                            items {
                                average_rating
                                created_at
                                nickname
                                summary
                                text
                            }
                        }
                        id
                        short_description {
                            html
                        }
                        small_image {
                            disabled
                            label
                            position
                            url
                        }
                        thumbnail {
                            disabled
                            label
                            position
                            url
                        }
                        uid
                        url_path
                        url_key
                        color
                    }
                }
            }
          }
           `,
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


export const GET_WISHLIST_ITEMS = gql`
    query {
        wishlist {
            items_count
            name
            sharing_code
            updated_at
            items {
                id
                qty
                description
                added_at
                product {
                    sku
                    name
                    image {
                        disabled
                        label
                        position
                        url
                    }
                    media_gallery {
                        disabled
                        label
                        position
                        url
                    }
                    price {
                        maximalPrice {
                            amount {
                                currency
                                value
                            }
                            adjustments {
                                code
                                description
                            }
                        }
                        minimalPrice {
                            adjustments {
                                code
                                description
                                amount {
                                    currency
                                    value
                                }
                            }
                            amount {
                                currency
                                value
                            }
                        }
                        regularPrice {
                            adjustments {
                                code
                                description
                                amount {
                                    currency
                                    value
                                }
                            }
                            amount {
                                currency
                                value
                            }
                        }
                    }
                    price_range {
                        maximum_price {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            fixed_product_taxes {
                                label
                                amount {
                                    currency
                                    value
                                }
                            }
                            regular_price {
                                currency
                                value
                            }
                        }
                        minimum_price {
                            discount {
                                amount_off
                                percent_off
                            }
                            final_price {
                                currency
                                value
                            }
                            fixed_product_taxes {
                                label
                                amount {
                                    currency
                                    value
                                }
                            }
                            regular_price {
                                currency
                                value
                            }
                        }
                    }
                    review_count
                    reviews {
                        items {
                            average_rating
                            created_at
                            nickname
                            summary
                            text
                        }
                    }
                    id
                    short_description {
                        html
                    }
                    small_image {
                        disabled
                        label
                        position
                        url
                    }
                    thumbnail {
                        disabled
                        label
                        position
                        url
                    }
                    uid
                    url_path
                    url_key
                    color
                }
            }
        }
      }      
`;
