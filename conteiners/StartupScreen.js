import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import { db } from './config';
import StarRating from 'react-native-star-rating';
import { Container } from 'native-base';
import { Row, Grid } from 'react-native-easy-grid';
import { Constants } from "expo";
const STAR_IMAGE = require('../images/empty-star.png');
const STAR_FULL_IMAGE = require('../images/full-star.png');

export default class StartupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startup: this.props.navigation.state.params.startup,
      startupFirebase: {},
      existInFirebase: false,
      starCountProposal: 0,
      starCountPitch: 0,
      starCountDevelop: 0
    }
  }

  static navigationOptions = {
    title: 'Detalhes'
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
        }else{
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
        <Grid style={{
          alignItems: "center"
        }}>
          <Row>
            <ScrollView>
              <View>
                <Image
                  source={{ uri: this.state.startup.imageUrl }}
                  style={{ width: 50, height: 50 }}
                />
                <Text>{this.state.startup.name}</Text>
                <Text>{this.state.startup.description}</Text>
                <Text>Faça sua votação!</Text>
                <Text>Proposta</Text>
                <StarRating
                  emptyStar={STAR_IMAGE}
                  fullStar={STAR_FULL_IMAGE}
                  starSize={20}
                  disabled={false}
                  maxStars={5.0}
                  rating={this.state.starCountProposal}
                  selectedStar={(rating) => this.onStarRatingPress(rating, 'proposal')}
                />
                <Text>Apresentação / Pitch</Text>
                <StarRating
                  emptyStar={STAR_IMAGE}
                  fullStar={STAR_FULL_IMAGE}
                  starSize={20}
                  disabled={false}
                  maxStars={5.0}
                  rating={this.state.starCountPitch}
                  selectedStar={(rating) => this.onStarRatingPress(rating, 'pitch')}
                />
                <Text>Desenvolvimento</Text>
                <StarRating
                  emptyStar={STAR_IMAGE}
                  fullStar={STAR_FULL_IMAGE}
                  starSize={20}
                  disabled={false}
                  maxStars={5.0}
                  rating={this.state.starCountDevelop}
                  selectedStar={(rating) => this.onStarRatingPress(rating, 'develop')}
                />
                <Button title="Enviar" onPress={() => this.addVote()} />
              </View>
            </ScrollView>
          </Row>
        </Grid>
      </Container>
    );
  }
}