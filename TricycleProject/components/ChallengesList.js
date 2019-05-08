import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { listChallenges } from '../reducer';
import { getMissions } from '../helpers';

class ChallengesList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Défis ' + navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listChallenges();
		this.fetchMissions();
	}

	constructor(props) {
		super(props);

		this.state = {
			missions: [],
			challengeCategory: [],
			isChecked: []
		};
	}

	fetchMissions = async () => {
		try {
			const missions = await getMissions();
			const { navigation, challenges } = this.props;
			const { isChecked, challengeCategory } = this.state;
			const otherParam = navigation.getParam('otherParam');

			if (missions !== null) {
				parsedMissions = JSON.parse(missions);

				this.setState({
					missions: parsedMissions
				});

				challenges.filter((challenge) => challenge.category == otherParam).map((challenge, index) => {
					challengeCategory.push(challenge.name);
				});

				// Check if mission is already a success, disabled the button for accomplish it
				parsedMissions.map((mission, index) => {
					challengeCategory.map((missionName, index) => {
						// Check if the mission is in tab and status to true
						if (mission.status == true && mission.otherParam == missionName) {
							let tabChecked = this.state.isChecked;
							tabChecked.push(missionName);

							// Update checked table with missions
							this.setState({
								isChecked: tabChecked
							});
						}
					});
				});
			}
			// console.log('fetch missions : ', missions);
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	challengesList() {
		const { challenges } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return challenges.filter((challenge) => challenge.category == otherParam).map((challenge, index) => (
			<List.Item
				key={index}
				right={(props) =>
					this.state.isChecked.includes(challenge.name) ? (
						<List.Icon {...props} icon="check" />
					) : (
						<List.Icon {...props} icon="arrow-forward" />
					)}
				title={challenge.name}
				onPress={() =>
					this.props.navigation.navigate('SingleChallenge', {
						otherParam: challenge.name
					})}
			/>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<List.Section>{this.challengesList()}</List.Section>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesList);

// export default withTheme(TipsList);
