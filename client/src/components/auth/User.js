import React from 'react';

const User = ({ parent }) => {
  if (parent === 'profile') {
    return <div>{/* <h1>Profile page for {user.name}</h1> */}</div>;
  } else {
    return <div>{/* <h1>{user.name}</h1> */}</div>;
  }
};

export default User;
