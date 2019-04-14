import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <View style={{ padding: 10 }}>
      <MovieDetails />
    </View>
    </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// Apollo client
const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://startups-project-mytvsxrgeb.now.sh' }),
  cache: new InMemoryCache().restore({}),
});
 
// Example query from https://www.graph.cool/
const MOVIE_QUERY = gql`
query GetAllStartups {
  allStartups {
    name
    teamCount
    description
    imageUrl
    annualReceipt
    Segment {
      name
      code
    }
  }
}
`;
 
// MovieDetails Component
const MovieDetails = graphql(MOVIE_QUERY)(({ data }) => {
  const { loading, allStartups } = data;

  if (loading) return <View><Text>loading...</Text></View>;

  return (
    <View style={{ padding: 10 }}>
      {allStartups.map(({ name }) => (
        <Text key={name}>
          {name}
        </Text>
      ))}
    </View>
  );
});