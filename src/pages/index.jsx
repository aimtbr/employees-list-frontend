import React from 'react';

import Home from './Home';
import Auth from './Auth';
import SignUp from './SignUp';
import List from './List';
import NotFound from './NotFound';


const pages = {
  home: {
    path: '/',
    component: <Home />,
  },
  auth: {
    path: '/auth',
    component: (props) => <Auth {...props} />,
  },
  list: {
    path: '/list',
    component: (props) => <List {...props} />,
  },
  signUp: {
    path: '/signup',
    component: (props) => <SignUp {...props} />,
  },
  notFound: {
    path: '*',
    component: <NotFound />,
  }
};

export default pages;