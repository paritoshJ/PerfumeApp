import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import Constants from '../Comman/Constants';


export const client = new ApolloClient({
    uri: Constants.BASE_GRAPH_QL,
    cache: new InMemoryCache(),
    connectToDevTools: true
  });

export const GET_HOME_CONFIG_DATA = async () => {

  return new Promise(async (resolve, reject) => {
    try {
      let {data} = await client.mutate({
        mutation: gql`
        query  {
        storeConfig {
            AppConfiguration {
            AppData{
                name
                value
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
      alert(`error => ${JSON.stringify(error)}`);
      reject(error);
    }
  });
};
