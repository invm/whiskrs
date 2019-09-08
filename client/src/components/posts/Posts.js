import React, { useContext, Fragment } from 'react';
import WhiskrsContext from '../../context/whiskrs/whiskrsContext';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';

const Posts = ({ parent }) => {
  const whiskrsContext = useContext(WhiskrsContext);
  const { posts, loading } = whiskrsContext;

  const userPosts = posts.filter(post => post.userId === parent);
  const userId = whiskrsContext.user.userId;

  if (loading) {
    return <Spinner />;
  } else if (parent) {
    return (
      <>
        <div className='grid-2'>
          {userPosts.map(postItem => (
            <PostItem
              postItem={postItem}
              key={postItem.id}
              ownedByUser={true}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <Fragment>
        <h2 className='tc'>Top Posts</h2>
        <div className='grid-2'>
          {posts.map(postItem => (
            <PostItem
              postItem={postItem}
              key={postItem.id}
              ownedByUser={postItem.userId == userId ? true : false}
            />
          ))}
        </div>
      </Fragment>
    );
  }
};

export default Posts;
