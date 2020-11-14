import pages from '../../pages';
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

export const resetPage = () => ({
  type: authTypes.AUTH_RESET_PAGE,
})

export const logInUser = (credentials, history) => {
  return async (dispatch) => {
    try {
      const apiHost = process.env.API_HOST;
      const apiPort = process.env.API_PORT;
      const path = `${apiHost}:${apiPort}/users/auth`;
      const body = encryptAES(JSON.stringify(credentials));
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'text/plain',
        },
        body,
      };

      dispatch(setLoading());

      const response = await fetch(path, options).catch(console.error);
      const { status, ok } = response;

      if (ok) {
        const data = await response.json();

        dispatch(setUser(data));
        dispatch(resetPage());

        history.replace(pages.list.path);
      } else if (status === 403) {
        dispatch(setAuthFailed());
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(resetLoading());
    }
  };
};