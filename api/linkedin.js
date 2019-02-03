const express = require('express'),
      app = express(),
      request = require('request'),
      envar = require('envar');

app.post('/getAccessToken', (req, res) => {
  const form = Object.assign(req.body, {
    grant_type: 'authorization_code',
    client_id: envar('client_id'),
    client_secret: envar('client_secret'),
    redirect_uri: envar('redirect_uri')
  });

  return request.post('https://www.linkedin.com/oauth/v2/accessToken', { form }, (err, response, body) => {
    if (err) { res.json(err); }
    res.json(JSON.parse(body));
  });
});

app.post('/profile', (req, res) => {
  return request.get(`https://api.linkedin.com/v2/me?oauth2_access_token=${req.body.accessToken}`, (err, response, body) => {
    res.json(JSON.parse(body));
  });
});

app.get('/longUrl', (req, res) => {
  res.json(`https://www.linkedin.com/oauth/v2/authorization?client_id=${envar('client_id')}&redirect_uri=${envar('redirect_uri')}&response_type=code&state=${envar('state')}`);
});

module.exports = app;
