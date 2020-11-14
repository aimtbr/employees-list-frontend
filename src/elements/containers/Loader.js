import { connect } from 'react-redux';

import LoaderComponent from '../components/Loader.jsx';


const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
});

export const Loader = connect(mapStateToProps)(LoaderComponent);