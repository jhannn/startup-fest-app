import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider } from 'react-apollo';
import { AppLoading } from "expo";
import ignoreWarnings from 'ignore-warnings';

import Navigation from './Navigation';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    ignoreWarnings(['Setting a timer']);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <ApolloProvider client={client}>
        <Navigation />
      </ApolloProvider>
    );
  }
}

// Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://startups-project-mytvsxrgeb.now.sh' }),
  cache: new InMemoryCache().restore({}),
});