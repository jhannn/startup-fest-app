import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class StartupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startup: this.props.navigation.state.params.startup
    }
  }

  componentDidMount() {
    console.log("NAV: ", this.props.navigation)
  }

  static navigationOptions = {
    title: 'Detalhes'
  }

  render() {
    return (
      <View>
        <Image
          source={{ uri: this.state.startup.imageUrl }}
          style={{ width: 50, height: 50 }}
        />
        <Text>{this.state.startup.name}</Text>
        <Text>{this.state.startup.description}</Text>
        <Button title="Ranking" onPress={() => this.props.navigation.navigate('Ranking')} />
      </View>
    );
  }
}