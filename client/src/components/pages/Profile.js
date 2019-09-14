import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import User from '../auth/User';
import PostList from '../posts/PostList';
import Spinner from '../layout/Spinner';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    const id = window.location.pathname.slice(
      9,
      window.location.pathname.length
    );
    axios
      .get(`/api/users/${id}`)
      .then(res => this.setState({ user: res.data, loading: false }))
      .catch(err => {
        if (err.response.data.success === false)
          this.setState({
            user: {
              name: 'No user with such id'
            },
            loading: false
          });
      });
  }

  render() {
    const { user, loading } = this.state;
    if (loading) return <Spinner />;
    else
      return (
        <div className='fade-in profile-page tc'>
          <User user={user ? user : ''} />
          <PostList user={user ? user : ''} />
        </div>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(Profile);
