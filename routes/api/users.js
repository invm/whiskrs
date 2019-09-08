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
  User.find().then(items => res.json(items));
});

// @route POST api/users
// @desc Register a user
// @access public // should be private with auth
router.post('/', (req, res) => {
  const { name, email, password, catName } = req.body;
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
      catName
    });
    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
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
                  id: user.id,
                  name: user.name,
                  email: user.email
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
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
