import { formatEmployeesDoc } from '../../lib/helpers.js';
import { listTypes } from '../actions/types.js';


const initialState = {
  selected: '',
  rows: [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case listTypes.LIST_SET_ROWS: {
      const { rows } = action;

      return { ...state, rows };
    }

    case listTypes.LIST_DELETE_ROW: {
      const { id } = action;
      const rowsCopy = [...state.rows];

      const modifiedRows = rowsCopy.filter((row) => row.id !== id);

      return { ...state, rows: modifiedRows };
    }

    case listTypes.LIST_SELECT_ROW: {
      const { id } = action;
      const { selected } = state;

      if (selected === id) {
        return { ...state, selected: initialState.selected };
      }

      return { ...state, selected: id };
    }

    case listTypes.LIST_RESET_SELECTED: {
      return { ...state, selected: initialState.selected };
    }

    case listTypes.LIST_ADD_ROW: {
      const formattedDoc = formatEmployeesDoc(action.row);

      const rowsCopy = [formattedDoc, ...state.rows];

      return { ...state, rows: rowsCopy };
    }

    case listTypes.LIST_UPDATE_CELL: {
      const { id, field, value } = action.data;
      const rowsCopy = [...state.rows];

      const rows = rowsCopy.reduce((accumulator, row) => {
        if (row.id === id) {
          const modifiedRow = { ...row, [field]: value };
          return [...accumulator, modifiedRow];
        }

        return [...accumulator, row];
      }, []);

      return { ...state, rows };
    }

    default: {
      return state;
    }
  }
};

export default listReducer;