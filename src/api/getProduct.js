import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const GET_PRODUCTS = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
        query getProducts {
          products(
              search: ""
          ) {
              items {
                  id
                  uid
                  name
                  url_key
                  url_path
                  description {
                      html
                  }
                  short_description {
                      html
                  }
                  media_gallery {
                      disabled
                      label
                      position
                      url
                      ... on ProductVideo {
                          video_content {
                              media_type
                              video_provider
                              video_url
                              video_title
                              video_description
                              video_metadata
                          }
                      }
                  }
                  url_key
                  image {
                      disabled
                      label
                      position
                      url
                  }
                  custom_attributes {
                      attribute_metadata {
                          code
                          data_type
                          entity_type
                          is_system
                          label
                          sort_order
                          ui_input {
                              is_html_allowed
                              ui_input_type
                          }
                          attribute_labels {
                              label
                              store_code
                          }
                          uid
                      }
                      entered_attribute_value {
                          value
                      }
                      selected_attribute_options {
                          attribute_option {
                              is_default
                              label
                              uid
                          }
                      }
                  }
                  meta_description
                  meta_keyword
                  meta_title
                  new_from_date
                  sku
                  stock_status
                  new_to_date
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
                      how_to_use
                      when_to_use
                      product_about
                      blog_tag
                      jasmine_name
                      jasmine_image
                      amber_name
                      amber_image
                      ambergris_name
                      ambergris_image
                      bergamot_orange_name
                      bergamot_orange_image
                      patchouli_name
                      patchouli_image
                      citrus_name
                      citrus_image
                      linalool_name
                      linalool_image
                      muskmallow_name
                      muskmallow_image
                      oakmoss_name
                      oakmoss_image
                      oud_name
                      oud_image
                      ylang_yang_name
                      ylang_yang_image
                      blog_tag
                      error
                  }
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
                  ... on ConfigurableProduct {
                      configurable_options {
                      id
                      uid
                      attribute_id
                      label
                      position
                      use_default
                      attribute_code
                      values {
                          value_index
                          label
                          swatch_data{
                          value
                          }
                      }
                      product_id
                      }
                      variants {
                      product {
                          id
                          uid
                          name
                          sku
                          attribute_set_id
                          description {
                              html
                          }
                          short_description {
                              html
                          }
                          media_gallery {
                              disabled
                              label
                              position
                              url
                              ... on ProductVideo {
                                  video_content {
                                      media_type
                                      video_provider
                                      video_url
                                      video_title
                                      video_description
                                      video_metadata
                                  }
                              }
                          }
                          url_key
                          image {
                              disabled
                              label
                              position
                              url
                          }
                          ... on PhysicalProductInterface {
                          weight
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
                              how_to_use
                              when_to_use
                              product_about
                              blog_tag
                              jasmine_name
                              jasmine_image
                              amber_name
                              amber_image
                              ambergris_name
                              ambergris_image
                              bergamot_orange_name
                              bergamot_orange_image
                              patchouli_name
                              patchouli_image
                              citrus_name
                              citrus_image
                              linalool_name
                              linalool_image
                              muskmallow_name
                              muskmallow_image
                              oakmoss_name
                              oakmoss_image
                              oud_name
                              oud_image
                              ylang_yang_name
                              ylang_yang_image
                              blog_tag
                              error
  
                          }
                      }
                      attributes {
                          label
                          code
                          value_index
                      }
                      }
                  }
                  review_count
                  rating_summary
                  related_products {
                      category_gear
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
                          how_to_use
                          when_to_use
                          product_about
                          blog_tag
                          jasmine_name
                          jasmine_image
                          amber_name
                          amber_image
                          ambergris_name
                          ambergris_image
                          bergamot_orange_name
                          bergamot_orange_image
                          patchouli_name
                          patchouli_image
                          citrus_name
                          citrus_image
                          linalool_name
                          linalool_image
                          muskmallow_name
                          muskmallow_image
                          oakmoss_name
                          oakmoss_image
                          oud_name
                          oud_image
                          ylang_yang_name
                          ylang_yang_image
                          blog_tag
                          error
  
                      }
                      description {
                          html
                      }
                      short_description {
                          html
                      }
                      gift_message_available
                      image {
                          disabled
                          label
                          url
                      }
                      is_returnable
                      media_gallery {
                          disabled
                          label
                          url
                      }
                      meta_description
                      meta_keyword
                      meta_title
                      name
                      only_x_left_in_stock
                      options_container
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
                      product_links {
                      link_type
                      linked_product_sku
                      linked_product_type
                      position
                      sku
                      }
                      rating_summary
                      review_count
                  }
                  reviews (pageSize: 100,currentPage: 1) {
                      items {
                      nickname
                      average_rating,
                      ratings_breakdown {
                          name
                          value
                      }
                      }
                  }
                  color
                  country_of_manufacture
                  }
                  total_count
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
