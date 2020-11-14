import { combineReducers } from 'redux';

import app from './app.js';
import list from './list.js';
import auth from './auth.js';
import signUp from './signUp.js';


const rootReducer = combineReducers({ app, auth, signUp, list });

export default rootReducer;