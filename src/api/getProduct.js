import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
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

export const GET_PRODUCTS = async (search, filter, currentPage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.query({
        query: GET_PRODUCTS_SEARCH,
        variables: {
          search: search,
          filter: {},
          pageSize: 20,
          currentPage: currentPage,
        },
      });
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

export const GET_PRODUCTS_FAQ = async (search, filter, currentPage) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.query({
        query: FAQS_BY_PRODUCT,
        variables: {
          search: search,
          filter: filter,
          pageSize: 20,
          currentPage: currentPage,
        },
      });
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

export const GET_PRODUCTS_SEARCH = gql`
  query getProducts(
    $search: String! = ""
    $filter: ProductAttributeFilterInput!
    $pageSize: Int! = 20
    $currentPage: Int! = 1
  ) {
    products(
      search: $search
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
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
          custom_review
          blog_tag
          product_video_url
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
              swatch_data {
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
                custom_review
                product_video_url
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
            custom_review
            product_video_url
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
        reviews(pageSize: 100, currentPage: 1) {
          items {
            nickname
            average_rating
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
  }
`;

export const SEARCH_PRODUCTS = gql`
  query getProducts(
    $search: String! = ""
    $pageSize: Int! = 20
    $currentPage: Int! = 1
  ) {
    products(search: $search, pageSize: $pageSize, currentPage: $currentPage) {
      items {
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
          custom_review
          product_video_url
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
              swatch_data {
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
                custom_review
                product_video_url
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
            custom_review
            product_video_url
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
        reviews(pageSize: 100, currentPage: 1) {
          items {
            nickname
            average_rating
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
  }
`;

export const SEARCH_PRODUCT_BLOGS = gql`
  query getBlogTag($alias: String! = "") {
    getBlogTag(alias: $alias) {
      alias
      meta_robots
      name
      posts(filter: {}, sort: {}, pageSize: 20, currentPage: 1) {
        items {
          title
          comment_count
          content
          creation_time
          disklike
          real_post_url
          hits
          identifier
          image
          is_active
          is_private
          like
          page_title
          post_id
          categories {
            items {
              name
              orderby
              category_id
              stores
              image
              description
              identifier
              creation_time
            }
            total_count
          }
          author {
            author_id
            avatar
            creation_time
            description
          }
        }
        total_count
      }
      total_posts
    }
  }
`;

export const FAQS_BY_PRODUCT = gql`
  query faqQuestionList(
    $search: String! = ""
    $filter: FaqQuestionFilterInput!
    $pageSize: Int! = 20
    $currentPage: Int! = 1
  ) {
    faqQuestionList(
      search: $search
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      items {
        title
        answer
        author_email
        author_name
        creation_time
        is_active
        is_featured
        like
        page_title
        question_position
        question_product
        relatedquestions {
          items {
            title
          }
          total_count
        }
        tags {
          items {
            alias
            name
            total_question
          }
          total_count
        }
        update_time
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;
