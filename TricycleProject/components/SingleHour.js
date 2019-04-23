import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Title, Caption, Paragraph, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';
import { getFav } from '../helpers';

class SingleHour extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listHours();
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	theHour() {
		const { hours } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return hours.filter((hour) => hour.num_arrondissement == otherParam).map((hour, index) => (
			<Card.Content key={index}>
				<Title>{hour.num_arrondissement} arrondissement</Title>
				<Paragraph>{hour.horaire_poub_jaune}</Paragraph>
				<Paragraph>{hour.horaire_poub_verte}</Paragraph>
				<Paragraph>{hour.horaire_poub_blanche}</Paragraph>
			</Card.Content>
		));
	}

	addFavory = async (favoryAdded) => {
		const favorites = (await getFav()) || [];
		try {
			console.log('Vincent', favorites);

			favorites.push(favoryAdded);
			// met à jour la valeur de "favorites" en local
			await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
			const bruh = await AsyncStorage.getItem('favorites');
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	render() {
		return (
			<ScrollView style={[ styles.container ]}>
				<Card style={styles.card}>{this.theHour()}</Card>

				<TouchableOpacity onPress={() => this.addFavory('slt')}>
					<Text>Ajouter aux favoris</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		margin: 5
	}
});

const mapStateToProps = (state) => {
	let storedRepositories = state.hours.map((tip) => ({ key: hour.id, ...hour }));
	return {
		hours: storedRepositories
	};
};

const mapDispatchToProps = {
	listHours
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleHour);

// export default withTheme(SingleTips);
