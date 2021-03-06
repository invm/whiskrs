import React, { Component } from 'react';
import { PostModal, PostList } from '../posts';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import {
  getPosts,
  deletePost,
  setPostsLoading
} from '../../actions/postActions';
import Sidebar from '../layout/Sidebar';

class Home extends Component {
  state = {
    search: ''
  };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.post.posts;
    return (
      <Container className='fade-in'>
        <div defer className='brand-image fade-in rounded'>
          <div className='text'>
            <h1>Whiskrs</h1>
            <p>A public sharing board for your cat moments</p>
            <p>Spread the joy or share the pain</p>
          </div>
        </div>
        <div className='flex-page'>
          <div className='posts'>
            <PostModal />
            <PostList
              loading={this.props.post.loading}
              posts={posts}
              setPostsLoading={this.props.setPostsLoading}
              deletePost={this.props.deletePost}
            />
          </div>
          <Sidebar />
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost, setPostsLoading }
)(Home);
