const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const registry = require('./registry.json');

router.all('/:apiName/*', (req, res) => {
  const { url } = registry.services[req.params.apiName];
  const path = req.originalUrl.split('/').splice(3).join('/');
  const body = JSON.stringify(req.body) === "{}" ? null : JSON.stringify(req.body);
  const { method, headers } = req;
  
  fetch(url + path, {
    method,
    headers,
    body,
  })
    .then(response => {
      res.setHeader('set-cookie', response.headers.get('set-cookie'));
      return response.json()
    })
    .then(data => res.send(data))
    .catch(error => console.log(error))
});

module.exports = router;