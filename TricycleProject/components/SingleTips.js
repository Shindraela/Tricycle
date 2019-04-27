import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import { Title, Caption, Paragraph, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { listTips } from '../reducer';
import { getFav } from '../helpers';

class SingleTips extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listTips();
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	theTip() {
		const { tips } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return tips.filter((tip) => tip.name == otherParam).map((tip, index) => (
			<Card.Content key={index}>
				<Title>{tip.name}</Title>
				<Caption>{tip.category}</Caption>
				<Paragraph>{tip.text}</Paragraph>
			</Card.Content>
		));
	}

	addFavory = async (favoryAdded) => {
		const favorites = (await getFav()) || [];
		try {
			console.log('Vincent', favorites);

			favorites.push(favoryAdded);
			// met à jour la valeur de "favorites" en local
			await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
			const bruh = await AsyncStorage.getItem('favorites');
		} catch (error) {
			// Error retrieving data
			console.log(error);
		}
	};

	render() {
		return (
			<ScrollView style={[ styles.container ]}>
				<Card style={styles.card}>{this.theTip()}</Card>

				<TouchableOpacity onPress={() => this.addFavory('slt')}>
					<Text>Ajouter aux favoris</Text>
				</TouchableOpacity>
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
	}
});

const mapStateToProps = (state) => {
	let storedRepositories = state.tips.map((tip) => ({ key: tip.id, ...tip }));
	return {
		tips: storedRepositories
	};
};

const mapDispatchToProps = {
	listTips
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTips);

// export default withTheme(SingleTips);
