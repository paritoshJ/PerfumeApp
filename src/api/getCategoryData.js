import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
  connectToDevTools: true,
  headers: {
    store: Constants.StoreCode,
  }
  });

export const GET_CATEGORY_DATA = async () => {

  
      let {data} = await client.mutate({
        mutation: gql`{
          category(id: 2) {
            products {
              total_count
              page_info {
                current_page
                page_size
              }
            }
            children_count
            children {
              id
              level
              name
              path
              children {
                id
                level
                name
                path
                children {
                  id
                  level
                  name
                  path
                  children {
                    id
                    level
                    name
                    path
                  }
                }
              }
            }
          }
        }
        `});
      if (data) {
        alert(`Response: ${JSON.stringify(data)}`);
        // console.log('data', JSON.stringify(data));
        resolve(data);
      }
    };
