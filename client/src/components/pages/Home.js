import React from 'react';
import PostList from '../posts/PostList';
import PostModal from '../posts/PostModal';

const Home = () => {
  return (
    <>
      <div className='brand-image fade-in rounded'>
        <div className='text'>
          <h1>Whiskrs</h1>
          <p>A public sharing board for your cat moments</p>
          <p>Spread the joy or share the pain</p>
        </div>
      </div>
      <PostModal />
      <PostList />
    </>
  );
};

export default Home;
