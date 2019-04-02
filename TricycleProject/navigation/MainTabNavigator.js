import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Appbar } from 'react-native-paper';
import TabBarIcon from '../components/TabBarIcon';
import HoursList from '../components/HoursList';
import Spots from '../components/Spots';
import SpotModal from '../components/SpotModal';
import Search from '../components/Search';
import Favorites from '../components/Favorites';
import Tips from '../components/Tips';
import TipsList from '../components/TipsList';
import SingleTips from '../components/SingleTips';
import Challenges from '../components/Challenges';
import ChallengesList from '../components/ChallengesList';
import SingleChallenge from '../components/SingleChallenge';

const examples = {
	tabBarIcon: TabBarIcon,
	hoursList: HoursList,
	spots: Spots,
	search: Search,
	tips: Tips,
	TipsList: TipsList,
	singleTips: SingleTips,
	challenges: Challenges,
	favorites: Favorites
};

const routes = Object.keys(examples).map((id) => ({ id, item: examples[id] })).reduce((acc, { id, item }) => {
	const Comp = item;
	const Screen = (props) => <Comp {...props} />;

	Screen.navigationOptions = (props) => ({
		header: (
			<Appbar.Header>
				<Appbar.BackAction onPress={() => props.navigation.goBack()} />
				<Appbar.Content title={Comp.title} />
			</Appbar.Header>
		),
		/* $FlowFixMe */
		...(typeof Comp.navigationOptions === 'function' ? Comp.navigationOptions(props) : Comp.navigationOptions)
	});

	return {
		...acc,
		[id]: { screen: Screen }
	};
}, {});

const SearchStack = createStackNavigator({
	Search: Search,
	HoursList: HoursList,
	Spots: Spots,
	SpotModal: SpotModal
});

SearchStack.navigationOptions = {
	tabBarLabel: 'Search',
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
	tabBarLabel: 'Tips',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-bulb' : 'md-bulb'} />
};

const FavoritesStack = createStackNavigator({
	Favorites: Favorites
});

FavoritesStack.navigationOptions = {
	tabBarLabel: 'Favorites',
	tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-star' : 'md-star'} />
};

const ChallengesStack = createStackNavigator({
	Challenges: Challenges,
	ChallengesList: ChallengesList,
	SingleChallenge: SingleChallenge
});

ChallengesStack.navigationOptions = {
	tabBarLabel: 'Challenges',
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
		// ...routes
	},
	{
		initialRouteName: 'SearchStack'
		// activeColor: '#F44336'
	}
);
