import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import User from '../auth/User';
import PostList from '../posts/PostList';
import Spinner from '../layout/Spinner';
import {
  getPosts,
  deletePost,
  setPostsLoading
} from '../../actions/postActions';
import { updateUser } from '../../actions/authActions';

//TODO when going to personal profile from other profile, previous user passed to User component

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        _id: ''
      },
      loading: false
    };
  }

  componentDidMount() {
    this.props.getPosts();
    this.setState({ ...this.state, loading: true });
    const { id } = this.props.props.match.params;
    if (id !== this.state.user._id)
      axios
        .get(`/api/users/user/${id}`)
        .then(res => this.setState({ user: res.data, loading: false }))
        .catch(err =>
          this.setState({
            msg: 'No user with such id',
            loading: false
          })
        );
  }

  onUpdateClick = user => {
    this.setState({
      ...this.state,
      loading: true
    });
    this.props.updateUser(user);
    this.setState({
      ...this.state,
      loading: false
    });
  };

  render() {
    const { user, loading, msg } = this.state;

    // Always get user from url, if changed from previous, update user in state.
    const { id } = this.props.props.match.params;
    if (user._id !== id) {
      axios.get(`/api/users/user/${id}`).then(res =>
        this.setState({
          ...this.state,
          user: res.data,
          loading: false
        })
      );
    }

    if (loading) return <Spinner />;
    else
      return (
        <div className='fade-in profile-page tc'>
          {msg ? (
            <h3>{msg}</h3>
          ) : (
            <User onUpdateClick={this.onUpdateClick} user={user} />
          )}
          <PostList
            loading={this.props.post.loading}
            setPostsLoading={this.props.setPostsLoading}
            deletePost={this.props.deletePost}
            posts={this.props.post.posts}
            user={user ? user : ''}
          />
        </div>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  // user: state.auth.user,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost, setPostsLoading, updateUser }
)(Profile);
