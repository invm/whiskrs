import axios from 'axios';
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  LIKE_POST,
  DISLIKE_POST
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(response => {
      return dispatch({
        type: GET_POSTS,
        payload: response.data
      });
    })
    .catch(error =>
      dispatch(
        returnErrors(
          error || {}.response || {}.data,
          error || {}.response || {}.status
        )
      )
    );
};

export const addPost = post => (dispatch, getState) => {
  const tokenConfigLocal = getState => {
    const token = getState().auth.token;
    const config = {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    };
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  };
  const formData = new FormData();
  formData.set('body', post.body);
  formData.append('name', post.name);
  formData.append('userId', post.userId);
  formData.append('postImage', post.postImage);
  axios
    .post('/api/posts', formData, tokenConfigLocal(getState))
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch(
        returnErrors(
          error || {}.response || {}.data,
          error || {}.response || {}.status
        )
      )
    );
};

export const deletePost = id => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(error =>
      dispatch(
        returnErrors(
          error || {}.response || {}.data,
          error || {}.response || {}.status
        )
      )
    );
};

export const likePost = (userId, postId) => (dispatch, getState) => {
  const body = JSON.stringify({ userId, _id: postId });
  axios
    .put(`/api/posts/like${postId}`, body, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LIKE_POST,
        payload: userId,
        postId
      })
    )
    .catch(error =>
      dispatch(
        returnErrors(
          error || {}.response || {}.data,
          error || {}.response || {}.status
        )
      )
    );
};

export const dislikePost = (userId, postId) => (dispatch, getState) => {
  const body = JSON.stringify({ userId, _id: postId });
  axios
    .put(`/api/posts/dislike:${postId}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: DISLIKE_POST,
        payload: userId,
        postId
      });
    })
    .catch(error =>
      dispatch(
        returnErrors(
          error || {}.response || {}.data,
          error || {}.response || {}.status
        )
      )
    );
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
