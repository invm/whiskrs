import React from 'react';
import User from '../auth/User';
import PostList from '../posts/PostList';

const Profile = () => {
  return (
    <div className='fade-in profile-page tc'>
      <User parent={'profile'} />
      <PostList />
    </div>
  );
};

export default Profile;
