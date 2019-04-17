import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

const ALLSTARTUPS_QUERY = gql`
query GetAllStartups {
  allStartups {
    name
    teamCount
    description
    imageUrl
    annualReceipt
    segment_id
    Segment {
      name
      code
    }
  }
}
`;

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    /*realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [
        {
          name: 'user_details',
          properties: {
            user_id: { type: 'int', default: 0 },
            user_name: 'string',
            user_contact: 'string',
            user_address: 'string',
          },
        },
      ],
    });*/
  }

  feedData = (data) => {
    let allStartups = [];
    data.allStartups.map((startup) => {
      if (startup) {
        allStartups.push(startup);
      }
    })
    return allStartups;
  }

  static navigationOptions = {
    title: 'Escolha sua Startup!'
  }

  render() {
    return (
      <View>
        <ScrollView>
          <Query query={ALLSTARTUPS_QUERY}>
            {({ data, error, loading }) => {
              if (error || loading) {
                return <ActivityIndicator size="large" color="#0000ff" />;
              }
              console.log(data.allStartups);
              let allStartups = this.feedData(data);
              return allStartups.map(startup => (
                <View key={startup.segment_id}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Startup', { startup: startup })}>
                    <Image
                      source={{ uri: startup.imageUrl }}
                      style={{ width: 50, height: 50 }}
                    />
                    <Text>{startup.name}</Text>
                  </TouchableOpacity>
                </View>
              ))
            }}
          </Query>
        </ScrollView>
        <Button title="Ranking" onPress={() => this.props.navigation.navigate('Ranking')
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});