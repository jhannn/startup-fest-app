import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import { db } from '../src/config';
import StartupRanking from './StartupRanking';

export default class RankingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startupRankingProposal: [],
      startupRankingPitch: [],
      startupRankingDevelop: [],
      loading: true
    }
  }

  componentDidMount() {
    console.log('====================================');
    console.log("Ranking");
    console.log('====================================');
    db.ref('votes').on('value', (data) => {
      return this.sortStartups(data);
    });
  }

  sortStartups(data) {
    let startupsStorage = [];
    let value = 0;
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log("ooooooooooooooooooooooooooiiiiiiiiiiiiiiiaaaaaaaaaaaaa");
    data.map(startup => {
      if(startupsStorage.length > 0) value = startupsStorage[idStartup].indexOf(startup.idStartup); else value=-1;
      console.log('pasoooooooooooooooooooooooou')
      if (value == -1) {
        startupsStorage.push({
          idStartup: startup.idStartup,
          nameStartup: startup.nameStartup,
          imageUrl: startup.imageUrl,
          votesProposal: [startup.ratingProposal],
          votesPitch: [startup.ratingPitch],
          votesDevelop: [startup.ratingtDevelop],
          ratingProposal: startup.ratingProposal,
          ratingPitch: startup.ratingPitch,
          ratingtDevelop: startup.ratingtDevelop,
          voteCount: 1
        })
      } else {
        startupsStorage[value].votesProposal.push(startup.ratingProposal);
        startupsStorage[value].votesPitch.push(startup.ratingPitch);
        startupsStorage[value].votesDevelop.push(startup.ratingtDevelop);
        startupsStorage[value].voteCount = ++startupsStorage[value].voteCount;
        startupsStorage[value].ratingProposal = startupsStorage[value].votesProposal.reduce(reducer) / startupsStorage[value].voteCount;
        startupsStorage[value].ratingPitch = startupsStorage[value].votesPitch.reduce(reducer) / startupsStorage[value].voteCount;
        startupsStorage[value].ratingtDevelop = startupsStorage[value].votesDevelop.reduce(reducer) / startupsStorage[value].voteCount;
      }
    })
    this.setState({
      startupRankingProposal: startupsStorage.sort((a, b) => {
        return (a.ratingProposal < b.ratingProposal);
      }),
      startupRankingPitch: startupsStorage.sort((a, b) => {
        return (a.ratingPitch < b.ratingPitch);
      }),
      startupRankingDevelop: startupsStorage.sort((a, b) => {
        return (a.ratingtDevelop < b.ratingtDevelop);
      }), loading: false
    })
  }

  static navigationOptions = {
    title: 'Resultados'
  }

  render() {
    let resultProposal;
    if (this.state.startupRankingProposal.length > 0) {
      console.log('chuuuuuuuuuuuuuuuuuuuuuupaaaaaaaaaaaaaaa');
      resultProposal = this.state.startupRankingProposal.map((val) => {
        return <StartupRanking key={val.idStartup} keyval={val.idStartup} name={val.nameStartup} imageUrl={val.imageUrl} starRating={val.ratingProposal} />
      })
    } else if (this.state.startupRankingProposal.length == 0 && this.state.loading == false) {
      resultProposal = <Text> Não existe votação confirmada para Proposta!</Text>
    } else {
      resultProposal = <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <View>
        <Text>Resultados</Text>
        <Text>Proposta</Text>
        <ScrollView>
        {resultProposal}
        </ScrollView>
        <Text>Apresentação / Pitch</Text>
        <Text>Desenvolvimento</Text>
        <Button title="Ranking" onPress={() => this.props.navigation.navigate('Home')} />
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