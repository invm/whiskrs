import React, { useReducer } from 'react';
import axios from 'axios';
import WhiskrsContext from './whiskrsContext';
import WhiskrsReducer from './whiskrsReducer';
import { SET_LOADING, FETCH_POSTS } from '../types';

const WhiskrsState = props => {
  const initialState = {
    user: {
      name: 'Michael',
      userId: 1
    },
    posts: [],
    userPosts: [],
    loading: false
  };

  const [state, dispatch] = useReducer(WhiskrsReducer, initialState);

  window.addEventListener('DOMContentLoaded', event => {
    setLoading();
    (async function() {
      let posts = [];
      await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(response => {
          response.data.map(item => posts.push(item));
          // console.log(posts);
        })
        .catch(error => {
          console.log(error);
        });

      dispatch({
        type: FETCH_POSTS,
        payload: posts
      });
    })();
  });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <WhiskrsContext.Provider
      value={{
        user: state.user,
        posts: state.posts
      }}>
      {props.children}
    </WhiskrsContext.Provider>
  );
};

export default WhiskrsState;
