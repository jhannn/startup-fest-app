import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import StartupRanking from './StartupRanking';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { Constants } from "expo";

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

  static navigationOptions = {
    title: 'Resultados'
  }

  componentWillMount() {
    this.sortStartups(this.props.navigation.state.params.allstartups);
  }

  sortStartups(data) {
    let startupsStorage = [];
    if (data.length > 0) {
      data.forEach((startup) => {
        startup.rankingProposal = (startup.ratingProposal / startup.countVotes);
        startup.rankingPitch = (startup.ratingPitch / startup.countVotes);
        startup.rankingDevelop = (startup.ratingDevelop / startup.countVotes);
        startupsStorage.push(startup);
      })
      startupsStorage.sort((a, b) => {
        return (a.rankingProposal > b.rankingProposal ? -1 : a.rankingProposal < b.rankingProposal ? 1 : 0)
      })
      this.setState({ startupRankingProposal: startupsStorage.slice(0, 3) })
      startupsStorage.sort((a, b) => {
        return (a.rankingPitch > b.rankingPitch ? -1 : a.rankingPitch < b.rankingPitch ? 1 : 0)
      })
      this.setState({ startupRankingPitch: startupsStorage.slice(0, 3) })
      startupsStorage.sort((a, b) => {
        return (a.rankingDevelop > b.rankingDevelop ? -1 : a.rankingDevelop < b.rankingDevelop ? 1 : 0)
      })
      this.setState({ startupRankingDevelop: startupsStorage.slice(0, 3) })
    }
    this.setState({ loading: false });
  }

  render() {
    let resultProposal = {};
    let resultPitch = {};
    let resultDevelop = {};
    if (this.state.startupRankingProposal.length > 0) {
      resultProposal = this.state.startupRankingProposal.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.rankingProposal} />
      })
      resultPitch = this.state.startupRankingPitch.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.rankingPitch} />
      })
      resultDevelop = this.state.startupRankingDevelop.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.rankingDevelop} />
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
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Grid style={{ alignItems: "center" }}>
          <Row>
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
            </View>
          </Row>
        </Grid>
        <Footer>
          <FooterTab>
            <Button full onPress={() => this.props.navigation.navigate('Home')}>
              <Text>Home</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});