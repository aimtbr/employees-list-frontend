import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import {
  home as homeRoute,
  signUp as signUpRoute,
} from '..';
import {
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH
} from '../../lib/constants.js';

import './styles.css';


const Auth = (props) => {
  const {
    user,
    login,
    password,
    updateLogin,
    updatePassword,
    logInUser,
    isFailed,
  } = props;

  const history = useHistory();

  const body = <div>
    <div
      id="auth-failed"
      className={'invalid-field' + isFailed ? ' shown' : ''}
    ></div>

    <input
      className="form-input"
      type="text"
      size={DEFAULT_TEXT_INPUT_SIZE}
      maxLength={MAX_LOGIN_LENGTH}
      onChange={(event) => updateLogin(event.target.value)}
      value={login}
      required
    />

    <input
      className="form-input"
      type="text"
      size={DEFAULT_TEXT_INPUT_SIZE}
      maxLength={MAX_PASSWORD_LENGTH}
      onChange={(event) => updatePassword(event.target.value)}
      value={password}
      required
    />

    <button
      id="auth-login-btn"
      onClick={(event) => {
        event.preventDefault();
        logInUser({ login, password }, history);
      }}
    >Log in</button>

    <span> / </span>

    <Link to={signUpRoute.path} id="auth-signup-btn">Sign up</Link>
  </div>;

  return (
    <div>
      {user !== null
        ? body
        : <Redirect to={homeRoute.path} />}
    </div>
  );
};

export default Auth;