const express = require('express');
const registry = require('./registry.json');
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");
const router = express.Router();

const Rootquery = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
});

const schema = new GraphQLSchema({
  query: Rootquery,
});

router.all('/',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);


// (req, res) => {
//   const { url } = registry.services[req.params.apiName];
//   const path = req.originalUrl.split('/').splice(3).join('/');

// }

module.exports = router;