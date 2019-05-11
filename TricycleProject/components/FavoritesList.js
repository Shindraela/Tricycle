import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
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
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<List.Section>{this.favoritesList()}</List.Section>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default FavoritesList;
