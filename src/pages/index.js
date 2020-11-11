import Auth from './Auth';
import SignUp from './SignUp';
import List from './List';
import NotFound from './NotFound';


const pages = {
  home: {
    path: '/',
    component: Home,
  },
  auth: {
    path: '/auth',
    component: Auth,
  },
  list: {
    path: '/list',
    component: List,
  },
  signUp: {
    path: '/signup',
    component: SignUp,
  },
  notFound: {
    path: '*',
    component: NotFound,
  }
};

export default pages;