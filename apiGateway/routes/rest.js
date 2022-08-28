const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const registry = require('./registry.json');
const crossFetch = require('cross-fetch');
const jwt = require('jsonwebtoken');
require('dotenv').config;
const { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } = require('@apollo/client');

router.all('/graphql/*', async (req, res) => {
  const { url } = registry.services.graphql;
  const path = req.originalUrl.split('/').splice(3).join('/');

  const token = req.cookies.access_token;
  const decoded = await jwt.verify(token, process.env.SECRET_KEY, { maxAge: '3d' });
  const userId = decoded.userId;

  let parameter, queryType, queryString;
  switch(path) {
    case "getUserProjects":
      queryType = "query";
      parameter = `user_id: ${userId}`
      break;
    case "getLocalProjects":
      queryType = "query";
      parameter = `user_id: ${userId}, city: `
      break;
    case "createProject":
      queryType = "mutation";
      break;
  } 

  const client = new ApolloClient({
    link: new HttpLink({ uri: url, fetch: crossFetch }),
    cache: new InMemoryCache(),
  });

  response = client.query({
    query: gql`
        ${queryType} all {
          ${path} (${parameter}) {
            _id, owner_id, description, image_url, num_likes, created_at, city, first_name,
    last_name, email, liked_by_user, followed_by_user
          }
        }
      `
  })
    .then(data => console.log(data))
});

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
      const cookie = response.headers.get('set-cookie');
      if (cookie) res.setHeader('set-cookie', response.headers.get('set-cookie'));
      return response.json()
    })
    .then(data => res.send(data))
    .catch(error => console.log(error))
});

module.exports = router;