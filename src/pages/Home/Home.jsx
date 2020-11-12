import React from 'react';
import { Redirect } from 'react-router-dom';

import pages from '..';


const Home = (props) => {
  const { user } = props;
  const { auth, list } = pages;
  const redirectTo = (user === null ? auth.path : list.path);

  return <Redirect to={redirectTo} />;
};

export default Home;