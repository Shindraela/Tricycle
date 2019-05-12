import React from 'react';
import { StyleSheet, ScrollView, AsyncStorage, Alert } from 'react-native';
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
			title: null,
			body: null,
			notifications: [],
			isNotified: [],
			districts: [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20'
			]
		};
	}

	async componentDidMount() {
		this.props.listHours();
		this.fetchNotifications();

		// We need to ask for Notification permissions for ios devices
		let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

		if (Constants.isDevice && result.status === 'granted') {
			console.log('Notification permissions granted.');
		}

		// If we want to do something with the notification when the app
		// is active, we need to listen to notification events and handle them in a callback
		Notifications.addListener(this.handleNotification);

		// For testing, remove all notifications
		// let notif = await AsyncStorage.removeItem('notifications');

		// if (notif == null) {
		// 	const { notifications } = this.state;
		// 	console.log('notifications :', notifications);
		// }
		// Notifications.cancelAllScheduledNotificationsAsync();
	}

	componentWillMount() {
		this.forceUpdating();
		this.props.navigation.addListener('willFocus', this.forceUpdating);
	}

	forceUpdating = () => {
		this.fetchNotifications();
	};

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
		const { districts } = this.state;

		try {
			const notifications = await getNotif();

			if (notifications !== null) {
				parsedNotifications = JSON.parse(notifications);

				this.setState({
					notifications: parsedNotifications
				});

				// Check if district is already a success, disable the button
				parsedNotifications.map((notif, index) => {
					districts.map((dist) => {
						if (notif.status == true && notif.otherParam == dist) {
							let tabNotified = this.state.isNotified;
							tabNotified.push(dist);

							// Update checked table with district
							this.setState({
								isNotified: tabNotified
							});
						}
					});
				});
			}
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	sendPushNotification = async () => {
		const { notifications } = this.state;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');
		const { hours } = this.props;
		const status = true;
		let currentDate = new Date();
		let currentDay = currentDate.getDay();
		let title = null;
		let body = null;

		hours.map((hour, index) => {
			if (hour.num_arrondissement == 1) {
				if (currentDay == 1 || currentDay == 4) {
					title = 'Ordures pour la poubelle jaune';
					body = hour.horaire_poub_jaune;
				} else if (currentDay == 1 || currentDay == 6) {
					title = 'Ordures pour la poubelle verte';
					body = hour.horaire_poub_verte;
				} else if (currentDay == 4) {
					title = 'Ordures pour la poubelle blanche';
					body = hour.horaire_poub_blanche;
				} else {
					return;
				}

				this.setState({
					title,
					body
				});
			}

			if (hour.num_arrondissement == 3) {
				if (currentDay == 2 || currentDay == 5) {
					title = 'Ordures pour la poubelle jaune';
					body = hour.horaire_poub_jaune;
				} else if (currentDay) {
					title = 'Ordures pour la poubelle verte';
					body = hour.horaire_poub_verte;
				} else if (currentDay == 2) {
					title = 'Ordures pour la poubelle blanche';
					body = hour.horaire_poub_blanche;
				} else {
					return;
				}

				this.setState({
					title,
					body
				});
			}
		});

		const localNotification = {
			title: title,
			body: body
		};

		const schedulingOptions = {
			repeat: 'minute'
		};

		try {
			// Notifications show only when app is not active.
			// (ie. another app being used or device's screen is locked)
			Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions)
				.then((response) => {
					notifications.push({ otherParam, response, status });

					this.setState({
						notifications
					});
				})
				.finally(async () => {
					await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
				});
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	cancelPushNotification() {
		const { notifications } = this.state;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		// Method for update notifications array
		AsyncStorage.getAllKeys().then(async (keys) =>
			AsyncStorage.multiGet(keys).then(async (result) => {
				result.map(async (req) => {
					let parsedReq = JSON.parse(req[1]);

					parsedReq.forEach(async (item) => {
						// Remove item where notif is equal to the otherParam param
						if (JSON.stringify(item.otherParam) == JSON.stringify(otherParam)) {
							try {
								// Retrieve indexOf item where otherParam is equal to item.otherParam
								let notifId = null;
								const index = notifications
									.map(function(elm) {
										if (elm.otherParam == otherParam) {
											notifId = elm.response;
										}

										return elm.otherParam;
									})
									.indexOf(item.otherParam);

								// Then remove it from the notifications array
								if (index > -1) {
									notifications.splice(index, 1);
								}

								// If notifications table is empty, cancel all notifications by default
								if (notifications.length == 0) {
									Notifications.cancelAllScheduledNotificationsAsync();
								}

								// Finally, set the spliced favorite in local storage
								// And remove from local notifications
								Notifications.cancelScheduledNotificationAsync(notifId);
								await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
							} catch (exception) {
								console.log(exception);
							}
						}
					});
				});
			})
		);
	}

	handleNotification() {
		console.log('ok! got your notif');
	}

	_AddNotificationAlert = () => {
		Alert.alert(
			'Notification activée',
			'La notification pour cette arrondissement a été activé !',
			// [ { text: 'OK', onPress: () => {} } ],
			[ { text: 'OK', onPress: () => this.sendPushNotification() } ],
			{
				cancelable: false
			}
		);
	};

	_removeNotificationAlert = () => {
		Alert.alert(
			'Notification désactivée',
			'La notification pour cette arrondissement a été désactivé !',
			// [ { text: 'OK', onPress: () => {} } ],
			[ { text: 'OK', onPress: () => this.cancelPushNotification() } ],
			{
				cancelable: false
			}
		);

		this.setState({
			isDisabled: true
		});
	};

	render() {
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return (
			<ScrollView style={styles.container}>
				<Card style={styles.card}>{this.theHour()}</Card>

				<Button
					mode="contained"
					icon="favorite"
					onPress={this._AddNotificationAlert}
					style={styles.button}
					disabled={this.state.isNotified.includes(otherParam) ? true : false}
				>
					Etre notifié
				</Button>

				<Button
					mode="contained"
					icon="favorite"
					onPress={this._removeNotificationAlert}
					style={styles.button}
					disabled={!this.state.isNotified.includes(otherParam) ? true : false}
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
