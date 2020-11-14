import { appTypes } from '../actions/types.js';


const initialState = {
  isLoading: false,
  user: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case appTypes.APP_SET_LOADING: {
      return { ...state, isLoading: true };
    }

    case appTypes.APP_RESET_LOADING: {
      return { ...state, isLoading: false };
    }

    case appTypes.APP_SET_USER: {
      return { ...state, user: action.user };
    }

    case appTypes.APP_RESET_USER: {
      return { ...state, user: null };
    }

    default: {
      return state;
    }
  }
};

export default appReducer;