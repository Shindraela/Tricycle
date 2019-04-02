import React from 'react';
import { StyleSheet, Text, ScrollView, View, Image, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import { connect } from 'react-redux';
import { listTips } from '../reducer';

class TipsList extends React.Component {
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

	tipsList() {
		const { tips } = this.props;
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return tips.filter((tip) => tip.category == otherParam).map((tip, index) => (
			<List.Item
				key={index}
				right={(props) => <List.Icon {...props} icon="arrow-forward" />}
				title={tip.name}
				onPress={() =>
					this.props.navigation.navigate('SingleTips', {
						otherParam: tip.name
					})}
			/>
		));
	}

	render() {
		const { navigation } = this.props;
		const otherParam = navigation.getParam('otherParam');

		return (
			<ScrollView style={styles.container}>
				<List.Section>{this.tipsList()}</List.Section>
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
	let storedRepositories = state.tips.map((tip) => ({ key: tip.id, ...tip }));
	return {
		tips: storedRepositories
	};
};

const mapDispatchToProps = {
	listTips
};

export default connect(mapStateToProps, mapDispatchToProps)(TipsList);

// export default withTheme(TipsList);
