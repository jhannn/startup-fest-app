import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default class RankingScreen extends Component {
  static navigationOptions ={
    title: 'Resultados'
  }
  render() {
    return (
      <View>
        <Text>Escolha sua StartUp!</Text>
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