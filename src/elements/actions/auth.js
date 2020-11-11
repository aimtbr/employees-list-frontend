import config from 'config';

import { list as listRoute } from '../../pages';
import { authTypes } from './types.js';
import { setUser, setLoading, resetLoading } from './app.js';
import { encryptAES } from '../../lib/helpers.js';


export const updateLogin = (login) => ({
  type: authTypes.AUTH_UPDATE_LOGIN,
  login,
});

export const updatePassword = (password) => ({
  type: authTypes.AUTH_UPDATE_PASSWORD,
  password,
});

export const resetLogin = () => ({
  type: authTypes.AUTH_RESET_LOGIN,
});

export const resetPassword = () => ({
  type: authTypes.AUTH_RESET_PASSWORD,
});

export const setAuthFailed = () => ({
  type: authTypes.AUTH_SET_FAILED,
});

export const resetAuthFailed = () => ({
  type: authTypes.AUTH_RESET_FAILED,
});

export const logInUser = (credentials, history) => {
  return async (dispatch) => {
    const cookies = document.cookie;
    const apiHost = config.get('api.host');
    const path = `${apiHost}/users/auth`;
    const body = encryptAES(JSON.stringify(credentials));
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'text/plain',
        'Cookie': cookies
      },
      body,
    };

    dispatch(setLoading());

    const response = await fetch(path, options);
    const { status, ok } = response;
    const data = await response.json();

    dispatch(resetLoading());

    if (status === 403) {
      dispatch(setAuthFailed());
    } else if (ok) {
      dispatch(setUser(data));
    }

    history.replace(listRoute.path);
  }
};