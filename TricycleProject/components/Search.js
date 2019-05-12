import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { MapView, Location, Permissions } from 'expo';
import SpotModal from './SpotModal';

class Search extends React.Component {
	static navigationOptions = {
		title: 'Accueil'
	};

	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			visible: false,
			location: null,
			errorMessage: null,
			latitude: null,
			longitude: null,
			markers: [],
			dataCurrentMarker: {}
		};
	}

	componentWillMount() {
		this._getLocationAsync();
		// this.fetchMarkerData();
	}

	/** Get User Location */
	_getLocationAsync = async () => {
		const { latitude, longitude } = this.state;
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied',
				loaded: true
			});
		} else {
			// only check the location if it has been granted
			// you also may want to wrap this in a try/catch as async functions can throw
			let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
			this.setState({ location, loaded: true, errorMessage: null });

			if (location.coords) {
				this.setState({
					latitude: location.coords.latitude,
					longitude: location.coords.longitude
				});
			}
		}
	};

	/** Get Spots */
	fetchMarkerData() {
		fetch(
			'https://opendata.paris.fr/api/records/1.0/search/?dataset=tri-mobile0&facet=code_postal&facet=jours_de_tenue'
		)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					markers: responseJson.records
				});
				// console.log('responseJson.records :', responseJson.records);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	triggerModal(data) {
		this.setState({ visible: true, dataCurrentMarker: data });
	}

	closeModal() {
		this.setState({ visible: false });
	}

	render() {
		const { latitude, longitude } = this.state;
		// console.log('latitude, longitude :', latitude, longitude);

		// check to see if we have loaded
		if (this.state.loaded) {
			// if we have an error message show it
			if (this.state.errorMessage) {
				return (
					<View style={styles.container}>
						<Text>{JSON.stringify(this.state.errorMessage)}</Text>
					</View>
				);
			} else if (this.state.location) {
				// if we have a location show it
				return (
					<View style={styles.mapContainer} pointerEvents="box-none">
						<Button
							mode="contained"
							icon="alarm"
							onPress={() => this.props.navigation.navigate('HoursList')}
							style={styles.button}
						>
							Horaires de passage
						</Button>
						<MapView
							style={styles.map}
							region={{
								latitude: 48.8675688,
								longitude: 2.400169,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421
							}}
							// region={{
							// 	latitude: latitude,
							// 	longitude: longitude,
							// 	latitudeDelta: 0.1,
							// 	longitudeDelta: 0.1
							// }}
						>
							{this.state.isLoading ? null : (
								this.state.markers.map((marker, index) => {
									const coords = {
										latitude: marker.fields.xy[0],
										longitude: marker.fields.xy[1]
									};

									const metadata = `Tenue: ${marker.fields.jours_de_tenue}`;

									return (
										<MapView.Marker
											key={index}
											coordinate={coords}
											title={marker.fields.adresse}
											onPress={() => this.triggerModal(marker.fields)}
										/>
									);
								})
							)}
						</MapView>
						<View>
							<SpotModal
								visible={this.state.visible}
								dataCurrentMarker={this.state.dataCurrentMarker}
								close={() => this.closeModal()}
							/>
						</View>
					</View>
				);
			}
		} else {
			// if we haven't loaded show a waiting placeholder
			return (
				<View style={styles.container}>
					<Text>Waiting...</Text>
				</View>
			);
		}
	}

	// render() {
	// 	return (
	// 		<View style={styles.container}>
	// 			<View style={styles.imageContainer}>
	// 				<Image source={require('../assets/recycling_teal.png')} />
	// 			</View>
	// 			<View style={styles.column}>
	// 				<Button
	// 					mode="contained"
	// 					icon="alarm"
	// 					onPress={() => this.props.navigation.navigate('HoursList')}
	// 					style={styles.button}
	// 				>
	// 					Horaires de passage
	// 				</Button>
	// 				<Button
	// 					mode="contained"
	// 					icon="place"
	// 					onPress={() => this.props.navigation.navigate('Spots')}
	// 					style={styles.button}
	// 				>
	// 					Points de tri à proximité
	// 				</Button>
	// 			</View>
	// 		</View>
	// 	);
	// }
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	column: {
		flexDirection: 'column',
		flexWrap: 'wrap',
		paddingHorizontal: 12
	},
	mapContainer: {
		flex: 1,
		elevation: 0
	},
	map: {
		flex: 1,
		elevation: 0
	},
	imageContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		flexWrap: 'wrap',
		paddingHorizontal: 12
	},
	button: {
		margin: 20
	}
});

export default Search;
