import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { db } from '../src/config';
import StarRating from 'react-native-star-rating';

export default class StartupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startup: this.props.navigation.state.params.startup,
      starCountProposal: 0,
      starCountPitch: 0,
      starCountDevelop: 0
    }
  }

  static navigationOptions = {
    title: 'Detalhes'
  }

  onStarRatingPress(rating, type) {
    if(type == 'proposal'){
      this.setState({
        starCountProposal: rating
      });
    }
    if(type == 'pitch'){
      this.setState({
        starCountPitch: rating
      });
    }
    if(type == 'develop'){
      this.setState({
        starCountDevelop: rating
      });
    }
  }

  addVote(){
    db.ref('votes').push({
      idStartup: this.state.startup.segment_id,
      nameStartup: this.state.startup.name,
      imageUrl: this.state.startup.imageUrl,
      ratingProposal: this.state.starCountProposal,
      ratingPitch:this.state.starCountPitch,
      ratingtDevelop:this.state.starCountDevelop
    }).then((data)=>{
      return this.props.navigation.navigate('Ranking');
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
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
          maxStars={5}
          rating={this.state.starCountProposal}
          selectedStar={(rating) => this.onStarRatingPress(rating, 'proposal')}
        />
        <Text>Apresentação / Pitch</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCountPitch}
          selectedStar={(rating) => this.onStarRatingPress(rating, 'pitch')}
        />
        <Text>Desenvolvimento</Text>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={this.state.starCountDevelop}
          selectedStar={(rating) => this.onStarRatingPress(rating, 'develop')}
        />
        <Button title="Ranking" onPress={() => this.addVote()} />
      </View>
    );
  }
}