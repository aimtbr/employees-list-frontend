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

import './styles.css';


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

  const body = (
    <div id="signup">
      <h1 id="page-title">Sign up</h1>

      <div id="signup-form">
        <div className="signup-form-group-wrapper">
          <div className="signup-form-group">
            <label className="prefield-label">
              Email:
            </label>
            <input
              className="form-input"
              type="email"
              size={DEFAULT_FORM_INPUT_SIZE}
              maxLength={MAX_EMAIL_LENGTH}
              pattern={emailPattern}
              onChange={(event) => updateEmail(event.target.value)}
              autoComplete="email"
              value={email}
              placeholder="your email"
              required
            />
          </div>
          <div className={'invalid-field' + (isEmailInvalid ? ' shown' : '')}>
            Email is already in use
          </div>
        </div>

        <div className="signup-form-group-wrapper">
          <div className="signup-form-group">
            <label className="prefield-label">
              Login:
            </label>
            <input
              className="form-input"
              type="text"
              size={DEFAULT_FORM_INPUT_SIZE}
              maxLength={MAX_LOGIN_LENGTH}
              onChange={(event) => updateLogin(event.target.value)}
              autoComplete="username"
              value={login}
              placeholder="new login"
              required
            />
          </div>
          <div className={'invalid-field' + (isLoginInvalid ? ' shown' : '')}>
            Login is already in use
          </div>
        </div>

        <div className="signup-form-group-wrapper">
          <div className="signup-form-group">
            <label className="prefield-label">
              Password:
            </label>
            <input
              className="form-input"
              type="password"
              size={DEFAULT_FORM_INPUT_SIZE}
              minLength={MIN_PASSWORD_LENGTH}
              maxLength={MAX_PASSWORD_LENGTH}
              onChange={(event) => updatePassword(event.target.value)}
              autoComplete="new-password"
              value={password}
              placeholder="new password"
              required
            />
          </div>
          <div className={'invalid-field' + (isPasswordInvalid ? ' shown' : '')}>
            Invalid password
          </div>
        </div>
      </div>

      <div id="signup-buttons">
        <button
          id="create-account-btn"
          className="default-button"
          type="button"
          onClick={() => signUpUser({ email, login, password }, history)}
        >Create account</button>

        <button
          id="back-btn"
          className="default-button"
          type="button"
          onClick={() => history.replace(pages.auth.path)}
        >Back</button>
      </div>
    </div>
  );

  return (isAuthorized
    ? <Redirect to={pages.list.path} />
    : body
  );
};

export default SignUp;