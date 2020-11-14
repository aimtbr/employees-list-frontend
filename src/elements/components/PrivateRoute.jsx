import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import pages from '../../pages';


const PrivateRoute = (props) => {
  const {
    user,
    resetUser, // TODO: REMOVE
    children,
    ...rest
  } = props;

  const isAuthorized = user !== null;
  // resetUser();

  return (
    <Route
      {...rest}
      render={
        () => (isAuthorized
          ? children
          : <Redirect to={pages.auth.path} />)
      }
    />
  );
};

export default PrivateRoute;