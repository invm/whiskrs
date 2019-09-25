import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USERS_LOADED
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err || {}.response || {}.data,
          err || {}.response || {}.status
        )
      );
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = ({
  name,
  email,
  password,
  catName,
  avatar
}) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ name, email, password, catName, avatar });

  axios
    .post('/api/users', body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err || {}.response || {}.data,
          err || {}.response || {}.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(
          err || {}.response || {}.data,
          err || {}.response || {}.status,
          'LOGIN_FAIL'
        )
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

export const updateUser = ({ _id, name, email, catName }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, catName });

  axios
    .put(`/api/users/user/${_id}`, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(error =>
      console.log(
        error || {}.response || {}.data,
        error || {}.response || {}.status
      )
    );
};

export const loadUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res =>
      dispatch({
        type: USERS_LOADED,
        payload: res.data
      })
    )
    .catch(error => {
      console.log(
        error || {}.response || {}.data,
        error || {}.response || {}.status
      );
    });
};
