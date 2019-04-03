import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Title, Caption, Paragraph, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { listChallenges } from '../reducer';
import axios from 'axios';

class SingleChallenge extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listChallenges();
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

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
		try {
			// return axios.post('http://192.168.56.1:3000/api/missions')
			return null;
		} catch (error) {
			console.error(error);
		}
	};

	_showAlert = () => {
		// console.log('this.props :', this.props);
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
