import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './conteiners/HomeScreen';
import StartupScreen from './conteiners/StartupScreen';
import RankingScreen from './conteiners/RankingScreen';

const AppStackNavigator = createStackNavigator({
    Home: HomeScreen,
    Startup: StartupScreen,
    Ranking: RankingScreen
},{
    navigationOptions:{
        headerTitle: 'The Startup Fest'
    }
})

const Main = createAppContainer(AppStackNavigator);

export default Main;