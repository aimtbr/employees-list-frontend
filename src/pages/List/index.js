import { connect } from 'react-redux';

import {
  getList,
  addRow,
  deleteRow
} from '../../elements/actions/list.js';
import { logOutUser } from '../../elements/actions/app.js';
import ListComponent from './List.jsx';


const mapStateToProps = (state) => ({
  rows: state.list.rows,
  selected: state.list.selected,
  user: state.app.user
});

const mapDispatchToProps = (dispatch) => ({
  getList: () => dispatch(getList()),
  addRow: () => dispatch(addRow()),
  deleteRow: (id) => dispatch(deleteRow(id)),
  logOutUser: () => dispatch(logOutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent);