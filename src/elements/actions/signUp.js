import pages from '../../pages';
import { signUpTypes } from './types.js';
import { encryptAES } from '../../lib/helpers.js';
import { setLoading, resetLoading } from './app.js';


export const updateEmail = (value) => ({
  type: signUpTypes.SIGNUP_SET_FIELD_VALUE,
  field: 'email',
  value,
});

export const updateLogin = (value) => ({
  type: signUpTypes.SIGNUP_SET_FIELD_VALUE,
  field: 'login',
  value,
});

export const updatePassword = (value) => ({
  type: signUpTypes.SIGNUP_SET_FIELD_VALUE,
  field: 'password',
  value,
});

export const setInvalidFields = (fields) => ({
  type: signUpTypes.SIGNUP_SET_FIELDS_INVALID,
  fields,
});

export const resetPage = () => ({
  type: signUpTypes.SIGNUP_RESET_PAGE,
});

export const signUpUser = (credentials, history) => {
  return async (dispatch) => {
    try {
      const apiHost = process.env.API_HOST;
      const apiPort = process.env.API_PORT;
      const path = `${apiHost}:${apiPort}/users/signup`;
      const body = encryptAES(JSON.stringify(credentials));
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body,
      };

      dispatch(setLoading());

      const response = await fetch(path, options);
      const { status, statusText, ok } = response;

      if (ok) {
        dispatch(resetPage());

        alert('The user has been successfully created!');

        history.replace(pages.auth.path);
      } else {
        const data = await response.json();

        if (status === 403) {
          const { props: invalidProps } = data;

          dispatch(setInvalidFields(invalidProps));
        } else {
          throw new Error(statusText);
        }
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while creating a user account!');
    } finally {
      dispatch(resetLoading());
    }
  };
};