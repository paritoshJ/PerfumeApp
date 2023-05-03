import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';

export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    headers:{
        authorization: 'Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjEyOSwidXR5cGlkIjozLCJpYXQiOjE2ODMxMzY2MDYsImV4cCI6MTY4MzE0MDIwNn0.tRX5ulZaQTsX3Iw55JE2us9cBZR3lU4fOwEtHfYjbyA'
    }
  });

export const GET_WISHLIST_PRODUCTS =  () => {

  return new Promise(async (resolve, reject) => {
     try {
      let {data} = await client.query({
        query: gql`
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
        `
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
