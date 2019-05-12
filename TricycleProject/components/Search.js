import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

class Search extends React.Component {
	static navigationOptions = {
		title: 'Accueil'
	};

	state = {
		firstQuery: ''
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image source={require('../assets/recycling_teal.png')} />
				</View>
				<View style={styles.column}>
					<Button
						mode="contained"
						icon="alarm"
						onPress={() => this.props.navigation.navigate('HoursList')}
						style={styles.button}
					>
						Horaires de passage
					</Button>
					<Button
						mode="contained"
						icon="place"
						onPress={() => this.props.navigation.navigate('Spots')}
						style={styles.button}
					>
						Points de tri à proximité
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	headline: {
		textAlign: 'center',
		padding: 5
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
		margin: 4
	}
});

export default Search;
