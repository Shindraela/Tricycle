import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Title, Caption, Paragraph, Card } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';

class HoursList extends Component {
	static navigationOptions = {
		title: 'Hours'
	};

	componentDidMount() {
		this.props.listHours();
	}

	// renderItem = ({ item }) => (
	// 	<View style={styles.item}>
	// 		<Text>{item.num_arrondissement}</Text>
	// 	</View>
	// );

	renderHours() {
		const { hours } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return hours.map((hour, index) => (
			<Card.Content key={index}>
				<Title>{hour.num_arrondissement} arrondissement</Title>
				<Paragraph>{hour.horaire_poub_jaune}</Paragraph>
				<Paragraph>{hour.horaire_poub_verte}</Paragraph>
				<Paragraph>{hour.horaire_poub_blanche}</Paragraph>
			</Card.Content>
		));
	}

	// render() {
	// 	const { hours } = this.props;
	// 	return <FlatList styles={styles.container} data={hours} renderItem={this.renderItem} />;
	// }

	render() {
		return (
			<ScrollView style={[ styles.container ]}>
				<Card style={styles.card}>{this.renderHours()}</Card>
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
	let storedRepositories = state.hours.map((hour) => ({ key: hour.id, ...hour }));
	return {
		hours: storedRepositories
	};
};

const mapDispatchToProps = {
	listHours
};

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
