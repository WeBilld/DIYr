const { request } = require('express');
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const registry = require('./registry.json');

router.all('/:apiName/:path', (req, res) => {
  const { url } = registry.services[req.params.apiName];
  const path = req.params.path;
  const body = req.body === {} ? req.body : null;
  const { method, headers } = req;

  fetch(url + path, {
    method,
    headers,
    body,
  })
    .then(response => response.json())
    .then(data => res.send(data))
    .catch(error => console.log(error))
});

module.exports = router;