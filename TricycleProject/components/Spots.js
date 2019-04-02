import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Text, withTheme } from 'react-native-paper';
import { MapView, Constants, Location, Permissions } from 'expo';
import SpotModal from './SpotModal';

class Spots extends React.Component {
	static navigationOptions = {
		title: 'Spots'
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
			errorMessage: null,
			markers: [],
			spotData: null,
			code_postal: '75012',
			adresse: '75 rue Charenton',
			horaires: '9/18h',
			complement: 'blblbl',
			jours: 'lundi et jeudi',
			dataCurrentMarker: {}
		};
	}

	componentWillMount() {
		this._getLocationAsync();
		// this.fetchMarkerData();
	}

	/** Get User Location */
	_getLocationAsync = async () => {
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
						<MapView
							style={styles.map}
							region={{
								latitude: 48.8675688,
								longitude: 2.400169,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421
							}}
							// region={{
							// 	latitude: this.state.location.coords.latitude,
							// 	longitude: this.state.location.coords.longitude,
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
	}
});

export default withTheme(Spots);
