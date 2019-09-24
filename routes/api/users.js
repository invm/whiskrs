const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User model

const User = require('../../models/User');

// @route GET api/users
// @desc Get all users
// @access public

router.get('/', (req, res) => {
  User.find()
    .select('-password')
    .then(items => res.json(items));
});

// @route GET api/user/:id
// @desc Get user
// @access public

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id)
    .select('-password')
    .then(item => res.json(item))
    .catch(err => res.status(404).json({ success: false }));
});

// @route GET api/users
// @desc Get all users
// @access no

router.put('/user/:id', (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      email: req.body.email,
      catName: req.body.catName
    },
    { useFindAndModify: false }
  )
    .then(() => res.json({ success: true }))
    .catch(err => res.status(404).json({ success: false, err }));
});

// @route POST api/users
// @desc Register a user
// @access public // should be private with auth

router.post('/', (req, res) => {
  const { name, email, password, catName, avatar } = req.body;
  // Validation

  if (!name || !email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (user)
      return res.status(400).send({
        msg: 'The email you have provided already been used to register.'
      });
    const newUser = new User({
      name,
      email,
      password,
      catName,
      avatar
    });
    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      // 10 rounds to crypt, the larger number the more secure but takes longer to generate
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  _id: user.id,
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar
                }
              });
            }
          );
        });
      });
    });
  });
});

// @route DELETE api/users:id
// @desc Delete a user
// @access public // should be private with auth

// router.delete('/:id', (req, res) => {
//   User.findById(req.params.id)
//     .then(item => item.remove().then(() => res.json({ success: true })))
//     .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;
