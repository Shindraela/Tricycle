import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Favorites extends React.Component {
	static navigationOptions = {
		title: 'Favorites'
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Favorites Section</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
