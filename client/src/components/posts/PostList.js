import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPosts, deletePost } from '../../actions/postActions';

import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

class PostList extends Component {
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
    if (loading) return <Spinner />;
    else
      return (
        <Container>
          <div>
            <TransitionGroup className='posts-list'>
              {posts.map(({ _id, body, date }) => (
                <CSSTransition key={_id} timeout={500} classNames='fade'>
                  <PostItem
                    key={_id}
                    body={body}
                    date={date}
                    removePost={this.onDeleteClick.bind(this, _id)}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
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
  { getPosts, deletePost }
)(PostList);
