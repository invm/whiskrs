import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar bg-secondary header'>
      <Link to='/'>
        <h1>
          <i className='fa fa-cat fa-2x'></i>
          Whiskrs
        </h1>
      </Link>
      <ul>
        <Link to='/feed'>
          <li className='navbar-list-item'>Feed</li>
        </Link>
        <Link to='/profile'>
          <li className='navbar-list-item'>Profile</li>
        </Link>
        <Link to='/register'>
          <li className='navbar-list-item'>Register</li>
        </Link>
        <Link to='/login'>
          <li className='navbar-list-item'>Login</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
