import React, { Component } from 'react';
import { ListGroupItem, Badge, Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClosePostModal from './ClosePostModal';
import { likePost, dislikePost } from '../../actions/postActions.js';

class PostItem extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      body: props.body,
      date: props.date,
      removePost: props.removePost,
      userId: props.userId,
      name: props.name,
      likes: props.likes
    };
  }

  onLikeClick = e => {
    if (
      !this.state.likes.includes(this.props.user._id) &&
      !this.props.likes.includes(this.props.user._id)
    ) {
      const userId = this.props.user._id;
      const postId = this.state._id;
      this.props.likePost(userId, postId);
      this.setState({
        ...this.state,
        likes: [...this.state.likes, userId]
      });
    }
  };

  onDislikeClick = e => {
    const userId = this.props.user._id;
    const postId = this.state._id;
    console.log(userId);
    this.props.dislikePost(userId, postId);
    this.setState({
      ...this.state,
      likes: this.state.likes.filter(like => like !== userId)
    });
  };

  render() {
    const { _id, body, removePost, userId, name, likes } = this.state;
    let postDate = new Date(this.state.date);
    return (
      <ListGroupItem className='my-1 rounded card'>
        <Alert color='info'>
          <Link to={`/profile/${userId}`} className='alert-link'>
            {name}
          </Link>
          {this.props.user._id !== null &&
          this.props.isAuthenticated &&
          this.props.user._id === userId ? (
            <ClosePostModal removePost={removePost} id={_id} />
          ) : null}
          {postDate.toLocaleDateString() === new Date().toLocaleDateString() ? (
            <Alert color='secondary' style={badgeStyle}>
              {`${postDate.getHours()}:${
                postDate.getMinutes() <= 9
                  ? `0${postDate.getMinutes()}`
                  : postDate.getMinutes()
              }`}
            </Alert>
          ) : (
            <Alert color='secondary' style={badgeStyle}>
              {postDate.toLocaleDateString()}
            </Alert>
          )}
        </Alert>

        <p>{body}</p>
        {!this.state.likes.includes(this.props.user._id) &&
        this.props.isAuthenticated ? (
          <Button onClick={this.onLikeClick}>Like</Button>
        ) : this.props.isAuthenticated ? (
          <Button onClick={this.onDislikeClick}>Dislike</Button>
        ) : null}
        {likes.length ? (
          <Alert color='danger' style={badgeStyle}>
            Likes : {likes.length}
          </Alert>
        ) : null}
      </ListGroupItem>
    );
  }
}

// const postStyle = {};

const badgeStyle = {
  padding: '0.4rem',
  fontSize: '0.8rem',
  // color: 'black',
  float: 'right',
  display: 'block'
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user || {}
});

export default connect(
  mapStateToProps,
  { likePost, dislikePost }
)(PostItem);
