import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { db } from './config';
import StarRating from 'react-native-star-rating';

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

  componentDidMount() {
    let startupFirebase = {};
    let existInFirebase = false;
    db.ref('startup').on('value', (snapshot) => {
      snapshot.forEach((doc) => {
        let data = doc.val();
        if (data.idStartup.toString() == this.state.startup.segment_id.toString()) {
          startupFirebase = data;
          existInFirebase = true;
        }
      })
      this.setState({ startupFirebase: startupFirebase, existInFirebase: existInFirebase });
    })
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
    if (this.state.existInFirebase) {
      db.ref('startup/' + this.state.startupFirebase.idStartup.toString()).update({
        ratingProposal: this.state.starCountProposal + this.state.startupFirebase.ratingProposal,
        ratingPitch: this.state.starCountPitch + this.state.startupFirebase.ratingPitch,
        ratingtDevelop: this.state.starCountDevelop + this.state.startupFirebase.ratingDevelop,
        countVotes: this.state.startupFirebase.countVotes + 1
      }).then((data) => {
        return this.props.navigation.navigate('Ranking');
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
        countVotes: 1
      }).then((data) => {
        return this.props.navigation.navigate('Ranking');
      }).catch((error) => {
        console.log('error ', error)
      })
    }
  }

  render() {
    return (
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
          disabled={false}
          maxStars={5.0}
          rating={this.state.starCountProposal}
          selectedStar={(rating) => this.onStarRatingPress(rating, 'proposal')}
        />
        <Text>Apresentação / Pitch</Text>
        <StarRating
          disabled={false}
          maxStars={5.0}
          rating={this.state.starCountPitch}
          selectedStar={(rating) => this.onStarRatingPress(rating, 'pitch')}
        />
        <Text>Desenvolvimento</Text>
        <StarRating
          disabled={false}
          maxStars={5.0}
          rating={this.state.starCountDevelop}
          selectedStar={(rating) => this.onStarRatingPress(rating, 'develop')}
        />
        <Button title="Enviar" onPress={() => this.addVote()} />
      </View>
    );
  }
}