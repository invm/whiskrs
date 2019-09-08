import React, { useContext } from 'react';
import WhiskrsContext from '../../context/whiskrs/whiskrsContext';
import User from '../user/User';
import Posts from '../posts/Posts';

const Profile = () => {
  const whiskrsContext = useContext(WhiskrsContext);
  const { userId } = whiskrsContext.user;

  return (
    <div className='fade-in profile-page tc'>
      <User parent={'profile'} />
      <Posts parent={userId} />
    </div>
  );
};

export default Profile;
