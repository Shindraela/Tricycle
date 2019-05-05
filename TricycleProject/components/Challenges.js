import * as React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { listChallenges } from '../reducer';

class Challenges extends React.Component {
	static navigationOptions = {
		title: 'Défis'
	};

	componentDidMount() {
		this.props.listChallenges();
	}

	constructor(props) {
		super(props);
		this.state = {
			challenges: [ { name: 'Cuisine' }, { name: 'Salle de bain' }, { name: 'Maison' }, { name: 'En extérieur' } ]
		};
	}

	challengesList() {
		challenges = this.state.challenges;

		return challenges.map((challenge, index) => (
			<TouchableOpacity
				key={index}
				style={styles.cardContent}
				onPress={() =>
					this.props.navigation.navigate('ChallengesList', {
						otherParam: challenge.name
					})}
			>
				<Text style={styles.alignCenter}>{challenge.name}</Text>
			</TouchableOpacity>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.column}>
					<Text style={styles.text}>Vous avez actuellement le badge</Text>
					<Text style={styles.text}>[insérez l'image du badge]</Text>
					<Text>
						Pour débloquer le prochain badge, vous devez terminer un thème et toutes ses missions. Pour
						chaque thème terminé, le badge suivant sera déverrouillé. Bonne chance !
					</Text>

					<View style={styles.card}>{this.challengesList()}</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	column: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		paddingHorizontal: 12
	},
	card: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%'
	},
	cardContent: {
		backgroundColor: '#018786',
		alignItems: 'center',
		justifyContent: 'center',
		width: 170,
		height: 170,
		margin: 10
	},
	alignCenter: {
		textAlign: 'center',
		margin: 5
	},
	text: {
		textAlign: 'center'
	}
});

const mapStateToProps = (state) => {
	let storedRepositories = state.challenges.map((challenge) => ({ key: challenge.id, ...challenge }));
	return {
		challenges: storedRepositories
	};
};

const mapDispatchToProps = {
	listChallenges
};

export default connect(mapStateToProps, mapDispatchToProps)(Challenges);

// export default withTheme(Challenges);
