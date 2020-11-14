import { connect } from 'react-redux';

import TableRowComponent from '../components/TableRow.jsx';
import { updateCell, selectRow } from '../actions/list.js';


const mapStateToProps = (state) => ({
  selected: state.list.selected,
});

const mapDispatchToProps = (dispatch) => ({
  selectRow: (id) => dispatch(selectRow(id)),
  updateCell: (data) => dispatch(updateCell(data)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const changeHandler = (id) => {
    return (event) => {
      const { name: field, value } = event.target;

      dispatchProps.updateCell({ id, field, value });
    };
  };

  return {
    changeHandler,
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
  };
};

export const TableRow = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(TableRowComponent);