const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const db = require('../models/database');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
} = require("graphql");


//---------------Internal Module Imports----------------
// const queryTypes = require("./queryTypes.js");

const app = express();

//---------------Global Middleware----------------
app.use(cors());

//---------------Custom Types----------------

const ProjectType = new GraphQLObjectType({
  name: "Project",
  description: "List of project details",
  fields: () => ({
    _id: { type: GraphQLInt },
    owner_id: { type: GraphQLString },
    description: { type: GraphQLString },
    image_url: { type: GraphQLString },
    num_likes: { type: GraphQLInt },
    created_at: { type: GraphQLString },
  }),
});

//---------------Root Query Types----------------

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    getUserProjects: {
      type: new GraphQLList(ProjectType),
    },
    getLocalProjects: {

    },
    getFolloweesProjects: {

    }

  })
})









const schema = new GraphQLSchema({
  query: RootQueryType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3002, () => console.log("projects API Server Running..."));
