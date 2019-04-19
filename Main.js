import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './conteiners/HomeScreen';
import StartupScreen from './conteiners/StartupScreen';
import RankingScreen from './conteiners/RankingScreen';

const AppStackNavigator = createStackNavigator({
    Home: HomeScreen,
    Startup: StartupScreen,
    Ranking: RankingScreen
}, {
        initialRouteName: "Home"
    })

export default createAppContainer(AppStackNavigator);