import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col
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
      userId: this.props.user._id,
      postImage: this.state.image
    };
    // Add post via addPost action
    this.props.addPost(newPost);
    this.toggle();
  };
  onChange = e => {
    if (
      e.target.name === 'postImage' &&
      (e.target.files[0].type === 'image/jpeg' ||
        e.target.files[0].type === 'image/jpg' ||
        e.target.files[0].type === 'image/png')
    ) {
      this.setState({
        image: e.target.files[0]
      });
    } else
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
              <FormGroup row>
                <Label for='Post' sm={2}>
                  Post
                </Label>
                <Col sm={10}>
                  <Input
                    type='textarea'
                    name='body'
                    id='post'
                    placeholder='Add post'
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='file' sm={2}>
                  Image
                </Label>
                <Col sm={10}>
                  <Input
                    type='file'
                    name='postImage'
                    id='image'
                    accept='jpg,jpeg,png'
                    onChange={this.onChange}
                  />
                  <FormText color='muted'>
                    You are welcome to share some photos of your majestic
                    feline. Please upload only jpg, jpeg or png photos that are
                    less than 4MB in size.
                  </FormText>
                </Col>
              </FormGroup>
              <FormGroup>
                <Button
                  block
                  color='dark'
                  style={{ marginTop: '1rem' }}
                  onClick={this.onSubmit}
                >
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
