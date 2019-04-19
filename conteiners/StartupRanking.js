import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
const STAR_IMAGE = require('../images/empty-star.png');
const STAR_FULL_IMAGE = require('../images/full-star.png');
const STAR_HALF_IMAGE = require('../images/half-star-black-white.png');

export default class StartupRanking extends Component {
    render() {
        return (
            <View key={this.props.keyval}>
                <Image
                    source={{ uri: this.props.imageUrl }}
                    style={{ width: 20, height: 20 }}
                />
                <Text>{this.props.name}</Text>
                <StarRating
                    emptyStar={STAR_IMAGE}
                    fullStar={STAR_FULL_IMAGE}
                    halfStar={STAR_HALF_IMAGE}
                    starSize={20}
                    halfStarEnabled={true}
                    disabled={true}
                    maxStars={5.0}
                    rating={this.props.starRating}
                    selectedStar={() => { }}
                />
            </View>
        );
    }
}