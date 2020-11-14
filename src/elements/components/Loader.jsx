import React from 'react';

import loader from '../../../public/loader_oval.svg';


const Loader = ({ isLoading }) => (
  isLoading
    ? <img id="loader" src={loader} />
    : null
);

export default Loader;