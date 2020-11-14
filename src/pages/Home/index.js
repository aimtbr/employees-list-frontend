import { connect } from 'react-redux';

import HomeComponent from './Home.jsx';


const mapStateToProps = (state) => ({
  user: state.app.user,
});

export default connect(mapStateToProps)(HomeComponent)