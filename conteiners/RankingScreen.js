import React, { Component } from 'react';
import { Text } from 'react-native';
import { Container, Button, Card, Content, CardItem, Body, Header, Title, Right, Icon, Left, H3 } from 'native-base';
import { Constants } from "expo";

import styles from './styles';
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

  static navigationOptions = {
    header: null
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
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.rankingProposal} ranking={this.state.startupRankingProposal.indexOf(startup)+1}/>
      })
      resultPitch = this.state.startupRankingPitch.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.rankingPitch} ranking={this.state.startupRankingPitch.indexOf(startup)+1}/>
      })
      resultDevelop = this.state.startupRankingDevelop.map((startup) => {
        return <StartupRanking key={startup.idStartup} keyval={startup.idStartup} name={startup.nameStartup} imageUrl={startup.imageUrl} starRating={startup.rankingDevelop} ranking={this.state.startupRankingDevelop.indexOf(startup)+1}/>
      })
    } else if (this.state.startupRankingProposal.length == 0 && this.state.loading == false) {
      resultProposal = <CardItem><Body><Text> Não existe votação confirmada para Proposta!</Text></Body></CardItem>
      resultPitch = <CardItem><Body><Text> Não existe votação confirmada para Proposta!</Text></Body></CardItem>
      resultDevelop = <CardItem><Body><Text> Não existe votação confirmada para Proposta!</Text></Body></CardItem>
    } else {
      resultProposal = <Spinner color="blue" />;
      resultPitch = <Spinner color="blue" />;
      resultDevelop = <Spinner color="blue" />;
    }

    return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
      <Header style={styles.header}>
        <Left />
        <Body>
          <Title>Resultados</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
          <Icon name='home'/>
          </Button>
        </Right>
      </Header>
        <Content padder>
          <H3 style={styles.hRanking}>Proposta</H3>
          <Card>
            {resultProposal}
          </Card>
          <H3 style={styles.hRanking}>Apresentação / Pitch</H3>
          <Card>
            {resultPitch}
          </Card>
          <H3 style={styles.hRanking}>Desenvolvimento</H3>
          <Card>
            {resultDevelop}
          </Card>
        </Content>
      </Container>
    );
  }
}