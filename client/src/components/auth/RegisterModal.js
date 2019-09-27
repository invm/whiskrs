import React, { Component } from 'react';
import {
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Alert,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import PropTypes from 'prop-types';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    catName: '',
    avatar: 'profile',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    // If something changed
    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, catName, avatar } = this.state;

    const newUser = {
      name,
      email,
      password,
      catName,
      avatar
    };
    //Attempt to register
    this.props.register(newUser);
  };
  onChange = e => {
    if (e.target.name === 'avatar') {
      const id = e.target.id.split('-');
      this.setState({
        ...this.state,
        avatar: id[0]
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
      this.handleValidation(e);
    }
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  handleAlert = (e, show) => {
    const alert = document.querySelector(`#${e.target.id}-alert`);
    if (show) {
      alert.classList.remove('hidden');
      alert.classList.add('visible');
    } else {
      alert.classList.remove('visible');
      alert.classList.add('hidden');
    }
  };

  isValidEmail = email => {
    let emailRegex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(`${email}`);
  };
  handleValidation = e => {
    switch (e.target.id) {
      case 'name':
        if (e.target.value.length < 3 && e.target.value.length > 0)
          return this.handleAlert(e, true);
        else return this.handleAlert(e, false);
      case 'email':
        if (!this.isValidEmail(e.target.value) && e.target.value.length > 0)
          return this.handleAlert(e, true);
        else return this.handleAlert(e, false);
      case 'password':
        if (e.target.value.length < 6 && e.target.value.length > 0)
          return this.handleAlert(e, true);
        else return this.handleAlert(e, false);
      case 'cat-name':
        if (e.target.value.length < 3 && e.target.value.length > 0)
          return this.handleAlert(e, true);
        else return this.handleAlert(e, false);
      default:
        return;
    }
  };

  render() {
    return (
      <div>
        <NavLink
          color='dark'
          href='#'
          //   style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
        >
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form
              onSubmit={this.onSubmit}
              action='register'
              className='register-form tc fade-in'
            >
              <FormGroup>
                <Label htmlFor='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  onChange={this.onChange}
                />
                <Alert color='secondary' className='hidden' id='name-alert'>
                  Must be at least 6 characters
                </Alert>
                <Label htmlFor='email'>Email</Label>
                <Input
                  name='email'
                  type='email'
                  id='email'
                  onChange={this.onChange}
                />
                <Alert color='secondary' className='hidden' id='email-alert'>
                  Must be a valid email
                </Alert>
                <Label htmlFor='password'>Password</Label>
                <Input
                  name='password'
                  type='password'
                  id='password'
                  onChange={this.onChange}
                />
                <Alert color='secondary' className='hidden' id='password-alert'>
                  Must be at least 6 characters
                </Alert>
                <Label htmlFor='catName'>Cat Name</Label>
                <Input
                  name='catName'
                  type='text'
                  id='cat-name'
                  onChange={this.onChange}
                />
                <Alert color='secondary' className='hidden' id='cat-name-alert'>
                  Must be at least 3 characters
                </Alert>
                <div className='avatars'>
                  <label htmlFor='avatars'>Choose user avatar:</label>
                  <div className='avatar-row'>
                    <input
                      className='trigger'
                      id='profile-input'
                      name='avatar'
                      type='radio'
                      defaultChecked
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='profile-input'
                      id='profile'
                      className='checker'
                    ></label>

                    <input
                      className='trigger'
                      id='boy1-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='boy1-input'
                      id='boy1'
                      className='checker'
                    ></label>
                    <input
                      className='trigger'
                      id='girl-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='girl-input'
                      id='girl'
                      className='checker'
                    ></label>
                  </div>
                  <div className='avatar-row'>
                    <input
                      className='trigger'
                      id='woman-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='woman-input'
                      id='woman'
                      className='checker'
                    ></label>
                    <input
                      className='trigger'
                      id='man1-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='man1-input'
                      id='man1'
                      className='checker'
                    ></label>
                    <input
                      className='trigger'
                      id='girl1-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='girl1-input'
                      id='girl1'
                      className='checker'
                    ></label>
                  </div>
                  <div className='avatar-row'>
                    <input
                      className='trigger'
                      id='man-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='man-input'
                      id='man'
                      className='checker'
                    ></label>
                    <input
                      className='trigger'
                      id='woman1-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='woman1-input'
                      id='woman1'
                      className='checker'
                    ></label>
                    <input
                      className='trigger'
                      id='boy-input'
                      name='avatar'
                      type='radio'
                      onChange={this.onChange}
                    />
                    <label
                      htmlFor='boy-input'
                      id='boy'
                      className='checker'
                    ></label>
                  </div>
                </div>
                <Button
                  className='my-4'
                  block
                  color='dark'
                  style={{ marginBottom: '2rem' }}
                  type='submit'
                >
                  Register
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterModal);
