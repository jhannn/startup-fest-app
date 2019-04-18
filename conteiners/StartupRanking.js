import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

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
                    disabled={true}
                    maxStars={5.0}
                    rating={this.props.starRating}
                    selectedStar={() => { }}
                />
            </View>
        );
    }
}