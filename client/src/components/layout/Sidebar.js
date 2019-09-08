import React, { useContext } from 'react';
import WhiskrsContext from '../../context/whiskrs/whiskrsContext';
import PostItem from '../posts/PostItem';

const Sidebar = () => {
  const whiskrsContext = useContext(WhiskrsContext);
  const posts = whiskrsContext.posts;
  return (
    <div className='sidebar'>
      {
        <div className='sidebar-news'>
          {posts.map((postItem, index) => {
            if (index % 7 === 0)
              return (
                <PostItem
                  postItem={postItem}
                  key={postItem.id}
                  parent={'sidebar'}
                />
              );
          })}
        </div>
      }
    </div>
  );
};

export default Sidebar;
