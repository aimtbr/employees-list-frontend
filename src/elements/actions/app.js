import { appTypes } from './types.js';


export const setLoading = () => ({
  type: appTypes.APP_SET_LOADING,
});

export const resetLoading = () => ({
  type: appTypes.APP_RESET_LOADING,
});

export const setUser = (user) => ({
  type: appTypes.APP_SET_USER,
  user,
});

export const resetUser = () => ({
  type: appTypes.APP_RESET_USER,
});

export const logOutUser = () => {
  return async (dispatch) => {
    try {
      const { cookie } = document;
      const apiHost = process.env.API_HOST;
      const apiPort = process.env.API_PORT;
      const path = `${apiHost}:${apiPort}/users/logout`;
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Cookie': cookie
        },
      };

      const response = await fetch(path, options);
      const { ok } = response;
      
      if (!ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while trying to log the user out!');
    } finally {
      dispatch(resetUser());
    }
  };
};