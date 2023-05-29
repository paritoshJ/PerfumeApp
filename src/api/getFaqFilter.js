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
export const GET_FAQ_API = async (search, filter, currentPage) => {
  try {
    const {data, error} = await client.query({
      query: GET_FAQ_API_QUERY,
      variables: {
        search: search,
        filter: filter,
        currentPage: currentPage,
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
export const GET_FAQ_API_QUERY = gql`
query faqCategoryList($search: String! = "", $filter: FaqCategoryFilterInput!, $pageSize: Int! = 20, $currentPage: Int! = 1){
    faqCategoryList(
        search: $search,
        filter: $filter,
        pageSize: $pageSize,
        currentPage: $currentPage
    ) {
    items {
      animation_class
      animation_speed
      body_bg
      body_color
      body_size
      border_width
      cat_icon
      category_id
      creation_time
      description
      grid_column
      identifier
      image
      include_in_sidebar
      is_active
      layout_type
      meta_description
      meta_keywords
      page_layout
      page_title
      parent_id
      position
      question_active_icon
      question_icon
      question_margin
      questions {
        items {
          title
          answer 
        }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
      }
      store_id
      title
      title_bg
      title_bg_active
      title_border_color
      title_border_radius
      title_color
      title_color_active
      title_size
      update_time
    }
    page_info {
      current_page
      page_size
      total_pages
    }
    total_count
  }
}`;