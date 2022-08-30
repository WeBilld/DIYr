const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const registry = require('./registry.json');
const crossFetch = require('cross-fetch');
const jwt = require('jsonwebtoken');
const { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink } = require('@apollo/client');
require('dotenv').config();

router.all('/graphql/*', async (req, res) => {
  const { url } = registry.services.graphql;
  const path = req.originalUrl.split('/').splice(3).join('/');

  const token = req.cookies.access_token;
  const decoded = await jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.userId;


  let parameter, queryType, queryString;
  switch (path) {
    case "getUserProjects":
      queryType = "query";
      parameter = `user_id: ${userId}`;
      queryString = `${req.body.queryString}`;
      break;
    case "getLocalProjects":
      queryType = "query";
      parameter = `user_id: ${userId}, city: "${req.body.city}"`;
      queryString = `${req.body.queryString}`;
      break;
    case "getFolloweesProjects":
      queryType = "query";
      parameter = `user_id: ${userId}`;
      queryString = `${req.body.queryString}`;
      break;
    case "createProject":
      queryType = "mutation";
      parameter = `
      user_id: ${userId}, 
      description: "${req.body.description}",
      image_url: "${req.body.image_url}"
      `;
      break;
  }

  const client = new ApolloClient({
    link: new HttpLink({ uri: url, fetch: crossFetch }),
    cache: new InMemoryCache(),
  });

  response = client.query({
    query: gql`
        ${queryType} {
          ${path} (${parameter}) {
            ${queryString}
          }
        }
      `
  })
    .then(response => res.send(response.data))
    .catch(error => console.log(error))
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