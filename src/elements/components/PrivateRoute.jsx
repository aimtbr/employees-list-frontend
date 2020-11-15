import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import pages from '../../pages';


const PrivateRoute = (props) => {
  const {
    user,
    component,
    ...rest
  } = props;

  const isAuthorized = user !== null;

  return (
    <Route
      {...rest}
      render={
        (routeProps) => (isAuthorized
          ? component(routeProps)
          : <Redirect to={pages.auth.path} />)
      }
    />
  );
};

export default PrivateRoute;