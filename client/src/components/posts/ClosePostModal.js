import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      removePost: props.removePost,
      _id: props._id
    };
  }

  static propTypes = {
    removePost: PropTypes.func.isRequired,
    _id: PropTypes.string
  };

  onSubmit = e => {
    e.preventDefault();
    this.state.removePost(this.state._id);
    this.toggle();
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Button
          className='remove-btn '
          color='danger'
          // size='sm'
          onClick={this.toggle}>
          &times;
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='post'>
                  Are you sure you want to delete the post?
                </Label>
                <Button
                  block
                  color='dark'
                  style={{ marginTop: '1rem' }}
                  type='submit'>
                  Delete Post
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostModal);
