import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Startup from '../components/Startup';

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
  
  static navigationOptions ={
    title: 'Escolha sua Startup!'
  }

  renderStartup(name, image, description){
    this.props.navigation.navigate('StartupScreen', { name: name, image: image, description: description});
  }

  render() {
    return (
      <View>
        <Button title="Ranking" onPress={() => this.props.navigation.navigate('Ranking')
        }/>
        <Query query={ALLSTARTUPS_QUERY}>
          {({data, error, loading})=>{
            if (error || loading) {
              return <ActivityIndicator size="large" color="#0000ff" />;
            }
            console.log(data.allStartups);
            return data.allStartups.map((startup => (<Startup key={startup.segment_id.toString()} keyval={startup.segment_id} imageUrl={startup.imageUrl} name={startup.name} renderStartup={() => this.renderStartup(startup.name, startup.image, startup.description, startup.segment_id)}/>))
            )}}
        </Query>
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