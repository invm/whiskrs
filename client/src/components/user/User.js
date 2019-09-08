import React, { useContext } from 'react';
import WhiskrsContext from '../../context/whiskrs/whiskrsContext';

const User = ({ parent }) => {
  const whiskrsContext = useContext(WhiskrsContext);
  const user = whiskrsContext.user;

  if (parent === 'profile') {
    return (
      <div>
        <h1>Profile page for {user.name}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{user.name}</h1>
      </div>
    );
  }
};

export default User;
