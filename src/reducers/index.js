import {combineReducers} from 'redux';

import usersReducer from './usersReducer';
import profileReducer from './profileReducer';

import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['users'],
};

const rootReducer = combineReducers({
  users: usersReducer,
  profile: profileReducer,
});

export default persistReducer(persistConfig, rootReducer);
