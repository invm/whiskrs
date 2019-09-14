import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts, deletePost } from '../../actions/postActions';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user || ''
    };
  }
  static propTypes = {
    getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getPosts();
  }

  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  render() {
    const { posts, loading } = this.props.post;
    const user = this.state.user;
    if (loading) return <Spinner />;
    else if (user)
      return (
        <Container>
          <TransitionGroup className='posts-list'>
            {posts
              .filter(post => post.userId === user._id)
              .map(({ userId, _id, body, date, name }) => (
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                  <PostItem
                    key={_id}
                    body={body}
                    date={date}
                    userId={userId}
                    name={name}
                    removePost={this.onDeleteClick.bind(this, _id)}
                  />
                </CSSTransition>
              ))}
          </TransitionGroup>
        </Container>
      );
    else
      return (
        <Container>
          <TransitionGroup className='posts-list'>
            {posts.map(({ userId, _id, body, date, name }) => (
              <PostItem
                key={_id}
                body={body}
                date={date}
                userId={userId}
                name={name}
                removePost={this.onDeleteClick.bind(this, _id)}
              />
            ))}
          </TransitionGroup>
        </Container>
      );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(PostList);
