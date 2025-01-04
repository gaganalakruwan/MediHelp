import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonReducer from './CommonReducer';
import authReducer from './AuthReducer';

const commonConfig = {
  key: 'common',
  storage: AsyncStorage,
};
const authConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  common: persistReducer(commonConfig, commonReducer),
  auth: persistReducer(authConfig, authReducer),
});

export default rootReducer;
