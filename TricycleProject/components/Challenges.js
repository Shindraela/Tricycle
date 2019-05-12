import * as React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Headline, Text } from 'react-native-paper';
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
				<Text style={styles.text}>{challenge.name}</Text>
			</TouchableOpacity>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.column}>
					<Headline style={styles.headline}>
						Pour apprendre à mieux recycler et moins gaspiller, des missions diverses et variées vous sont
						proposées par thème. Une fois terminé, vous serez un pro du recyclage !
					</Headline>

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
		justifyContent: 'space-between',
		paddingHorizontal: 12
	},
	headline: {
		fontSize: 16
	},
	card: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%'
	},
	cardContent: {
		// backgroundColor: '#018786',
		backgroundColor: '#a5d6a7',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').width / 2,
		width: '47%',
		margin: 5
		// width: 170,
		// height: 170
	},
	infoContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	image: {
		width: 80,
		height: 80
	},
	text: {
		textAlign: 'center',
		color: '#ffffff',
		fontSize: 18,
		margin: 15
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
