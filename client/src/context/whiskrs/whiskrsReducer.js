import { FETCH_POSTS, SET_LOADING } from '../types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
