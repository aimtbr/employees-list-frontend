import { connect } from 'react-redux';

import PrivateRouteComponent from '../components/PrivateRoute.jsx';


const mapStateToProps = (state) => ({
  user: state.user,
});

export const PrivateRoute = connect(mapStateToProps)(PrivateRouteComponent);