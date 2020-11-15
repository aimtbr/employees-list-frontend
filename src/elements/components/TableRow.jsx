import React from 'react';

import {
  DEFAULT_GENDER,
  DEFAULT_POSITION,
  DEFAULT_CONTACTS,
  POSITIONS_ENUM,
  GENDERS_ENUM,
} from '../../lib/constants.js';
import { formatDate } from '../../lib/helpers.js';


const TableRow = (props) => {
  const {
    row,
    headerKeys,
    selected,
    selectRow,
    changeHandler,
  } = props;

  const {
    id,
    fullName,
    gender = DEFAULT_GENDER,
    contacts = DEFAULT_CONTACTS,
    position = DEFAULT_POSITION,
    salary = 0,
    dateAdded,
  } = row;

  const isRowSelected = selected === id;

  const genderOptions = GENDERS_ENUM.map((genderValue) => (
    <option key={genderValue} value={genderValue}>{genderValue}</option>
  ));
  const positionOptions = POSITIONS_ENUM.map((positionValue) => (
    <option key={positionValue} value={positionValue}>{positionValue}</option>
  ));

  const localeTime = dateAdded.toLocaleTimeString();
  const formattedDateAdded = formatDate(dateAdded);

  const elements = {
    checkbox: {
      element: (value) => (
        <input
          type="checkbox"
          checked={value}
          onChange={() => selectRow(id)}
        />
      ),
      className: "row-checkbox-input",
      value: isRowSelected,
    },
    fullName: {
      element: (value) => (
        <input
          name="fullName"
          type="text"
          maxLength='100'
          onChange={changeHandler(id)}
          value={value}
        />
      ),
      className: "row-text-input",
      value: fullName,
    },
    gender: {
      element: (value) => (
        <select
          name="gender"
          onChange={changeHandler(id)}
          value={value}
        >
          {genderOptions}
        </select>
      ),
      className: "row-select-gender",
      value: gender,
    },
    contacts: {
      element: (value) => (
        <input
          name="contacts"
          type="tel"
          maxLength="23"
          onChange={changeHandler(id)}
          value={value}
        />
      ),
      className: "row-tel-input",
      value: contacts,
    },
    position: {
      element: (value) => (
        <select
          name="position"
          onChange={changeHandler(id)}
          value={value}
        >
          {positionOptions}
        </select>
      ),
      className: "row-select-position",
      value: position,
    },
    salary: {
      element: (value) => (
        <input
          name="salary"
          type="number"
          min="0"
          max="99999"
          maxLength="5"
          onChange={changeHandler(id)}
          value={value === null ? 0 : value}
        />
      ),
      className: "row-number-input",
      value: salary,
    },
    dateAdded: {
      element: (value) => (
        <span title={localeTime}>
          {value}
        </span>
      ),
      className: "row-date-added",
      value: formattedDateAdded,
    }
  };

  const cells = headerKeys.map((key) => {
    const { element, value, className } = elements[key];

    return (
      <td key={`${id}-${key}`} className={className}>
        {element(value)}
      </td>
    );
  });

  return (
    <tr key={id} id={id}>
      {cells}
    </tr>
  );
};

export default TableRow;