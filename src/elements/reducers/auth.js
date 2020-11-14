import { authTypes } from '../actions/types.js';


const initialState = {
  login: '',
  password: '',
  isFailed: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.AUTH_UPDATE_LOGIN: {
      const { login } = action;

      return { ...state, login };
    }

    case authTypes.AUTH_UPDATE_PASSWORD: {
      const { password } = action;

      return { ...state, password };
    }

    case authTypes.AUTH_RESET_FIELDS: {
      return { ...state, login: '', password: '' };
    }

    case authTypes.AUTH_SET_FAILED: {
      return { ...state, isFailed: true };
    }

    case authTypes.AUTH_RESET_FAILED: {
      return { ...state, isFailed: false };
    }

    case authTypes.AUTH_RESET_PAGE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default authReducer;