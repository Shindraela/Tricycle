import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import HoursList from '../components/HoursList';
import SingleHour from '../components/SingleHour';
import Spots from '../components/Spots';
import SpotModal from '../components/SpotModal';
import Search from '../components/Search';
import FavoritesList from '../components/FavoritesList';
import SingleFavorite from '../components/SingleFavorite';
import Tips from '../components/Tips';
import TipsList from '../components/TipsList';
import SingleTips from '../components/SingleTips';
import Challenges from '../components/Challenges';
import ChallengesList from '../components/ChallengesList';
import SingleChallenge from '../components/SingleChallenge';

const SearchStack = createStackNavigator({
	Search: Search,
	HoursList: HoursList,
	SingleHour: SingleHour,
	Spots: Spots,
	SpotModal: SpotModal
});

SearchStack.navigationOptions = {
	tabBarLabel: 'Recherche',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? `ios-search${focused ? '' : '-outline'}` : 'md-search'}
		/>
	)
};

const TipsStack = createStackNavigator({
	Tips: Tips,
	TipsList: TipsList,
	SingleTips: SingleTips
});

TipsStack.navigationOptions = {
	tabBarLabel: 'Astuces',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bulb' : 'md-bulb'} />
};

const FavoritesStack = createStackNavigator({
	FavoritesList: FavoritesList,
	SingleFavorite: SingleFavorite
});

FavoritesStack.navigationOptions = {
	tabBarLabel: 'Favoris',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'} />
};

const ChallengesStack = createStackNavigator({
	Challenges: Challenges,
	ChallengesList: ChallengesList,
	SingleChallenge: SingleChallenge
});

ChallengesStack.navigationOptions = {
	tabBarLabel: 'Défis',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'logo-game-controller-a' : 'logo-game-controller-b'}
		/>
	)
};

export default createMaterialBottomTabNavigator(
	{
		SearchStack,
		TipsStack,
		ChallengesStack,
		FavoritesStack
	},
	{
		initialRouteName: 'SearchStack',
		activeTintColor: '#eef1f3',
		inactiveTintColor: '#b8f567'
	}
);
