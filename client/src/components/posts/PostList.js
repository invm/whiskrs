import React, { /* useContext, Fragment */ Component } from 'react';
import { Container, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getPosts, deletePost } from '../../actions/postActions';
import PropTypes from 'prop-types';

class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  onDeleteClick = id => {
    this.props.deletePost(id);
  };

  onUpdateClick = id => {
    this.ptops.updatePost(id);
  };

  render() {
    const { posts } = this.props.post;

    return (
      <Container>
        <div>
          <TransitionGroup className='posts-list'>
            {posts.map(({ id, body }, index) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem className='my-1 rounded'>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={this.onDeleteClick.bind(this, id)}>
                    &times;
                  </Button>
                  {/* <Button
                    className='remove-btn'
                    color='info'
                    size='sm'
                    onClick={() => {
                      const body = prompt('Enter post body');
                      if (body)
                        this.setState(state => ({
                          posts: state.posts.map(post =>
                            post.id === id ? { ...post, body } : post
                          )
                        }));
                    }}>
                    &#10227;
                  </Button> */}

                  {body}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </Container>
    );
  }
}

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, deletePost }
)(PostList);

// import WhiskrsContext from '../../context/whiskrs/whiskrsContext';
// import PostItem from './PostItem';
// import Spinner from '../layout/Spinner';

// const Posts = ({ parent }) => {
//   const whiskrsContext = useContext(WhiskrsContext);
//   const { posts, loading } = whiskrsContext;

//   const userPosts = posts.filter(post => post.userId === parent);
//   const userId = whiskrsContext.user.userId;

//   if (loading) {
//     return <Spinner />;
//   } else if (parent) {
//     return (
//       <>
//         <div className='grid-2'>
//           {userPosts.map(postItem => (
//             <PostItem
//               postItem={postItem}
//               key={postItem.id}
//               ownedByUser={true}
//             />
//           ))}
//         </div>
//       </>
//     );
//   } else {
//     return (
//       <Fragment>
//         <h2 className='tc'>Top Posts</h2>
//         <div className='grid-2'>
//           {posts.map(postItem => (
//             <PostItem
//               postItem={postItem}
//               key={postItem.id}
//               ownedByUser={postItem.userId === userId ? true : false}
//             />
//           ))}
//         </div>
//       </Fragment>
//     );
//   }
// };

// export default Posts;
