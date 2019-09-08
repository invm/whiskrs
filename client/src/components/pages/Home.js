import React from 'react';
import Posts from '../posts/Posts';

const Home = () => {
  return (
    <>
      <div className='brand-image fade-in'>
        <div className='text'>
          <h1>Whiskrs</h1>
          <p>A public sharing board for your cat moments</p>
          <p>Spread the joy or share the pain</p>
        </div>
      </div>
      <Posts />
    </>
  );
};

export default Home;
