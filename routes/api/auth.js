const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User model
const User = require('../../models/User');

// @route POST api/auth
// @desc Authenticate the user
// @access Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password)
    return res.status(400).json({ msg: 'Please enter all fields' });

  //Check for existing user
  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(400).json({
        msg: 'User does not exist'
      });

    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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

// @route DELETE api/users:id
// @desc Delete a user
// @access  Private
router.delete('/:id', auth, (req, res) => {
  User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route GET api/auth/user
// @desc Get user data, always monitor who is the user
// @access Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;
