import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

class Search extends React.Component {
	static navigationOptions = {
		title: 'Recherche'
	};

	state = {
		firstQuery: ''
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.column}>
					<Button
						mode="contained"
						icon="favorite"
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
			</ScrollView>
		);
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
	button: {
		margin: 4
	}
});

export default Search;
