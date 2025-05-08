
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'clowns-secret', resave: false, saveUninitialized: true }));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

app.post('/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'clownadmin' && password === 'Co11inQB!!!!!') {
    req.session.loggedIn = true;
    return res.redirect('/admin/dashboard');
  }
  res.send('Invalid credentials');
});

app.get('/admin/dashboard', (req, res) => {
  if (req.session.loggedIn) {
    return res.send('<h1>Welcome to the Admin Dashboard</h1><p>Coming soon...</p>');
  }
  res.redirect('/admin');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
