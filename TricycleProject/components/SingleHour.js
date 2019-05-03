import React from 'react';
import { StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import { Title, Paragraph, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';
import { Constants, Permissions, Notifications } from 'expo';
import { getNotif } from '../helpers';

class SingleHour extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	constructor(props) {
		super(props);

		this.state = {
			title: 'Hello World',
			body: 'Say something!',
			notifications: []
		};
	}

	async componentDidMount() {
		this.props.listHours();
		this.fetchNotifications();
		// let notif = await AsyncStorage.removeItem('notifications');

		// if (notif == null) {
		// 	const { notifications } = this.state;
		// 	console.log('notifications :', notifications);
		// }

		// We need to ask for Notification permissions for ios devices
		let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

		if (Constants.isDevice && result.status === 'granted') {
			console.log('Notification permissions granted.');
		}

		// If we want to do something with the notification when the app
		// is active, we need to listen to notification events and
		// handle them in a callback
		Notifications.addListener(this.handleNotification);

		Notifications.cancelAllScheduledNotificationsAsync();
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

	fetchNotifications = async () => {
		try {
			const notifications = await getNotif();

			if (notifications !== null) {
				parsedNotifications = JSON.parse(notifications);

				this.setState({
					notifications: parsedNotifications
				});
			}
			console.log('fetch notifications :', notifications);
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	sendPushNotification = async (title = this.state.title, body = this.state.body) => {
		const { notifications } = this.state;
		console.log('notifications :', notifications);
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		const localNotification = {
			title: title,
			body: body
		};

		const schedulingOptions = {
			// time: (new Date()).getTime() + Number(e.nativeEvent.text),
			repeat: 'minute'
		};

		try {
			// Notifications show only when app is not active.
			// (ie. another app being used or device's screen is locked)
			Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
				.then((response) => {
					notifications.push({ otherParam, response });

					this.setState({
						notifications
					});
					console.log('notifications :', notifications);
				})
				.finally(async () => {
					console.log('notifications stringify :', JSON.stringify(notifications));
					await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
				});
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	cancelPushNotification() {
		const { notifications } = this.state;
		console.log('REMOVE notifications :', notifications);
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		notifications
			.filter((notif) => notif.otherParam == otherParam)
			.map((notif, index) => Notifications.cancelScheduledNotificationAsync(notif));

		// TODO : add remove notif from AsyncStorage
	}

	handleNotification() {
		console.log('ok! got your notif');
	}

	render() {
		const { notificationId } = this.state;

		return (
			<ScrollView style={styles.container}>
				<Card style={styles.card}>{this.theHour()}</Card>

				<Button
					mode="contained"
					icon="favorite"
					onPress={() => this.sendPushNotification()}
					style={styles.button}
				>
					Etre notifié
				</Button>

				<Button
					mode="contained"
					icon="favorite"
					onPress={() => this.cancelPushNotification()}
					style={styles.button}
				>
					Ne plus être notifié
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
		padding: 5,
		margin: 20
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
