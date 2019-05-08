import * as React from 'react';
import { Text, View, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { Portal, Modal, IconButton, Button } from 'react-native-paper';
import { getFav } from '../helpers';

class SpotModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	addFromFavoriteSpots = async (favoryAdded) => {
		const favorites = (await getFav()) || [];

		try {
			// Put data in users phone
			if (favorites.length == 0) {
				favorites.push(favoryAdded);
				await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
			} else {
				newFavorites = JSON.parse(favorites);
				newFavorites.push(favoryAdded);
				await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
			}
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	_addFavoriteAlert = () => {
		const { dataCurrentMarker } = this.props;

		Alert.alert(
			'Point de tri',
			'Votre point de tri a été ajouté aux favoris avec succès !',
			[ { text: 'OK', onPress: () => this.addFromFavoriteSpots(dataCurrentMarker) } ],
			{
				cancelable: false
			}
		);
	};

	render() {
		const { visible, dataCurrentMarker, close } = this.props;

		return (
			<Portal>
				<Modal visible={visible} onDismiss={close}>
					<View style={styles.modalContent}>
						<IconButton icon="close" size={24} onPress={close} />
						<View>
							<Text style={styles.title}>{dataCurrentMarker.adresse}</Text>
							<Text style={styles.text}>
								Adresse : {dataCurrentMarker.ville} {dataCurrentMarker.code_postal}
							</Text>
							<Text style={styles.text}>
								Complément d'adresse : {dataCurrentMarker.complement_d_adresse}
							</Text>
							<Text style={styles.text}>Horaires : {dataCurrentMarker.horaires}</Text>
							<Text style={styles.text}>Jours de tenue : {dataCurrentMarker.jours_de_tenue}</Text>
						</View>

						<View>
							<Button
								mode="contained"
								icon="favorite"
								onPress={this._addFavoriteAlert}
								style={styles.button}
							>
								Mettre en favori
							</Button>
						</View>
					</View>
				</Modal>
			</Portal>
		);
	}
}

const styles = StyleSheet.create({
	modalContent: {
		backgroundColor: 'rgb(255,255,255)',
		borderRadius: 5,
		margin: 10
	},
	title: {
		fontSize: 20,
		marginLeft: 10,
		fontWeight: 'bold',
		alignSelf: 'center',
		padding: 10
	},
	text: {
		fontSize: 18,
		marginLeft: 10,
		padding: 5
	},
	button: {
		padding: 5,
		margin: 20
	}
});

export default SpotModal;
