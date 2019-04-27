import * as React from 'react';
import { Modal, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { IconButton, Button } from 'react-native-paper';
import { getFav } from '../helpers';

class SpotModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	addFavory = async (favoryAdded) => {
		const favorites = (await getFav()) || [];
		try {
			newFavorites = JSON.parse(favorites);
			newFavorites.push(favoryAdded);

			// met à jour la valeur de "favorites" en local
			await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
			const bruh = await AsyncStorage.getItem('favorites');
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	render() {
		const { visible, dataCurrentMarker, close } = this.props;

		return (
			<Modal visible={visible} animationType="slide" onRequestClose={close}>
				<View style={styles.modalContent}>
					<IconButton icon="close" size={24} onPress={close} />
					<View style={styles.infoContent}>
						<Text style={styles.title}>{dataCurrentMarker.adresse}</Text>
						<Text style={styles.text}>
							Adresse : {dataCurrentMarker.ville} {dataCurrentMarker.code_postal}
						</Text>
						<Text style={styles.text}>Complément d'adresse : {dataCurrentMarker.complement_d_adresse}</Text>
						<Text style={styles.text}>Horaires : {dataCurrentMarker.horaires}</Text>
						<Text style={styles.text}>Jours de tenue : {dataCurrentMarker.jours_de_tenue}</Text>
					</View>

					<View>
						<Button
							mode="contained"
							icon={require('../assets/heart.png')}
							onPress={() => this.addFavory('cc')}
							style={styles.button}
						>
							Mettre en favori
						</Button>
					</View>
				</View>
			</Modal>
		);
	}
}

// const SpotModal = ({ visible, dataCurrentMarker, close }) => (
// 	<Modal visible={visible} animationType="slide" onRequestClose={close}>
// 		<View style={styles.modalContent}>
// 			<IconButton icon="close" size={24} onPress={close} />
// 			<View style={styles.infoContent}>
// 				<Text style={styles.title}>{dataCurrentMarker.adresse}</Text>
// 				<Text style={styles.text}>
// 					Adresse : {dataCurrentMarker.ville} {dataCurrentMarker.code_postal}
// 				</Text>
// 				<Text style={styles.text}>Complément d'adresse : {dataCurrentMarker.complement_d_adresse}</Text>
// 				<Text style={styles.text}>Horaires : {dataCurrentMarker.horaires}</Text>
// 				<Text style={styles.text}>Jours de tenue : {dataCurrentMarker.jours_de_tenue}</Text>
// 			</View>

// 			<View>
// 				<Button
// 					mode="contained"
// 					icon={require('../assets/heart.png')}
// 					onPress={() => this.addFavory('cc')}
// 					style={styles.button}
// 				>
// 					Mettre en favori
// 				</Button>
// 			</View>
// 		</View>
// 	</Modal>
// );

const styles = StyleSheet.create({
	modalContent: {
		backgroundColor: 'rgba(255,255,255,0.8)',
		width: 300,
		height: 300
	},
	infoContent: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
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
