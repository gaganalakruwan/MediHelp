import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import commonReducer from './CommonReducer';

const commonConfig = {
  key: 'common',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  common: persistReducer(commonConfig, commonReducer),
});

export default rootReducer;
