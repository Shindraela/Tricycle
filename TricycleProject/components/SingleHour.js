import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Title, Paragraph, Card, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';
import { Constants, Permissions, Notifications } from 'expo';

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

	sendPushNotification(title = this.state.title, body = this.state.body) {
		const localNotification = {
			title: title,
			body: body
		};

		const schedulingOptions = {
			// time: (new Date()).getTime() + Number(e.nativeEvent.text),
			repeat: 'minute'
		};

		// Notifications show only when app is not active.
		// (ie. another app being used or device's screen is locked)
		Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions).then((response) => {
			notificationId = response;

			this.setState({
				notificationId
			});
			console.log('notificationId :', this.state.notificationId);
		});
	}

	cancelPushNotification() {
		const { notificationId } = this.state;
		console.log('REMOVE this.state.notificationId :', this.state.notificationId);
		Notifications.cancelScheduledNotificationAsync(notificationId);
	}

	handleNotification() {
		console.log('ok! got your notif');
	}

	async componentDidMount() {
		this.props.listHours();

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
					onPress={() => this.cancelPushNotification(notificationId)}
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
