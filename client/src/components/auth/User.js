import React, { Component } from 'react';
import { connect } from 'react-redux';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      email: props.user.email,
      catName: props.user.catName
    };
  }

  render() {
    const { name, catName, email } = this.state;
    return (
      <div className='card'>
        <h1>{name}</h1>
        <h2>{catName}</h2>
        <h3>{email}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(User);
