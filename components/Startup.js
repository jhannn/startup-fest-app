import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';

export default class Startup extends Component {
    render() {
    return (
      <View key={this.props.key}>
        <TouchableOpacity onPress={this.props.renderStartup}>
          <Image
            source={{uri: this.props.imageUrl}}
            style={{width:50, height:50}}
          />
          </TouchableOpacity>
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}