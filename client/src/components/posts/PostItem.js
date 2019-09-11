import React, { Component } from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostItem extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      _id: props._id,
      body: props.body,
      date: props.date,
      removePost: props.removePost
    };
  }

  render() {
    return (
      <CSSTransition key={this.state._id} timeout={500} classNames='fade'>
        <ListGroupItem className='my-1 rounded'>
          {this.props.isAuthenticated ? (
            <Button
              className='remove-btn'
              color='danger'
              size='sm'
              onClick={() => this.state.removePost(this.state._id)}>
              &times;
            </Button>
          ) : null}

          {this.state.body}
          {this.state.date}
        </ListGroupItem>
      </CSSTransition>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(PostItem);
