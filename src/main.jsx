import 'dotenv/config';
import React from 'react';
import { render } from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import pages from './pages';
import { Loader } from './elements/containers/Loader.js';
import { PrivateRoute } from './elements/containers/PrivateRoute.js';
import { store, persistor } from './store.js';

import './main.css';


render(
  (<Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Loader />
        <Switch>
          <Route exact path={pages.home.path}>
            {pages.home.component}
          </Route>
          <Route path={pages.auth.path}>
            {pages.auth.component}
          </Route>
          <PrivateRoute path={pages.list.path}>
            {pages.list.component}
          </PrivateRoute>
          <Route path={pages.signUp.path}>
            {pages.signUp.component}
          </Route>
          <Route path={pages.notFound.path}>
            {pages.notFound.component}
          </Route>
        </Switch>
      </Router>
    </PersistGate>
  </Provider>),
  document.getElementById('root')
);