import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
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

  // static propTypes = {
  //   auth: PropTypes.object.isRequired
  // };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    // const { isAuthenticated, user } = this.props.auth;

    // const authLinks = (
    //   <Fragment>
    //     <NavItem>
    //       <span className='navbar-text mr-3'>
    //         <strong>{user ? `Welcome ${user.name}` : ''}</strong>
    //       </span>
    //     </NavItem>
    //     <NavItem>
    //       <Logout />
    //     </NavItem>
    //   </Fragment>
    // );

    // const guestLinks = (
    //   <Fragment>
    //     <NavItem>
    //       <RegisterModal />
    //     </NavItem>
    //     <NavItem>
    //       <LoginModal />
    //     </NavItem>
    //   </Fragment>
    // );

    return (
      <div>
        <Navbar color='warning' light expand='sm' className='mb-5'>
          <Container>
            <Link to='/' className='navbar-brand'>
              <i className='fa fa-cat fa-2x'></i>Whiskrs
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                {/* {isAuthenticated ? authLinks : guestLinks} */}
                <Fragment>
                  <NavItem>
                    <Link className='nav-link' to='/feed'>
                      Feed
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className='nav-link' to='/profile'>
                      Profile
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className='nav-link' to='/register'>
                      Register
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link className='nav-link' to='/login'>
                      Login
                    </Link>
                  </NavItem>
                  <NavItem>
                    <NavLink href='github.io'>Github</NavLink>
                  </NavItem>
                </Fragment>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
