import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import reducer from './reducer';
import AppNavigator from './navigation/AppNavigator';

const client = axios.create({
	// baseURL: 'http://10.1.240.62:3000/api',
	// baseURL: 'http://192.168.1.69:3000/api',
	baseURL: 'http://192.168.56.1:3000/api',
	responseType: 'json',
	crossdomain: true,
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json'
	},
	withCredentials: true,
	credentials: 'same-origin'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors
		// primary: 'tomato',
		// accent: 'yellow'
	}
};

export default class App extends React.Component {
	// state = {
	// 	theme: DefaultTheme,
	// 	colors: {
	// 		...DefaultTheme.colors
	// 	}
	// };

	render() {
		return (
			<StoreProvider store={store}>
				<PaperProvider theme={theme}>
					<View style={styles.container}>
						<AppNavigator />
					</View>
				</PaperProvider>
			</StoreProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
