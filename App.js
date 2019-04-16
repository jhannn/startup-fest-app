import React, {Component} from 'react';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';

import Main from './Main';

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    );
  }
}

// Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://startups-project-mytvsxrgeb.now.sh' }),
  cache: new InMemoryCache().restore({}),
});