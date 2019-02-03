const express = require('express'),
      app = express(),
      request = require('request');

app.get('/all', (req, res) => {
  return app.get('db').collection('todo').find().toArray().then((response) => {
    res.json(response);
  });
});

// TODO: remove - just in to show how to save to the database
app.post('/save', (req, res) => {
  app.get('db').collection('todo').save(req.body, (err, results) => {
    if (err) { return console.log(err); }
    res.redirect('/');
  });
});

module.exports = app;
