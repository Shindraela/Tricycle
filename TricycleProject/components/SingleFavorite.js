import React from 'react';
import { StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Title, Caption, Paragraph, Card, Button, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { listSpots } from '../reducer';
import { getFav } from '../helpers';

class SingleFavorite extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listSpots();
		this.fetchFavorites();

		// setTimeout(() => {
		// 	this.spotsContent();
		// }, 1000);
	}

	constructor(props) {
		super(props);

		this.state = {
			favorites: [],
			currentSpotImage: null,
			favoriteSpotKey: null,
			spotToRemove: null
		};
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

	removeFromFavoriteSpots = async () => {
		const { favorites } = this.state;
		const { navigation } = this.props;
		const spotToRemove = navigation.getParam('otherParam');

		// Get the name spot to remove
		this.setState({
			spotToRemove
		});

		// Method for update favorites array
		AsyncStorage.getAllKeys().then(async (keys) =>
			AsyncStorage.multiGet(keys).then(async (result) => {
				result.map(async (req) => {
					let parsedReq = JSON.parse(req[1]);

					parsedReq.forEach(async (item) => {
						// Remove item where adresse is equal to the spotToRemove param
						if (JSON.stringify(item.adresse) == JSON.stringify(spotToRemove)) {
							try {
								// Retrieve indexOf item where adresse is equal to item.adresse
								const index = favorites
									.map(function(elm) {
										return elm.adresse;
									})
									.indexOf(item.adresse);

								// Then remove it from the favorites array
								if (index > -1) {
									favorites.splice(index, 1);
								}

								// Finally, set the spliced favorite in local storage
								await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
							} catch (exception) {
								console.log(exception);
							}
						}
					});
				});
			})
		);
	};

	spotsContent() {
		const { navigation, spots } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return spots.filter((spot) => spot.adresse == otherParam).map((spot, index) => {
			<Card.Cover source={{ uri: spot.image }} />;
		});
	}

	theFavoriteSpot() {
		favorites = this.state.favorites;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return favorites.filter((fav) => fav.adresse == otherParam).map((fav, index) => (
			<Card.Content key={index}>
				<Title>{fav.adresse}</Title>
				<Caption>
					{fav.ville} {fav.code_postal}
				</Caption>
				<Paragraph>Complément d'adresse : {fav.complement_d_adresse}</Paragraph>
				<Paragraph>Horaires : {fav.horaires}</Paragraph>
				<Paragraph>Jours de tenue : {fav.jours_de_tenue}</Paragraph>
			</Card.Content>
		));
	}

	render() {
		const { spots } = this.props;
		console.log('spots :', spots);

		if (spots) {
			return (
				<ScrollView style={styles.container}>
					<Card style={styles.card}>{this.spotsContent()}</Card>
					<Card style={styles.card}>{this.theFavoriteSpot()}</Card>

					<Button
						mode="contained"
						icon="favorite"
						onPress={() => this.removeFromFavoriteSpots()}
						style={styles.button}
					>
						Enlever des favoris
					</Button>
				</ScrollView>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		margin: 5
	},
	button: {
		padding: 5,
		margin: 20
	}
});

const mapStateToProps = (state) => {
	let storedRepositories = state.spots.map((spot) => ({ key: spot.id, ...spot }));
	return {
		spots: storedRepositories
	};
};

const mapDispatchToProps = {
	listSpots
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleFavorite);
