import { Route, Redirect } from 'react-router-dom';

import { auth as authRoute } from '../../pages';


const PrivateRoute = (props) => {
  const { user, children, ...rest } = props;

  return (
    <Route
      {...rest}
      render={() => (user === null
        ? <Redirect to={authRoute.path} />
        : children)}
    />
  );
};

export default PrivateRoute;