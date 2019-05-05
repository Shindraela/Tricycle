import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, withTheme, type Theme } from 'react-native-paper';

type Props = {
	theme: Theme
};

type State = {
	loading: boolean
};

class Search extends React.Component<Props, State> {
	static navigationOptions = {
		title: 'Search'
	};

	state = {
		firstQuery: ''
	};

	render() {
		const { colors } = this.props.theme;

		return (
			<ScrollView style={[ styles.container, { backgroundColor: colors.background } ]}>
				<View style={styles.column}>
					<Button
						mode="contained"
						color={colors.accent}
						icon="favorite"
						onPress={() => this.props.navigation.navigate('HoursList')}
						style={styles.button}
					>
						Mes horaires de passage
					</Button>
					<Button
						mode="contained"
						color={colors.accent}
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

export default withTheme(Search);
