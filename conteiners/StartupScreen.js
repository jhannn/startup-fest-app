import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class StartupScreen extends Component {
  render() {
    return (
      <View key={this.props.keyval}>
        <Image
          source={{uri: this.props.image}}
        />
        <Text>{this.props.name}</Text>
        <Text>{this.props.description}</Text>
      </View>
    );
  }
}