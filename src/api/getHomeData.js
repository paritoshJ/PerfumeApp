import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';


export const client = new ApolloClient({
    uri: "https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const GET_HOME_DATA = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
        query GetHomeData {
            homeBannerSlider(action_name: "1") {
                slider {
                    slider_id
                    name
                    status
                    location
                    store_ids
                    customer_group_ids
                    priority
                    effect
                    autoWidth
                    autoHeight
                    design
                    loop
                    lazyLoad
                    autoplay
                    autoplayTimeout
                    nav
                    dots
                    is_responsive
                    responsive_items
                    from_date
                    to_date
                    created_at
                    updated_at
                }
                banners {
                    banner_id
                    name
                    status
                    type
                    content
                    banner_subtitle
                    image
                    url_banner
                    title
                    newtab
                    product_skus
                    updated_at
                    created_at
                    items {
                        id
                        sku
                        name
                        qty
                        type_id
                        stock_status
                        discount_percent
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
                        price_tiers {
                            quantity
                            final_price {
                                value
                                currency
                            }
                        }
                    }
                }
            }
            cmsBlocks(identifiers: ["catalog_events_lister",
    "fragrances",
    "our-story",
    "free-shipping",
    "footer-customer-service",
    "footer-other",
    "footer-links",
    "footer-logo",
    "popular-categories-left",
    "popular-categories-right",
    "cart-page-need-help",
    "product-page-about",
    "product-page-when-to-use",
    "product-page-amber-wood",
    "our-legacy",
    "fragrancestest"]) {
                items {
                    identifier
                    content
                    title
                }
            }
            getSliderProducts(slider_name: "new-arrivals") {
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
                    name
                    qty
                    type_id
                    stock_status
                    discount_percent
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
                    price
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
                    price_tiers {
                        quantity
                        final_price {
                            value
                            currency
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
