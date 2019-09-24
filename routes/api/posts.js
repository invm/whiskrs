const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const multer = require('multer');

// Where to store uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

// Filter by mimetype
const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  )
    cb(null, true);
  // accept
  else cb(null, false);
};

const upload = multer({
  storage, // Where to store
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit to 5 mbs
  },
  fileFilter: fileFilter // Apply filter
});

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
router.post('/', /* auth, */ upload.single('productImage'), (req, res) => {
  console.log(req);
  const post = new Post({
    userId: req.body.userId,
    body: req.body.body,
    name: req.body.name,
    likes: [],
    postImage: req.file.path
  });
  post
    .save()
    .then(item => res.json(item))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

// @route DELETE api/posts:id
// @desc Delete a post
// @access Private
router.delete('/:id', auth, (req, res) => {
  Post.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/posts/like:id
// @desc Push to  post's likes
// @access Private
router.put('/like:id', auth, (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $push: {
        likes: req.body.userId
      }
    },
    { useFindAndModify: false }
  )
    .then(() => res.json({ success: true }))

    .catch(err => res.status(404).json({ success: false }));
});

// @route PUT api/posts/dislike:id
// @desc Delete from post's likes
// @access Private

router.put('/dislike:id', auth, (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $pull: { likes: req.body.userId }
    },
    { useFindAndModify: false }
  )
    .then(likes => res.json({ success: true, likes }))

    .catch(err => res.status(404).json({ success: false, err, req, res }));
});

module.exports = router;
