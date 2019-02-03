const express = require('express'),
      bodyParser = require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      path = require('path'),
      request = require('request'),
      app = express(),
      router = express.Router(),
      envar = require('envar'),
      helmet = require('helmet');

envar.import('env.json');

app.use(helmet());

// TODO: look into not serving up everything
app.use(express.static(path.join(__dirname, '/')));

MongoClient.connect(envar('mongo_connect_string'), { useNewUrlParser: true }, (err, client) => {
  if (err) { return console.log(err); }

  app.set('db', client.db('test-db'));

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/api/todo', require('./api/todo.js'));

app.use('/api/linkedin', [
  // TODO: add security middleware
  require('./api/linkedin.js')
]);
