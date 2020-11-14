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
  return async (dispatch) => {
    try {
      const { id, field, value } = data;
      const { cookie } = document;
      const path = `${apiHost}:${apiPort}/api/employee/${id}`;
      const changes = { [field]: value };
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

      const response = await fetch(path, options);
      const { ok } = response;

      if (ok) {
        dispatch(updateCellState(data));
      } else {
        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while updating a cell');
    }
  };
};

export const deleteRow = (id) => {
  return async (dispatch, getState) => {
    try {
      if (!id) {
        throw new Error('Incorrect row ID has been passed.');
      }

      const { cookie } = document;
      const { list: rows } = getState();
      const path = `${apiHost}:${apiPort}/api/employee/${id}`;
      const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Cookie': cookie
        },
      };

      dispatch(deleteRowState(id));

      const response = await fetch(path, options);
      const { ok } = response;

      if (!ok) {
        dispatch(setRows(rows)); // back the previous rows state

        const { error } = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while deleting a row!');
    } finally {
      dispatch(resetSelected());
    }
  };
};

export const getList = () => {
  return async (dispatch) => {
    try {
      const { cookie } = document;
      const path = `${apiHost}:${apiPort}/api/employees`;
      const options = {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Cookie': cookie
        }
      };

      dispatch(setLoading());

      const response = await fetch(path, options);
      const { ok } = response;
      const data = await response.json();

      if (ok) {
        const rows = data.reduce((accumulator, doc) => {
          const formattedDoc = formatEmployeesDoc(doc);

          return [...accumulator, formattedDoc];
        }, []);

        dispatch(setRows(rows));
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while loading the list!');
    } finally {
      dispatch(resetLoading());
    }
  };
};