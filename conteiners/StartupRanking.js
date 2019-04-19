import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { CardItem, Left, Body, Right } from 'native-base';

import styles from './styles';

const STAR_IMAGE = require('../images/empty-star.png');
const STAR_FULL_IMAGE = require('../images/full-star.png');
const STAR_HALF_IMAGE = require('../images/half-star-black-white.png');

export default class StartupRanking extends Component {
    render() {
        return (
            <CardItem key={this.props.keyval}>
                <Left>
                    <Text style={styles.textStartup}>{this.props.ranking}º</Text>
                    <Image
                        source={{ uri: this.props.imageUrl }}
                        style={styles.imageRanking}
                    />
                </Left>
                <Body>
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
                </Body>
                <Right>
                    <Text>{Number((this.props.starRating).toFixed(1))} /5</Text>
                </Right>
            </CardItem>
        );
    }
}