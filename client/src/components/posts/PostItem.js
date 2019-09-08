import React, { Fragment, useContext, useState } from 'react';
import WhiskrsContext from '../../context/whiskrs/whiskrsContext';

const PostItem = ({ postItem, parent, ownedByUser }) => {
  const [show, setShow] = useState(true);
  let [likes, setLikes] = useState(Math.floor(Math.random() * 25));
  const whiskrsContext = useContext(WhiskrsContext);
  const user = whiskrsContext.user;

  let { title, body /* , id */ } = postItem;
  // if (parent === 'sidebar') {
  // }
  const hidePost = e => {
    if (show) {
      setShow(false);
    }
  };
  const likePost = e => {
    setLikes(++likes);
  };

  return (
    <>
      {show && (
        <div className='post-item'>
          <div style={postItemStyle}>
            <h4>{title}</h4>
            <button style={xButtonStyle} onClick={hidePost}>
              Hide
            </button>
          </div>
          <Fragment>
            <p>{body}</p>
          </Fragment>
          <div className='post-buttons'>
            <button className='post-button' onClick={likePost}>
              Like! {likes > 0 && likes}
            </button>
            {!parent && user && ownedByUser && (
              <button className='post-button'>Update </button>
            )}
            {!parent && user && ownedByUser && (
              <button className='post-button'>Delete </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostItem;

const postItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};
const xButtonStyle = {
  backgroundColor: '#0881e4'
};
