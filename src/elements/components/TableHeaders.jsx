import React from 'react';


export const TableHeaders = (props) => {
  const {
    headers,
  } = props;

  const columns = headers.map(({ id, value }) => (
    <th key={id} id={id}>{value}</th>
  ));

  return (
    <tr id="employees-list-headers">
      {columns}
    </tr>
  );
};