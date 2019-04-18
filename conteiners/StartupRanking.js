import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

export default class StartupRanking extends Component {
    render() {
        return (
            <View key={this.props.keyval}>
                <Image
                    source={{ uri: this.state.imageUrl }}
                    style={{ width: 20, height: 20 }}
                />
                <Text>{this.state.name}</Text>
                <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={this.state.starRating}
                    selectedStar={() => { }}
                />
            </View>
        );
    }
}