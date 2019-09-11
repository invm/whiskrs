import React from 'react';
import { ListGroupItem, Button } from 'reactstrap';
import { CSSTransition } from 'react-transition-group';

const PostItem = ({ _id, body, removePost }) => {
  return (
    <CSSTransition key={_id} timeout={500} classNames='fade'>
      <ListGroupItem className='my-1 rounded'>
        <Button
          className='remove-btn'
          color='danger'
          size='sm'
          onClick={() => removePost(_id)}>
          &times;
        </Button>
        {body}
      </ListGroupItem>
    </CSSTransition>
  );
};

export default PostItem;
