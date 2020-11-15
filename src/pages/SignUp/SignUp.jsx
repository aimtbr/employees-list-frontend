import React from 'react';
import { Redirect } from 'react-router-dom';


import {
  emailPattern,
  MAX_EMAIL_LENGTH,
  MAX_LOGIN_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  DEFAULT_FORM_INPUT_SIZE,
} from '../../lib/constants.js';

import pages from '..';


const SignUp = (props) => {
  const {
    user,
    email: { value: email, invalid: isEmailInvalid },
    login: { value: login, invalid: isLoginInvalid },
    password: { value: password, invalid: isPasswordInvalid },
    history,
    updateEmail,
    updateLogin,
    updatePassword,
    signUpUser,
  } = props;

  const isAuthorized = user !== null;

  const body = <div>
    <label className="pre-field-label">
      Email:
      <input
        className="form-input"
        type="email"
        size={DEFAULT_FORM_INPUT_SIZE}
        maxLength={MAX_EMAIL_LENGTH}
        pattern={emailPattern}
        onChange={(event) => updateEmail(event.target.value)}
        autoComplete="email"
        value={email}
        required
      />
    </label>
    <div className={'invalid-field' + (isEmailInvalid ? ' shown' : '')}>
      Email is already in use
    </div>

    <label className="pre-field-label">
      Login:
      <input
        className="form-input"
        type="text"
        size={DEFAULT_FORM_INPUT_SIZE}
        maxLength={MAX_LOGIN_LENGTH}
        onChange={(event) => updateLogin(event.target.value)}
        autoComplete="username"
        value={login}
        required
      />
    </label>
    <div className={'invalid-field' + (isLoginInvalid ? ' shown' : '')}>
      Login is already in use
    </div>

    <label className="pre-field-label">
      Password:
      <input
        className="form-input"
        type="password"
        size={DEFAULT_FORM_INPUT_SIZE}
        minLength={MIN_PASSWORD_LENGTH}
        maxLength={MAX_PASSWORD_LENGTH}
        onChange={(event) => updatePassword(event.target.value)}
        autoComplete="new-password"
        value={password}
        required
      />
    </label>
    <div className={'invalid-field' + (isPasswordInvalid ? ' shown' : '')}>
      Invalid password
    </div>

    <button
      className="signup-btn"
      onClick={(event) => {
        event.preventDefault();

        signUpUser({ email, login, password }, history);
      }}>Sign up</button>

    <button
      id="go-back-btn"
      type="button"
      onClick={() => history.replace(pages.auth.path)}
    >Back</button>
  </div>;

  return (
    <div>
      {isAuthorized
        ? <Redirect to={pages.list.path} />
        : body}
    </div>
  );
};

export default SignUp;