import { connect } from 'react-redux';

import SignUpComponent from './SignUp.jsx';
import {
  signUpUser,
  updateEmail,
  updateLogin,
  updatePassword,
} from '../../elements/actions/signUp.js';


const mapStateToProps = (state) => ({
  user: state.app.user,
  email: state.signUp.email,
  login: state.signUp.login,
  password: state.signUp.password,
});

const mapDispatchToProps = (dispatch) => ({
  signUpUser: (credentials, history) => dispatch(signUpUser(credentials, history)),
  updateEmail: (email) => dispatch(updateEmail(email)),
  updateLogin: (login) => dispatch(updateLogin(login)),
  updatePassword: (password) => dispatch(updatePassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpComponent);