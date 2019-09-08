import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Spinner from '../layout/Spinner';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registed, setRegisted] = useState(null);

  const handleAlert = (e, show) => {
    const alert = document.querySelector(`#${e.target.id}-alert`);
    if (show) {
      alert.classList.remove('hidden');
      alert.classList.add('visible');
    } else {
      alert.classList.remove('visible');
      alert.classList.add('hidden');
    }
  };

  const handleValidation = e => {
    switch (e.target.id) {
      case 'name':
        if (e.target.value.length < 6 && e.target.value.length > 0)
          return handleAlert(e, true);
        else return handleAlert(e, false);
      case 'email':
        if (e.target.value.length < 6 && e.target.value.length > 0)
          return handleAlert(e, true);
        else return handleAlert(e, false);
      case 'password':
        if (e.target.value.length < 6 && e.target.value.length > 0)
          return handleAlert(e, true);
        else return handleAlert(e, false);
      case 'cat-name':
        if (e.target.value.length < 3 && e.target.value.length > 0)
          return handleAlert(e, true);
        else return handleAlert(e, false);
      default:
        return;
    }
  };

  const register = e => {
    e.preventDefault();
    setLoading(true);
    // Import setLoading from context
    const user = {
      name: document.querySelector('#name').value,
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
      catName: document.querySelector('#cat-name').value
    };
    if (!user.name || !user.email || !user.password || !user.catName) {
      resetPage();
      setLoading(false);
    } else {
      axios
        .post(`http://localhost:5500/api/users`, user)
        .then(function(response) {
          setLoading(false);
          setRegisted(true);
          // console.log(response.data);
        })
        .catch(function(error) {
          setLoading(false);
          setRegisted(false);
          // console.log(error);
        });
    }
  };

  const resetPage = () => {
    setRegisted(null);
  };

  if (loading) return <Spinner />;
  else if (registed) {
    return (
      <div className='success-register'>
        <h2>Successfully registed</h2>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </div>
    );
  } else if (registed === false) {
    return (
      <div className='success-register'>
        <h2>
          Did not register, email already in system, try a different email.
        </h2>
        <button onClick={resetPage}>Register Again</button>
      </div>
    );
  } else
    return (
      <div>
        <form action='register' className='register-form tc fade-in'>
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' onChange={handleValidation} />
          <p className='alert hidden' id='name-alert'>
            Must be at least 6 characters
          </p>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' onChange={handleValidation} />
          <p className='alert hidden' id='email-alert'>
            Must be a valid email
          </p>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={handleValidation} />
          <p className='alert hidden' id='password-alert'>
            Must be at least 6 characters
          </p>
          <label htmlFor='catName'>Cat Name</label>
          <input type='text' id='cat-name' onChange={handleValidation} />
          <p className='alert hidden' id='cat-name-alert'>
            Must be at least 3 characters
          </p>
          <button type='submit' onClick={register}>
            Register
          </button>
        </form>
      </div>
    );
};

export default Register;
