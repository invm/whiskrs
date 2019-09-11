import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ListGroupItem, Button } from 'reactstrap';

const PostItem = ({ id, body, index, updatePost, removePost }) => {
  return (
    <CSSTransition key={id} timeout={500} classNames='fade'>
      <ListGroupItem className='my-1 rounded'>
        <Button
          className='remove-btn'
          color='danger'
          size='sm'
          onClick={() => removePost(id)}>
          &times;
        </Button>
        <Button
          className='remove-btn'
          color='info'
          size='sm'
          onClick={() => updatePost(index)}>
          &#10227;
        </Button>

        {body}
      </ListGroupItem>
    </CSSTransition>
  );
};

export default PostItem;
