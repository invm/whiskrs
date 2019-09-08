import React from 'react';

const Login = () => (
  <form className='login-form fade-in'>
    <label htmlFor='email'>Email</label>
    <input type='email' name='' id='login-email' />
    <label htmlFor='password'>Password</label>
    <input type='password' name='' id='login-password' />
    <button>Login</button>
  </form>
);

export default Login;
