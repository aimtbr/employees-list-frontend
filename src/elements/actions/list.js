import { formatEmployeesDoc } from '../../lib/helpers.js';
import { setLoading, resetLoading } from './app.js';
import { listTypes } from './types.js';


const apiHost = process.env.API_HOST;
const apiPort = process.env.API_PORT;

export const deleteRowState = (id) => ({
  type: listTypes.LIST_DELETE_ROW,
  id,
});

export const addRowState = (row) => ({
  type: listTypes.LIST_ADD_ROW,
  row,
});

export const selectRow = (id) => ({
  type: listTypes.LIST_SELECT_ROW,
  id,
});

export const resetSelected = () => ({
  type: listTypes.LIST_RESET_SELECTED,
});

export const setRows = (rows) => ({
  type: listTypes.LIST_SET_ROWS,
  rows,
});

export const updateCellState = (data) => ({
  type: listTypes.LIST_UPDATE_CELL,
  data,
});

export const updateSearch = (search) => ({
  type: listTypes.LIST_UPDATE_SEARCH,
  search,
});

export const addRow = () => {
  return async (dispatch) => {
    try {
      const { cookie } = document;
      const path = `${apiHost}:${apiPort}/api/employee`;
      const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Cookie': cookie
        },
      };

      const response = await fetch(path, options);
      const { ok } = response;
      const data = await response.json();

      if (ok) {
        dispatch(addRowState(data));
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while creating a row!');
    }
  };
};

export const updateCell = (data) => {
  return async (dispatch, getState) => {
    const prevRowsState = getState().list.rows;

    try {
      const { id, field, value } = data;
      const { cookie } = document;

      const path = `${apiHost}:${apiPort}/api/employee/${id}`;
      const preparedValue = value.toString().trim();
      const changes = { [field]: preparedValue };
      const body = JSON.stringify(changes);
      const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookie
        },
        body
      };

      dispatch(updateCellState(data));

      const response = await fetch(path, options);
      const { statusText, ok } = response;

      if (!ok) {
        const { error } = await response.json();
        throw new Error(error || statusText);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while updating a cell');

      dispatch(setRows(prevRowsState));
    }
  };
};

export const deleteRow = (id) => {
  return async (dispatch, getState) => {
    // store the rows before them gets updated, to be able to get back to it
    const prevRowsState = getState().list.rows;

    try {
      const { cookie } = document; // get the document cookie in order to send on the server
      const path = `${apiHost}:${apiPort}/api/employee/${id}`;
      const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Cookie': cookie
        },
      };

      const isDeletionApproved = confirm('Delete the selected row?');

      if (!isDeletionApproved) {
        return null;
      }
      // update the store
      dispatch(deleteRowState(id));

      const response = await fetch(path, options);
      const { ok } = response;

      // redirect an error from response to the catch block
      if (!ok) {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
      // notify a user (TODO: replace with a notifications module)
      alert('Something went wrong while deleting a row!');

      dispatch(setRows(prevRowsState)); // return the previous rows state
    } finally {
      // reset the selected row despite of deleted it or not
      dispatch(resetSelected());
    }
  };
};

export const getList = (searchQuery = '') => {
  return async (dispatch) => {
    try {
      const { cookie } = document;
      const path = `${apiHost}:${apiPort}/api/employees${searchQuery}`;
      const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cookie': cookie
        }
      };

      dispatch(setLoading());

      const response = await fetch(path, options);
      const { statusText, ok } = response;
      const data = await response.json();

      if (ok) {
        const rows = data.reduce((accumulator, doc) => {
          const formattedDoc = formatEmployeesDoc(doc);

          return [...accumulator, formattedDoc];
        }, []);

        dispatch(setRows(rows));
      } else {
        throw new Error(data.error || statusText);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while loading the list!');
    } finally {
      dispatch(resetLoading());
    }
  };
};