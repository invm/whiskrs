import React, { Component } from 'react';
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
import PropTypes from 'prop-types';

class PostModal extends Component {
  state = {
    modal: false,
    body: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

  onSubmit = e => {
    e.preventDefault();
    const newPost = {
      body: this.state.body,
      name: this.props.user.name,
      userId: this.props.user._id
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
        {this.props.isAuthenticated ? (
          <Button color='dark' style={{ margin: '2rem' }} onClick={this.toggle}>
            Add Post
          </Button>
        ) : (
          <h4 className='mx-3 my-4'>Login to share stories..</h4>
        )}

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
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostModal);
