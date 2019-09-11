import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

import Spinner from '../layout/Spinner';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(null);

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

  const isValidEmail = email => {
    let emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(`${email}`);
  };
  const handleValidation = e => {
    switch (e.target.id) {
      case 'name':
        if (e.target.value.length < 6 && e.target.value.length > 0)
          return handleAlert(e, true);
        else return handleAlert(e, false);
      case 'email':
        if (!isValidEmail(e.target.value) && e.target.value.length > 0)
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
          setRegistered(true);
        })
        .catch(function(error) {
          setLoading(false);
          setRegistered(false);
        });
    }
  };

  const resetPage = () => {
    setRegistered(null);
  };

  if (loading) return <Spinner />;
  else if (registered) {
    return (
      <div className='success-register'>
        <Alert color='secondary'>Successfully registered</Alert>
        <Link to='/login'>
          <Button color='dark' style={{ marginBottom: '2rem' }}>
            Login
          </Button>
        </Link>
      </div>
    );
  } else if (registered === false) {
    return (
      <div className='success-register'>
        <Alert color='secondary'>
          Did not register, email already in system, try a different email.
        </Alert>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={resetPage}>
          Register Again
        </Button>
      </div>
    );
  } else
    return (
      <div>
        <Form action='register' className='register-form tc fade-in'>
          <FormGroup>
            <Label htmlFor='name'>Name</Label>
            <Input type='text' id='name' onChange={handleValidation} />
            <Alert color='secondary' className='hidden' id='name-alert'>
              Must be at least 6 characters
            </Alert>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' onChange={handleValidation} />
            <Alert color='secondary' className='hidden' id='email-alert'>
              Must be a valid email
            </Alert>
            <Label htmlFor='password'>Password</Label>
            <Input type='password' id='password' onChange={handleValidation} />
            <Alert color='secondary' className='hidden' id='password-alert'>
              Must be at least 6 characters
            </Alert>
            <Label htmlFor='catName'>Cat Name</Label>
            <Input type='text' id='cat-name' onChange={handleValidation} />
            <Alert color='secondary' className='hidden' id='cat-name-alert'>
              Must be at least 3 characters
            </Alert>
            <Button
              className='my-4'
              block
              color='dark'
              style={{ marginBottom: '2rem' }}
              type='submit'
              onClick={register}>
              Register
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
};

export default Register;
