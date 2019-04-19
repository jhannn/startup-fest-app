import React, { Component } from 'react';
import { StyleSheet, Text, Image } from 'react-native';
import { db } from './config';
import StarRating from 'react-native-star-rating';
import { Container, Card, Content, CardItem, Left, Right, Body, Header, Title, Icon, Button, H2, H3 } from 'native-base';
import { Constants } from "expo";
const STAR_IMAGE = require('../images/empty-star.png');
const STAR_FULL_IMAGE = require('../images/full-star.png');

export default class StartupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startup: this.props.navigation.state.params.startup,
      starCountProposal: 1,
      starCountPitch: 1,
      starCountDevelop: 1
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

  addVote() {
    let startupFirebase = {};
    let existInFirebase = false;
    let allstartups = [];
    let objectAux = {};
    db.ref('startup').on('value', (snapshot) => {
      snapshot.forEach((doc) => {
        let data = doc.val();
        if (data.idStartup.toString() == this.state.startup.segment_id.toString()) {
          startupFirebase = data;
          existInFirebase = true;
        } else {
          allstartups.push(data);
        }
      })
    })
    if (existInFirebase) {
      db.ref('startup/' + startupFirebase.idStartup.toString()).update({
        ratingProposal: this.state.starCountProposal + startupFirebase.ratingProposal,
        ratingPitch: this.state.starCountPitch + startupFirebase.ratingPitch,
        ratingtDevelop: this.state.starCountDevelop + startupFirebase.ratingDevelop,
        countVotes: startupFirebase.countVotes + 1
      }).then((data) => {
        startupFirebase.ratingProposal = this.state.starCountProposal + startupFirebase.ratingProposal;
        startupFirebase.ratingPitch = this.state.starCountPitch + startupFirebase.ratingPitch;
        startupFirebase.ratingtDevelop = this.state.starCountDevelop + startupFirebase.ratingDevelop;
        startupFirebase.countVotes = startupFirebase.countVotes + 1;
        allstartups.push(data);
      }).catch((error) => {
        console.log('error ', error)
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
      }).then((data) => {
        objectAux = {
          idStartup: this.state.startup.segment_id,
          nameStartup: this.state.startup.name,
          imageUrl: this.state.startup.imageUrl,
          ratingProposal: this.state.starCountProposal,
          ratingPitch: this.state.starCountPitch,
          ratingDevelop: this.state.starCountDevelop,
          countVotes: 1.0
        }
        allstartups.push(data);
      }).catch((error) => {
        console.log('error ', error)
      })
    }
    return this.props.navigation.navigate('Ranking', { allstartups: allstartups });
  }

  render() {
    return (
      <Container style={{ marginTop: Constants.statusBarHeight }}>
        <Header>
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
          <Card transparent>
            <CardItem>
              <Left />
              <Body>
                <Image
                  source={{ uri: this.state.startup.imageUrl }}
                  style={{ width: 100, height: 100 }}
                />
              </Body>
              <Right />
            </CardItem>
            <CardItem>
              <Left />
              <Body>
                <Text>{this.state.startup.name}</Text>
              </Body>
              <Right />
            </CardItem>
            <CardItem>
              <Text>{this.state.startup.description}</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Text>Qtd de Participantes:</Text>
                <Text>{this.state.startup.teamCount}</Text>
              </Left>
              <Body>
                <Text>Receita Anual:</Text>
                <Text>{this.state.startup.annualReceipt}</Text>
              </Body>
            </CardItem>
            <H3>Faça sua votação!</H3>
            <CardItem header>
              <Text>Proposta</Text>
            </CardItem>
            <CardItem>
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
            <CardItem header>
              <Text>Apresentação / Pitch</Text>
            </CardItem>
            <CardItem>
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
            <CardItem header>
              <Text>Desenvolvimento</Text>
            </CardItem>
            <CardItem>
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
            <CardItem>
              <Button iconRight info onPress={() => this.addVote()} style={{ paddingLeft: 10 }}>
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