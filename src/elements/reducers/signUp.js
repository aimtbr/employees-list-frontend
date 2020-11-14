import { signUpTypes } from '../actions/types.js';


const initialState = {
  email: {
    value: '',
    invalid: false,
  },
  login: {
    value: '',
    invalid: false,
  },
  password: {
    value: ''
  },
};

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case signUpTypes.SIGNUP_SET_FIELD_VALUE: {
      const { field, value } = action;
      const allowedFields = ['email', 'login', 'password'];

      if (allowedFields.includes(field)) {
        const fieldObject = state[field];

        return { ...state, [field]: { ...fieldObject, value } };
      }

      return state;
    }

    case signUpTypes.SIGNUP_SET_FIELDS_INVALID: {
      const { fields } = action;
      const allowedFields = ['email', 'login'];
      const modifiedFields = {};

      fields.forEach((field) => {
        if (allowedFields.includes(field)) {
          const { fieldObject } = state[field];
          modifiedFields[field] = { ...fieldObject, value: '', invalid: true };
        }
      });

      return { ...state, ...modifiedFields };
    }

    case signUpTypes.SIGNUP_RESET_FIELDS_INVALID: {
      const { fields } = action;
      const allowedFields = ['email', 'login'];
      const modifiedFields = {};

      fields.forEach((field) => {
        if (allowedFields.includes(field)) {
          const { fieldObject } = state[field];

          modifiedFields[field] = { ...fieldObject, invalid: false };
        }
      });

      return { ...state, ...modifiedFields };
    }

    case signUpTypes.SIGNUP_RESET_PAGE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default signUpReducer;