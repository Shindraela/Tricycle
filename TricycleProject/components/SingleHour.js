import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Title, Paragraph, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';

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

	render() {
		return (
			<ScrollView style={styles.container}>
				<Card style={styles.card}>{this.theHour()}</Card>

				<TouchableOpacity style={styles.button} onPress={() => {}}>
					<Text>Etre notifié</Text>
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
	},
	button: {
		alignItems: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10
	}
});

const mapStateToProps = (state) => {
	let storedRepositories = state.hours.map((hour) => ({ key: hour.id, ...hour }));
	return {
		hours: storedRepositories
	};
};

const mapDispatchToProps = {
	listHours
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleHour);

// export default withTheme(SingleTips);
