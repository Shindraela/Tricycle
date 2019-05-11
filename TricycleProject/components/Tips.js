import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';
import { connect } from 'react-redux';
import { listCategories } from '../reducer';

class Tips extends Component {
	static navigationOptions = {
		title: 'Astuces'
	};

	componentDidMount() {
		this.props.listCategories();
	}

	categoriesList() {
		const { categories } = this.props;

		return categories.map((category, index) => (
			<TouchableOpacity
				key={index}
				style={styles.cardContent}
				onPress={() =>
					this.props.navigation.navigate('TipsList', {
						otherParam: category.name
					})}
			>
				<Text style={styles.text}>{category.name}</Text>
			</TouchableOpacity>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.column}>
					<Headline style={styles.headline}>
						Pour éviter de gaspiller au maximum, cette section propose quelques astuces de DIY par thème que
						vous pourrez mettre en pratique avec des objets que vous utilisez au quotidien !
					</Headline>
					<View style={styles.card}>{this.categoriesList()}</View>
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
		justifyContent: 'space-between',
		paddingHorizontal: 12
	},
	headline: {
		fontSize: 18
	},
	card: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%'
	},
	cardContent: {
		// backgroundColor: '#018786',
		backgroundColor: '#a5d6a7',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: 170,
		height: 170,
		margin: 10
	},
	text: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 20,
		margin: 5
	},
	stretch: {
		resizeMode: 'center',
		width: '100%',
		height: 60,
		alignSelf: 'center'
	}
});

const mapStateToProps = (state) => {
	let storedRepositories = state.categories.map((category) => ({ key: category.id, ...category }));
	return {
		categories: storedRepositories
	};
};

const mapDispatchToProps = {
	listCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(Tips);
