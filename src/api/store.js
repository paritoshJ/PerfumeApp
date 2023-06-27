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
    store: Constants.StoreCode,
    authorization: getAuthTokenHeaders(),
  },

});

export const GET_ALL_STORES_LIST = async (quantity, sku) => {
  try {
    const cartId = await AsyncStorage.getItem('CART_ID');
    console.log(cartId)
    const {data, error} = await client.query({
      query: GET_ALL_STORES,
    });
    if (error) {
      // alert(`error => ${JSON.stringify(error)}`);
      console.log('error', JSON.stringify(error));
      return;
    }
    // alert(`Response: ${JSON.stringify(data)}`);
    console.log('data w', JSON.stringify(data));
    return data;
  } catch (error) {
    console.log('error', JSON.stringify(error));
    return [];
  }
};

export const GET_STORE_CONFIG = gql`
  query storeConfig {
    storeConfig {
      id
      copyright
      cms_home_page
      base_url
      store_code
    }
  }
`;

export const GET_ALL_STORES = gql`
  query StorePickUpData {
    StorePickUpData {
      allStoreLocation {
        address
        apply_by_cron
        assign_type
        city
        code
        country
        country_id
        description
        email
        facebook
        image_path
        instagram
        is_active
        is_pickup_available
        latitude
        longitude
        name
        open_now
        order
        phone_number
        postcode
        region
        skype
        website_url
        whatsapp
        working_hours
        working_hours_info
        working_hours_type
      }
    }
  }
`;

export const ALL_STORE_CONFIG_DATA = gql`
  query {
    allStoreConfigData {
      store_code
      store_name
      is_default_store
      store_group_code
      is_default_store_group
      locale
      base_currency_code
      default_display_currency_code
      timezone
      weight_unit
      base_url
      base_link_url
      base_static_url
      base_media_url
      secure_base_url
      secure_base_link_url
      secure_base_static_url
      secure_base_media_url
    }
  }
`;
