import { connect } from 'react-redux';

import {
  getList,
  addRow,
  deleteRow,
  updateSearch,
} from '../../elements/actions/list.js';
import { logOutUser } from '../../elements/actions/app.js';
import ListComponent from './List.jsx';


const mapStateToProps = (state) => ({
  rows: state.list.rows,
  selected: state.list.selected,
  search: state.list.search,
  user: state.app.user,
});

const mapDispatchToProps = (dispatch) => ({
  getList: (searchQuery) => dispatch(getList(searchQuery)),
  addRow: () => dispatch(addRow()),
  deleteRow: (id) => dispatch(deleteRow(id)),
  logOutUser: () => dispatch(logOutUser()),
  updateSearch: (search) => dispatch(updateSearch(search)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const updateSearchQuery = (searchValue) => {
    const { history, location: { pathname }} = ownProps;
    let query = pathname;

    if (searchValue !== '') {
      query += `?search=${searchValue}`;
    }

    history.replace(query);
  };

  const formatSearchQuery = (searchQuery) => {
    let formattedSearchQuery = '';
    const searchPrefix = '?search=';
  
    if (searchQuery.startsWith(searchPrefix)) {
      formattedSearchQuery = searchQuery.slice(searchPrefix.length)
        .replaceAll('%20', ' ');
    }

    return formattedSearchQuery;
  };

  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    updateSearchQuery,
    formatSearchQuery,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ListComponent);