import { connect } from 'react-redux';

import { resetUser } from '../actions/app.js';
import PrivateRouteComponent from '../components/PrivateRoute.jsx';


const mapStateToProps = (state) => ({
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  resetUser: () => dispatch(resetUser()),
});

export const PrivateRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteComponent);