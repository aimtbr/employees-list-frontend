import { connect } from 'react-redux';

import AuthComponent from './Auth.jsx';
import { logInUser, updateLogin, updatePassword } from '../../elements/actions/auth.js';


const mapStateToProps = (state) => ({
  user: state.app.user,
  login: state.auth.login,
  password: state.auth.password,
  isFailed: state.auth.isFailed,
});

const mapDispatchToProps = (dispatch) => ({
  logInUser: (credentials, history) => dispatch(logInUser(credentials, history)),
  updateLogin: (login) => dispatch(updateLogin(login)),
  updatePassword: (password) => dispatch(updatePassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);