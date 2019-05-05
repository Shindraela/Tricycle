import React from 'react';
import { StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native';
import { List } from 'react-native-paper';
import { getFav } from '../helpers';

class FavoritesList extends React.Component {
	static navigationOptions = {
		title: 'Points de tri favoris'
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
				parsedFavorites = JSON.parse(favorites);

				this.setState({
					favorites: parsedFavorites
				});
			}
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	favoritesList() {
		favorites = this.state.favorites;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');
		// console.log('favorites in favoritesList :', favorites);
		// console.log('typeof favorites in favoritesList :', typeof favorites);

		return favorites.map((fav, index) => (
			<List.Item
				key={index}
				right={(props) => <List.Icon {...props} icon="arrow-forward" />}
				title={fav.adresse}
				onPress={() =>
					this.props.navigation.navigate('SingleFavorite', {
						otherParam: fav.adresse
					})}
			/>
			// <View key={index} style={styles.infoContent}>
			// 	<Text style={styles.title}>{fav.adresse}</Text>
			// 	<Text style={styles.text}>
			// 		Adresse : {fav.ville} {fav.code_postal}
			// 	</Text>
			// 	<Text style={styles.text}>Complément d'adresse : {fav.complement_d_adresse}</Text>
			// 	<Text style={styles.text}>Horaires : {fav.horaires}</Text>
			// 	<Text style={styles.text}>Jours de tenue : {fav.jours_de_tenue}</Text>
			// </View>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<List.Section>{this.favoritesList()}</List.Section>
			</ScrollView>
		);

		// return (
		// 	<View style={styles.container}>{favorites && favorites.map((fav, i) => <Text key={i}>{fav}</Text>)}</View>
		// );
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default FavoritesList;
