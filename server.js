const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');

// const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
// const auth = require('./routes/api/auth');

const app = express();

app.use(express.json());

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*' /* 'http://localhost:3000' */); // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

const db = config.get('mongoURI');

mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes

// app.use('/api/users', users);
app.use('/api/posts', posts);
// app.use('/api/auth', auth);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.uise(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server is running on port ${port}`));
