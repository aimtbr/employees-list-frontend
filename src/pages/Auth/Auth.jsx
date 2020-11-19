import React from 'react';
import {
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
    history,
    updateLogin,
    updatePassword,
    logInUser,
    isFailed,
  } = props;

  const body = (<div id="auth">
    <h1 id="page-title">Employees</h1>

    <div id="auth-failed">
      <span
        className={'invalid-field' + (isFailed ? ' shown' : '')}
      >Invalid login or password</span>
    </div>

    <div className="form-input-wrapper">
      <input
        className="form-input"
        type="text"
        size={DEFAULT_FORM_INPUT_SIZE}
        maxLength={MAX_LOGIN_LENGTH}
        onChange={(event) => updateLogin(event.target.value)}
        value={login}
        autoComplete="username"
        placeholder="Login"
      />
    </div>

    <div className="form-input-wrapper">
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
      />
    </div>

    <div id="auth-buttons">
      <button
        id="auth-login-btn"
        className="default-button"
        type="button"
        onClick={() => logInUser({ login, password }, history)}
      >Log in</button>

      <button
        id="auth-signup-btn"
        className="default-button"
        type="button"
        onClick={() => history.push(pages.signUp.path)}
      >Sign up</button>
    </div>
  </div>);

  return (
    user === null
      ? body
      : <Redirect to={pages.list.path} />
  );
};

export default Auth;