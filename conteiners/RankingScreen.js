import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import { db } from './config';
import StartupRanking from './StartupRanking';

export default class RankingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allStartups: [],
      startupRankingProposal: [],
      startupRankingPitch: [],
      startupRankingDevelop: [],
      loading: true
    }
  }

  componentDidMount() {
    db.ref('startup').on('value', (snapshot) => {
      let allstartups = [];
      snapshot.forEach((doc) => {
        let data = doc.val();
        allstartups.push(data);
      })
      this.setState({ allStartups: allstartups });
      return this.sortStartups(allstartups);
    })
  }

  sortStartups(data) {
    let startupsStorage = [];
    let startupsProposal = [];
    let startupsPitch = [];
    let startupsDevelop = [];
    if (this.state.allStartups.length > 0) {
      data.forEach((startup) => {
        startup.rakingProposal = startup.ratingProposal / startup.countVotes;
        startup.rakingPitch = startup.ratingPitch / startup.countVotes;
        startup.rakingDevelop = startup.ratingDevelop / startup.countVotes;
        startupsStorage.push(startup);
      })
      startupsProposal = startupsStorage.sort((a, b) => {
        return (a.rakingProposal < b.rakingProposal)
      })
      startupsPitch = startupsStorage.sort((a, b) => {
        return (a.rakingPitch < b.rakingPitch)
      })
      startupsDevelop = startupsStorage.sort((a, b) => {
        return (a.rakingDevelop < b.rakingDevelop)
      })
      this.setState({
        startupRankingProposal: startupsProposal.slice(0, 3),
        startupRankingPitch: startupsPitch.slice(0, 3),
        startupRankingDevelop: startupsDevelop.slice(0, 3)
      })
    }
    this.setState({ loading: false })
  }

  static navigationOptions = {
    title: 'Resultados'
  }

  render() {
    let resultProposal = {};
    let resultPitch = {};
    let resultDevelop = {};
    if (this.state.startupRankingProposal.length > 0) {
      resultProposal = this.state.startupRankingProposal.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.ratingProposal} />
      })
      resultPitch = this.state.startupRankingPitch.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.ratingPitch} />
      })
      resultDevelop = this.state.startupRankingDevelop.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.ratingDevelop} />
      })
    } else if (this.state.startupRankingProposal.length == 0 && this.state.loading == false) {
      resultProposal = <Text> Não existe votação confirmada para Proposta!</Text>
      resultPitch = <Text> Não existe votação confirmada para Proposta!</Text>
      resultDevelop = <Text> Não existe votação confirmada para Proposta!</Text>
    } else {
      resultProposal = <ActivityIndicator size="small" color="#0000ff" />;
      resultPitch = <ActivityIndicator size="small" color="#0000ff" />;
      resultDevelop = <ActivityIndicator size="small" color="#0000ff" />;
    }

    return (
      <View>
        <ScrollView>
          <Text>Resultados</Text>
          <Text>Proposta</Text>
          <ScrollView>
            {resultProposal}
          </ScrollView>
          <Text>Apresentação / Pitch</Text>
          <ScrollView>
            {resultPitch}
          </ScrollView>
          <Text>Desenvolvimento</Text>
          <ScrollView>
            {resultDevelop}
          </ScrollView>
        </ScrollView>
        <Button title="Home" onPress={() => this.props.navigation.navigate('Home')} />
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