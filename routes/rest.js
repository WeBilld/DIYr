const { request } = require('express');
const express = require('express');
const router = express.Router();
const registry = require('./registry.json');

router.all('/:apiName/:path', (req, res) => {
  const url = registry.services[req.params.apiName];
  const path = req.params.path;
  const {method, headers, body} = req;
  
  fetch(url + path, {
    method,
    headers,
    body
  })
  .then(response => {
    res.send(response);
  })
  .catch(error => console.log(error))

});

module.exports = router;