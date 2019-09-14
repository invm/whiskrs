import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';

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
    // getPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired
  };

  // componentDidMount() {
  //   this.props.getPosts();
  // }

  onDeleteClick = id => {
    this.props.setPostsLoading();
    this.props.deletePost(id);
  };

  render() {
    let { posts, loading } = this.props;
    const user = this.state.user;
    if (loading) return <Spinner />;
    else if (user)
      return (
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
      );
    else
      return (
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
      );
  }
}

export default PostList;
