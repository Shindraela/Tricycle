import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { getFav } from '../helpers';

export default class Favorites extends React.Component {
	static navigationOptions = {
		title: 'Favorites'
	};

	constructor() {
		super();

		this.state = {
			favorites: []
		};
	}

	componentDidMount() {
		this.fetchFavorites();
	}

	updateStorageFavorites = async (favorites) => {
		try {
			// met à jour la valeur de "favorites" en local
			await AsyncStorage.setItem('favorites', favorites);
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	removeFavory = async (favoryRemoved) => {
		const { favorites } = this.state;

		const index = favorites.indexOf(favoryRemoved);

		if (index > -1) favorites.splice(index, 1);

		this.updateStorageFavorites(favorites);
	};

	// addFavory = async (favoryAdded) => {
	// 	const { favorites } = this.state;
	// 	favorites.push(favoryAdded);

	// 	this.updateStorageFavorites(favorites);
	// };

	fetchFavorites = async () => {
		try {
			const favorites = await getFav();

			if (favorites !== null) {
				this.setState({
					favorites: JSON.parse(favorites)
				});
			}
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	render() {
		const { favorites } = this.state;

		return (
			<View style={styles.container}>{favorites && favorites.map((fav, i) => <Text key={i}>{fav}</Text>)}</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
