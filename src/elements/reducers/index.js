import { combineReducers } from 'redux';

import auth from './auth.js';
import app from './app.js';
import signUp from './signUp.js';


const rootReducer = combineReducers({ app, auth, signUp });

export default rootReducer;