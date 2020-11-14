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

