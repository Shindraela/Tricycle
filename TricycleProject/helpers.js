import { AsyncStorage } from 'react-native';

export const getFav = () => AsyncStorage.getItem('favorites');

export const updateFav = async () => {};
