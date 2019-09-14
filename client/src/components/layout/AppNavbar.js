import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <Link
            to={`/profile/${user ? user._id : ''}`}
            className='navbar-text mr-3 nav-link'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </Link>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar light expand='sm' className='mb-3 bg-gradient'>
          <Container>
            <Link to='/' className='navbar-brand'>
              <i className='fa fa-cat fa-2x'></i>Whiskrs
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
                <NavItem>
                  <NavLink href='https://github.com/invm/whiskrs'>
                    <i className='fab fa-github fa-2x'></i>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(AppNavbar);
