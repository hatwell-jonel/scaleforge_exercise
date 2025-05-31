'use client';

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://report.development.opexa.io/graphql',
});


const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: process.env.NEXT_PUBLIC_AUTH_TOKEN,
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;