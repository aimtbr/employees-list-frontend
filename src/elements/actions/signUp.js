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

export const resetInvalidFields = (fields) => ({
  type: signUpTypes.SIGNUP_RESET_FIELDS_INVALID,
  fields,
});

export const resetPage = () => ({
  type: signUpTypes.SIGNUP_RESET_PAGE,
});

export const signUpUser = (credentials, history) => {
  return async (dispatch) => {
    const apiHost = process.env.API_HOST;
    const apiPort = process.env.API_PORT;
    const cookies = document.cookie;
    const path = `${apiHost}:${apiPort}/users/signup`;
    const body = encryptAES(JSON.stringify(credentials));
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Cookie': cookies
      },
      body,
    };

    dispatch(setLoading());

    const response = await fetch(path, options).catch(console.error);
    const { status, ok } = response;

    if (ok) {
      dispatch(resetPage());

      alert('The user has been successfully created!');

      history.replace(pages.auth.path);
    } else if (status === 403) {
      const data = await response.json();
      const { props: propsAlreadyInUse } = data;

      dispatch(setInvalidFields(propsAlreadyInUse));
    } else {
      console.error('Something went wrong while creating a user account!');
    }

    dispatch(resetLoading());
  };
};