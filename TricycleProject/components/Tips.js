import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { listCategories } from '../reducer';

class Tips extends Component {
	static navigationOptions = {
		title: 'Tips'
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
				<Text style={styles.alignCenter}>{category.name}</Text>
			</TouchableOpacity>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.card}>{this.categoriesList()}</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	card: {
		backgroundColor: '#fff',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%'
	},
	cardContent: {
		backgroundColor: '#018786',
		alignItems: 'center',
		justifyContent: 'center',
		width: 170,
		height: 170,
		margin: 10
	},
	alignCenter: {
		textAlign: 'center',
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

// export default withTheme(Tips);
