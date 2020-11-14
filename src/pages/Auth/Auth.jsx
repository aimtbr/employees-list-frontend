import React from 'react';
import {
  useHistory,
  Redirect,
  Link,
} from 'react-router-dom';

import pages from '..';
import {
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  DEFAULT_FORM_INPUT_SIZE,
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

  const body = (<div>
    <div
      id="auth-failed"
      className={'invalid-field' + (isFailed ? ' shown' : '')}
    >Invalid login or password</div>

    <input
      className="form-input"
      type="text"
      size={DEFAULT_FORM_INPUT_SIZE}
      maxLength={MAX_LOGIN_LENGTH}
      onChange={(event) => updateLogin(event.target.value)}
      value={login}
      autoComplete="username"
      placeholder="Login"
      required
    />

    <input
      className="form-input"
      type="password"
      size={DEFAULT_FORM_INPUT_SIZE}
      minLength={MIN_PASSWORD_LENGTH}
      maxLength={MAX_PASSWORD_LENGTH}
      onChange={(event) => updatePassword(event.target.value)}
      value={password}
      autoComplete="current-password"
      placeholder="Password"
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

    <Link to={pages.signUp.path} id="auth-signup-btn">Sign up</Link>
  </div>);

  return (
    user === null
      ? body
      : <Redirect to={pages.list.path} />
  );
};

export default Auth;