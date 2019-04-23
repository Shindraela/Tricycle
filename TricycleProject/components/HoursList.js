import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { listHours } from '../reducer';

class HoursList extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('otherParam')
		};
	};

	componentDidMount() {
		this.props.listHours();
	}

	constructor(props) {
		super(props);
		this.state = {};
	}

	hoursList() {
		const { hours } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');
		console.log('otherParam :', otherParam);

		return hours.map((hour, index) => (
			<List.Item
				key={index}
				right={(props) => <List.Icon {...props} icon="arrow-forward" />}
				title={hour.num_arrondissement}
				onPress={() =>
					this.props.navigation.navigate('SingleHour', {
						otherParam: hour.num_arrondissement
					})}
			/>
		));
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<List.Section>{this.hoursList()}</List.Section>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

const mapStateToProps = (state) => {
	console.log('state :', state);
	let storedRepositories = state.hours.map((hour) => ({ key: hour.id, ...hour }));
	return {
		hours: storedRepositories
	};
};

const mapDispatchToProps = {
	listHours
};

export default connect(mapStateToProps, mapDispatchToProps)(HoursList);
