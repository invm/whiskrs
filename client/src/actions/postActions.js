import axios from 'axios';
import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(response =>
      dispatch({
        type: GET_POSTS,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const addPost = post => (dispatch, getState) => {
  axios
    .post('/api/posts', post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(error =>
      dispatch(returnErrors(error.response.data, error.response.status))
    );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
