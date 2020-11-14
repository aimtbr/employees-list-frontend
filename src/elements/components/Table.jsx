import React from 'react';

import { TableHeaders } from '../components/TableHeaders.jsx';
import { TableRow } from '../containers/TableRow.js';


const Table = (props) => {
  const {
    headers,
    rows,
  } = props;

  const headerKeys = headers.map(({ key }) => key);

  const setRows = rows.map(
    (row) => <TableRow key={row.id} headerKeys={headerKeys} row={row} />
  );

  return (
    <div id="employees-list-wrapper">
      <table id="employees-list">
        <thead>
          <TableHeaders headers={headers} />
        </thead>
        <tbody>
          {setRows}
        </tbody>
      </table>
    </div>
  );
};

export default Table;