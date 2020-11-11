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
import { PrivateRoute } from './elements/containers/PrivateRoute.js';
import { store, persistor } from './store.js';


render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
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
        </Switch>
      </Router>
    </PersistGate>
  </Provider>
);