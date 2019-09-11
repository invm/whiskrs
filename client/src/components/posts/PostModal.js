import React, { Component } from 'react';
import uuid from 'uuid';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

class PostModal extends Component {
  state = {
    modal: false,
    body: ''
  };

  onSubmit = e => {
    e.preventDefault();
    const newPost = {
      id: uuid(),
      body: this.state.body
    };
    // Add post via addPost action
    this.props.addPost(newPost);
    this.toggle();
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  render() {
    return (
      <div>
        <Button
          color='dark'
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}>
          Add Post
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Post</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='post'>Post</Label>
                <Input
                  type='text'
                  name='body'
                  id='post'
                  placeholder='Add post'
                  onChange={this.onChange}
                />
                <Button
                  block
                  color='dark'
                  style={{ marginTop: '1rem' }}
                  onClick={this.onSubmit}>
                  Add Post
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
  post: state.post
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostModal);
