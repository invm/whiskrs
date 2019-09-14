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

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false
    };
  }

  componentDidMount() {
    this.props.getPosts();
    this.setState({ ...this.state, loading: true });
    const id = window.location.pathname.slice(
      9,
      window.location.pathname.length
    );
    axios
      .get(`/api/users/${id}`)
      .then(res => this.setState({ user: res.data, loading: false }))
      .catch(err =>
        this.setState({
          msg: 'No user with such id',
          loading: false
        })
      );
  }

  render() {
    const { user, loading, msg } = this.state;
    if (loading) return <Spinner />;
    else
      return (
        <div className='fade-in profile-page tc'>
          {msg ? <h3>{msg}</h3> : <User user={user} />}
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
  { getPosts, deletePost, setPostsLoading }
)(Profile);
