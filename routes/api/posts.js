const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Post model

const Post = require('../../models/Post');

// @route GET api/posts
// @desc Get all posts
// @access public

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/posts
// @desc Create a post
// @access Private
router.post('/', auth, (req, res) => {
  const post = new Post({
    userId: req.body.userId,
    body: req.body.body
  });
  post.save().then(item => res.json(item));
});

// @route DELETE api/posts:id
// @desc Delete a post
// @access Private
router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/posts:id
// @desc Update post's likes
// @access Private
// router.put('/:id', auth, (req, res) => {
//   // TODO
//   Post.update({_id = req.params.id},{
//           likes: [...likes, req.body.userId]
//         })
//         .then(() => res.json({ success: true }))

//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
