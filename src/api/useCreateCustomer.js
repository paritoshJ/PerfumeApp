import React from 'react';
import {gql} from '@apollo/client';
import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://integration-5ojmyuq-vvqszukhxdw6q.eu-3.magentosite.cloud/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const USER_REGISTER = async (email, password, name) => {
  console.log(email, password, name);
  const {data, error} = await client.mutate({
    mutation: gql`
      mutation {
        createCustomer(
            input: {
            firstname: ${name}
            lastname: ${name}
            email: ${email}
            password: ${password}
            is_subscribed: true
          }
        ) {
          customer {
            firstname
            lastname
            email
            is_subscribed
          }
        }
      }
    `
  });
  if (error) {
    alert(`error => ${JSON.stringify(error)}`);
    console.log('error', JSON.stringify(error));
    return;
  }
  alert(`Response: ${JSON.stringify(data.generateCustomerToken.token)}`);
  console.log('data', JSON.stringify(data.generateCustomerToken.token));
};
