import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { listChallenges } from '../reducer';

class ChallengesList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Défis ' + navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listChallenges();
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	challengesList() {
		const { challenges } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return challenges.filter((challenge) => challenge.category == otherParam).map((challenge, index) => (
			<List.Item
				key={index}
				right={(props) => <List.Icon {...props} icon="arrow-forward" />}
				title={challenge.name}
				onPress={() =>
					this.props.navigation.navigate('SingleChallenge', {
						otherParam: challenge.name
					})}
			/>
		));
	}

	render() {
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

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
