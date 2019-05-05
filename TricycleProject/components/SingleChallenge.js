import React from 'react';
import { StyleSheet, ScrollView, Alert, AsyncStorage } from 'react-native';
import { Title, Caption, Paragraph, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { listChallenges } from '../reducer';
import { getMissions } from '../helpers';

class SingleChallenge extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	constructor(props) {
		super(props);

		this.state = {
			missions: []
		};
	}

	async componentDidMount() {
		this.props.listChallenges();
		this.fetchMissions();
	}

	fetchMissions = async () => {
		try {
			const missions = await getMissions();

			if (missions !== null) {
				parsedMissions = JSON.parse(missions);

				this.setState({
					missions: parsedMissions
				});
			}
			// console.log('fetch missions : ', missions);
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	theChallenge() {
		const { challenges } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return challenges.filter((challenge) => challenge.name == otherParam).map((challenge, index) => (
			<Card.Content key={index}>
				<Title>{challenge.name}</Title>
				<Caption>{challenge.category}</Caption>
				<Paragraph>{challenge.text}</Paragraph>
			</Card.Content>
		));
	}

	_updateChallengeStatus = async () => {
		const { missions } = this.state;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');
		const value = true;

		missions.push({ otherParam, value });
		await AsyncStorage.setItem('missions', JSON.stringify(missions));
		// console.log('missions : ', missions);
	};

	_showAlert = () => {
		Alert.alert(
			'Mission',
			'Votre mission a été accompli avec succès !',
			[ { text: 'OK', onPress: () => this._updateChallengeStatus() } ],
			{ cancelable: false }
		);
	};

	render() {
		return (
			<ScrollView style={[ styles.container ]}>
				<Card style={styles.card}>{this.theChallenge()}</Card>

				<Button mode="contained" icon="check" onPress={this._showAlert} style={styles.button}>
					Valider la mission
				</Button>
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
	},
	button: {
		margin: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleChallenge);
