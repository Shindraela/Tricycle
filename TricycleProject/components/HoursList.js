import React from 'react';
import { StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';
import { getNotif } from '../helpers';

class HoursList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	constructor(props) {
		super(props);

		this.state = {
			notifications: []
		};
	}

	componentDidMount() {
		this.props.listHours();
		this.fetchNotifications();
	}

	fetchNotifications = async () => {
		try {
			const notifications = await getNotif();

			if (notifications !== null) {
				parsedNotifications = JSON.parse(notifications);

				this.setState({
					notifications: parsedNotifications
				});
			}
			console.log('hourslist fetch notifications :', notifications);
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	hoursList() {
		const { hours } = this.props;

		return hours.map((hour, index) => (
			<List.Item
				key={index}
				right={(props) => <List.Icon {...props} icon="arrow-forward" />}
				title={hour.num_arrondissement}
				onPress={() =>
					this.props.navigation.navigate('SingleHour', {
						otherParam: hour.num_arrondissement.toString()
					})}
			/>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<List.Section>{this.hoursList()}</List.Section>
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
	let storedRepositories = state.hours.map((hour) => ({ key: hour.id, ...hour }));
	return {
		hours: storedRepositories
	};
};

const mapDispatchToProps = {
	listHours
};

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
