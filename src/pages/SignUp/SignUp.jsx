import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import {
  home as homeRoute,
} from '..';
import {
  emailPattern,
  MAX_EMAIL_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH
} from '../../lib/constants.js';


const SignUp = (props) => {
  const {
    email: { value: email, invalid: isEmailInvalid },
    login: { value: login, invalid: isLoginInvalid },
    password,
  } = props;

  const history = useHistory();

  const body = <div>
    <label className={'invalid-field' + isEmailInvalid ? ' shown' : ''}>
      <input
        className="form-input"
        type="text"
        size={DEFAULT_TEXT_INPUT_SIZE}
        maxLength={MAX_EMAIL_LENGTH}
        pattern={emailPattern}
        onChange={(event) => updateEmail(event.target.value)}
        value={email}
        required
      />
      Email is already in use
    </label>
    {/* TODO: ADD THE div TAG INSTEAD OF label*/}
    <label className={'invalid-field' + isLoginInvalid ? ' shown' : ''}>
      <input
        className="form-input"
        type="text"
        size={DEFAULT_TEXT_INPUT_SIZE}
        maxLength={MAX_LOGIN_LENGTH}
        onChange={(event) => updateLogin(event.target.value)}
        value={login}
        required
      />
      Login is already in use
    </label>

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
      className="auth-login-btn"
      onClick={(event) => {
        event.preventDefault();
        signUpUser({ login, password }, history);
      }}>Sign up</button>
  </div>;

  return (
    <div>
      {user !== null
        ? body
        : <Redirect to={homeRoute.path} />}
    </div>
  );
};

export default SignUp;