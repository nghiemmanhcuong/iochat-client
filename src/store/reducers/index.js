import {combineReducers} from 'redux';
import authReducer from './authReducer.js';
import postReducer from './postReducer.js';

const reducers = combineReducers({authReducer,postReducer});

export default reducers;