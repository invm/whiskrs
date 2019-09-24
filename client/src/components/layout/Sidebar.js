import React, { Component } from 'react';
import User from '../auth/User';
import { ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { loadUsers } from '../../actions/authActions';
import { Spinner } from '.';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    this.props.loadUsers();
    this.setState({
      ...this.state,
      users: this.props.users,
      loading: false
    });
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Spinner />;
    else
      return (
        <div className='sidebar' style={{ textAlign: 'center' }}>
          <h3 className='my-3 mx-4'>Top Users</h3>
          {this.props.users.map(user => (
            <ListGroupItem
              key={user._id}
              style={{ border: 'none', background: 'transparent' }}
            >
              <User user={user} />
            </ListGroupItem>
          ))}
        </div>
      );
  }
}

const mapStateToProps = state => ({
  users: state.auth.users
});

export default connect(
  mapStateToProps,
  { loadUsers }
)(Sidebar);
