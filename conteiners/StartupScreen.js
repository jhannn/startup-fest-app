import React, { Component } from 'react';
import { Text, Image, Alert } from 'react-native';
import { db } from './config';
import StarRating from 'react-native-star-rating';
import { Container, Card, Content, CardItem, Left, Right, Body, Header, Title, Icon, Button, H3, Spinner } from 'native-base';
import { Constants } from "expo";
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const STAR_IMAGE = require('../images/empty-star.png');
const STAR_FULL_IMAGE = require('../images/full-star.png');

export default class StartupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startup: this.props.navigation.state.params.startup,
      starCountProposal: 1,
      starCountPitch: 1,
      starCountDevelop: 1,
      loading: false
    }
  }

  static navigationOptions = {
    header: null
  }

  onStarRatingPress(rating, type) {
    if (type == 'proposal') {
      this.setState({
        starCountProposal: rating
      });
    } else if (type == 'pitch') {
      this.setState({
        starCountPitch: rating
      });
    } else {
      this.setState({
        starCountDevelop: rating
      });
    }
  }

  async addVoteArray(allstartups, startupFirebase, existInFirebase) {
    let objectAux = {};
    if (existInFirebase) {
      db.ref('startup/' + startupFirebase.idStartup.toString()).update({
        ratingProposal: this.state.starCountProposal + startupFirebase.ratingProposal,
        ratingPitch: this.state.starCountPitch + startupFirebase.ratingPitch,
        ratingtDevelop: this.state.starCountDevelop + startupFirebase.ratingDevelop,
        countVotes: startupFirebase.countVotes + 1
      }).then(() => {
        startupFirebase.ratingProposal = this.state.starCountProposal + startupFirebase.ratingProposal;
        startupFirebase.ratingPitch = this.state.starCountPitch + startupFirebase.ratingPitch;
        startupFirebase.ratingDevelop = this.state.starCountDevelop + startupFirebase.ratingDevelop;
        startupFirebase.countVotes = startupFirebase.countVotes + 1;
        allstartups.push(startupFirebase);
        this.setState({ loading: false });
        return this.props.navigation.navigate('Ranking', { allstartups: allstartups });
      }).catch((error) => {
        console.log('error ', error);
        alert('Aconteceu algo errado, repita a operação');
      })
    } else {
      db.ref('startup/' + this.state.startup.segment_id.toString()).set({
        idStartup: this.state.startup.segment_id,
        nameStartup: this.state.startup.name,
        imageUrl: this.state.startup.imageUrl,
        ratingProposal: this.state.starCountProposal,
        ratingPitch: this.state.starCountPitch,
        ratingDevelop: this.state.starCountDevelop,
        countVotes: 1.0
      }).then(() => {
        objectAux = {
          idStartup: this.state.startup.segment_id,
          nameStartup: this.state.startup.name,
          imageUrl: this.state.startup.imageUrl,
          ratingProposal: this.state.starCountProposal,
          ratingPitch: this.state.starCountPitch,
          ratingDevelop: this.state.starCountDevelop,
          countVotes: 1.0
        }
        allstartups.push(objectAux);
        this.setState({ loading: false });
        return this.props.navigation.navigate('Ranking', { allstartups: allstartups });
      }).catch((error) => {
        console.log('error ', error);
        alert('Aconteceu algo errado, repita a operação');
      })
    }
  }

  async addVote() {
    let startupFirebase = {};
    let existInFirebase = false;
    let allstartups = [];
    this.setState({ loading: true });
    db.ref('startup').once('value', (snapshot) => {
      snapshot.forEach((doc) => {
        let data = doc.val();
        if (data.idStartup.toString() == this.state.startup.segment_id.toString()) {
          startupFirebase = data;
          existInFirebase = true;
        } else {
          allstartups.push(data);
        }
      })
      return this.addVoteArray(allstartups, startupFirebase, existInFirebase)
    })
  }

  confirmAddVote(){
    Alert.alert(
      'Adicionar Voto',
      'Quer realmente adicionar o voto?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.addVote()},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
      <SpinnerOverlay
          visible={this.state.loading}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
        <Header style={{ backgroundColor: "#3299CC" }}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>{this.state.startup.name}</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
              <Icon name='home' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Card>
            <CardItem>
              <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                <Image
                  source={{ uri: this.state.startup.imageUrl }}
                  style={{ width: 100, height: 100 }}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>{this.state.startup.name}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{ textAlign: "justify" }}>{this.state.startup.description}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Qtd de Participantes:</Text>
                <Text>{this.state.startup.teamCount}</Text>
              </Left>
              <Body style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text>Receita Anual:</Text>
                <Text>{this.state.startup.annualReceipt}</Text>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header style={{ flexDirection: "row", justifyContent: "center" }}>
              <H3 style={{ flexDirection: "row", justifyContent: "center" }}>Faça sua votação!</H3>
            </CardItem>
            <CardItem header style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text>Proposta</Text>
            </CardItem>
            <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
              <StarRating
                emptyStar={STAR_IMAGE}
                fullStar={STAR_FULL_IMAGE}
                starSize={30}
                disabled={false}
                maxStars={5.0}
                rating={this.state.starCountProposal}
                selectedStar={(rating) => this.onStarRatingPress(rating, 'proposal')}
              />
            </CardItem>
            <CardItem header style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text>Apresentação / Pitch</Text>
            </CardItem>
            <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
              <StarRating
                emptyStar={STAR_IMAGE}
                fullStar={STAR_FULL_IMAGE}
                starSize={30}
                disabled={false}
                maxStars={5.0}
                rating={this.state.starCountPitch}
                selectedStar={(rating) => this.onStarRatingPress(rating, 'pitch')}
              />
            </CardItem>
            <CardItem header style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text>Desenvolvimento</Text>
            </CardItem>
            <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
              <StarRating
                emptyStar={STAR_IMAGE}
                fullStar={STAR_FULL_IMAGE}
                starSize={30}
                disabled={false}
                maxStars={5.0}
                rating={this.state.starCountDevelop}
                selectedStar={(rating) => this.onStarRatingPress(rating, 'develop')}
              />
            </CardItem>
            <CardItem style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button iconRight info onPress={() => this.confirmAddVote()} style={{ paddingLeft: 10 }}>
                <Text>Enviar voto</Text>
                <Icon name='send' style={{ paddingLeft: 10 }} />
              </Button>
            </CardItem>
          </Card>
        </Content>
      </Container >
    );
  }
}