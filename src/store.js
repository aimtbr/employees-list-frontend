import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'localForage';

import rootReducer from './elements/reducers';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['signUp', 'app']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export {
  store,
  persistor,
};