import React, { useEffect } from 'react';

import { headers } from './structure.js';
import Table from '../../elements/components/Table.jsx';
import deleteButton from '../../../public/delete_button.png';
import logOutButton from '../../../public/log_out_button.png';

import './styles.css';


const List = (props) => {
  const {
    rows,
    user,
    search,
    selected,
    location,
    getList,
    logOutUser,
    addRow,
    deleteRow,
    updateSearch,
    updateSearchQuery,
    formatSearchQuery
  } = props;

  const searchQuery = location.search;
  const isSearchQueryValid = searchQuery === '' || searchQuery.startsWith('?search=');
  const formattedSearchQuery = formatSearchQuery(searchQuery);

  useEffect(() => {
    if (isSearchQueryValid) {
      getList(searchQuery);
      updateSearch(formattedSearchQuery);
    }
  }, [searchQuery]);

  const isUserProfileHidden = user === null ? 'hidden' : '';
  const shownWhenSelected = selected === '' ? 'hidden' : '';
  const userProfileName = user && user.email;

  return (
    <div>
      <input
        type="search"
        size="10"
        placeholder="Search"
        id="search-input"
        onChange={(event) => {
          const { value } = event.target;
          updateSearchQuery(value);
          updateSearch(value);
        }}
        value={search}
      />

      <button
        type="button"
        id="add-row-btn"
        onClick={() => addRow()}
      >+</button>

      <button
        type="button"
        id="delete-row-btn"
        className={shownWhenSelected}
        onClick={() => deleteRow(selected)}
      >
        <img src={deleteButton} />
      </button>

      <div
        id="user-profile"
        className={isUserProfileHidden}
      >
        <label>
          {userProfileName}
        </label>
        <button
          id="log-out-btn"
          type="button"
          onClick={() => logOutUser()}
        ><img src={logOutButton} /></button>
      </div>

      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default List;