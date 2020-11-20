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
    <table id="table">
      <thead>
        <TableHeaders headers={headers} />
      </thead>
      <tbody>
        {setRows}
      </tbody>
    </table>
  );
};

export default Table;