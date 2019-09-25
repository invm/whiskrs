import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      _id: props.user._id,
      name: props.user.name,
      email: props.user.email,
      catName: props.user.catName
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      _id: this.props.user._id,
      name: this.props.user.name,
      email: this.props.user.email,
      catName: this.props.user.catName,
      avatar: this.props.user.avatar
    });
  }

  toggle = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
    this.handleValidation(e);
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

  onSubmit = e => {
    e.preventDefault();

    this.props.onUpdateClick({
      _id: this.state._id,
      name: this.state.name || this.props.user.name,
      catName: this.state.catName || this.props.user.catName,
      email: this.state.email || this.props.user.email
    });
    this.toggle();
  };

  render() {
    const path = window.location.pathname;
    const { name, catName, email, _id, avatar } = this.props.user;
    return (
      <div className='card' id='user' style={{ textAlign: 'center' }}>
        {avatar && (
          <img
            className='user-avatar'
            src={`/uploads/png/${avatar}.png`}
            alt={name}
          />
        )}
        <div>
          <h1 className='user-header'>
            <i className='fas fa-user '></i>
            {name}
          </h1>
          <h2 className='user-header-2'>
            <i className='fa fa-cat '></i>
            {catName}
          </h2>
          <h3 className='user-header-2'>
            <i className='far fa-envelope '></i>
            {email}
          </h3>
          {this.props.isAuthenticated &&
            path !== '/' &&
            (this.props.loggedInUser._id === _id && (
              <div style={{ display: 'inline' }}>
                <Button
                  className='my-4'
                  color='dark'
                  style={{ marginBottom: '2rem' }}
                  onClick={this.toggle}
                >
                  Update Profile
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                  <ModalBody>
                    {this.state.msg ? (
                      <Alert color='danger'>{this.state.msg}</Alert>
                    ) : null}
                    <Form
                      onSubmit={this.onSubmit}
                      action='update-profile'
                      className='register-form tc fade-in'
                    >
                      <FormGroup>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                          value={this.state.name}
                          type='text'
                          name='name'
                          id='name'
                          onChange={this.onChange}
                        />
                        <Alert
                          color='secondary'
                          className='hidden'
                          id='name-alert'
                        >
                          Must be at least 3 characters
                        </Alert>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          value={this.state.email}
                          name='email'
                          type='email'
                          id='email'
                          onChange={this.onChange}
                        />
                        <Alert
                          color='secondary'
                          className='hidden'
                          id='email-alert'
                        >
                          Must be a valid email
                        </Alert>
                        <Label htmlFor='catName'>Cat Name</Label>
                        <Input
                          value={this.state.catName}
                          name='catName'
                          type='text'
                          id='cat-name'
                          onChange={this.onChange}
                        />
                        <Alert
                          color='secondary'
                          className='hidden'
                          id='cat-name-alert'
                        >
                          Must be at least 3 characters
                        </Alert>
                        <Button
                          className='my-4'
                          block
                          color='dark'
                          style={{ marginBottom: '2rem' }}
                          type='submit'
                        >
                          Update
                        </Button>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loggedInUser: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(User);
