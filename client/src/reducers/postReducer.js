import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  LIKE_POST,
  DISLIKE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case LIKE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.forEach(post => {
            if (post._id === action.payload.postId) {
              post.likes.push(action.payload.userId);
            }
          })
        ]
      };
    case DISLIKE_POST:
      return {
        ...state,
        posts: [
          ...state.posts.map(post => {
            if (post._id === action.payload.postId) {
              post.likes = post.likes.filter(
                like => like !== action.payload.userId
              );
            }
            return post;
          })
        ]
      };
    default:
      return state;
  }
}
