import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';

const PostList = props => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setPosts(props.posts);
    if (props.user) setUser(props.user);
  }, [props]);

  const onDeleteClick = id => {
    props.setPostsLoading();
    props.deletePost(id);
    setPosts(props.posts.filter(post => post._id !== id));
  };

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };
  if (props.loading) return <Spinner />;
  else if (user)
    return (
      <div className='posts-list'>
        <Input
          placeholder='Search for posts or users..'
          className='my-3'
          value={search}
          onChange={handleSearchChange}
        />
        {posts
          .filter(post => post.userId === user._id)
          .filter(post => {
            if (
              post.body &&
              (post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.name.toLowerCase().includes(search.toLowerCase()))
            )
              return post;
            return null;
          })
          .map(({ userId, _id, body, date, name, likes }) => (
            <PostItem
              key={_id}
              _id={_id}
              body={body}
              date={date}
              userId={userId}
              name={name}
              likes={likes}
              removePost={() => onDeleteClick(_id)}
            />
          ))}
      </div>
    );
  else
    return (
      <div>
        <Input
          placeholder='Search for posts or users..'
          className='my-3'
          value={search}
          onChange={handleSearchChange}
        />
        {posts
          .filter(post => {
            if (
              post.body &&
              (post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.name.toLowerCase().includes(search.toLowerCase()))
            )
              return post;
            return null;
          })
          .map(({ userId, _id, body, date, name, likes }) => (
            <PostItem
              key={_id}
              _id={_id}
              body={body}
              date={date}
              likes={likes}
              userId={userId}
              name={name}
              removePost={() => onDeleteClick(_id)}
            />
          ))}
      </div>
    );
};

export default PostList;
