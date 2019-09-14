import React, { Component } from 'react';
import { ListGroupItem, Badge } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClosePostModal from './ClosePostModal';

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
      name: props.name
    };
  }

  render() {
    const { _id, body, removePost, userId, name } = this.state;
    let postDate = new Date(this.state.date);
    return (
      <CSSTransition key={_id} timeout={500} classNames='fade'>
        <ListGroupItem className='my-1 rounded'>
          {this.props.isAuthenticated && this.props.user._id === userId ? (
            <ClosePostModal removePost={removePost} id={_id} />
          ) : null}

          {body}
          <Link to={`/profile/${userId}`}>
            <Badge color='info'>{name}</Badge>
          </Link>
          {postDate.toLocaleDateString() === new Date().toLocaleDateString() ? (
            <Badge color='warning' style={badgeStyle}>
              {`${postDate.getHours()}:${
                postDate.getMinutes() === 0 ? '00' : postDate.getMinutes()
              }`}
            </Badge>
          ) : (
            <Badge color='warning' style={badgeStyle}>
              {postDate.toLocaleDateString()}
            </Badge>
          )}
        </ListGroupItem>
      </CSSTransition>
    );
  }
}

// const postStyle = {};

const badgeStyle = {
  padding: '0.4rem',
  fontSize: '0.8rem',
  color: 'black',
  float: 'right',
  display: 'block'
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(PostItem);
