import { AsyncStorage } from 'react-native';

export const getFav = () => AsyncStorage.getItem('favorites');
export const getNotif = () => AsyncStorage.getItem('notifications');
export const getMissions = () => AsyncStorage.getItem('missions');
