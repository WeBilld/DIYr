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
    city: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    liked_by_user: { type: GraphQLBoolean },
  }),
});

//---------------Root Query Types----------------

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    getUserProjects: {
      type: new GraphQLList(ProjectType),
      description: "get all projects for a user",
      args: {
        user_id: { type: GraphQLNonNull(GraphQLInt) }
      }, //query parameter gets stored here
      resolve: async (parent, { user_id }) => {
        try {
          let getUserProjectsQuery = `
          SELECT p.*, u.city, u.first_name, u.last_name, u.email,
          EXISTS (SELECT * FROM likes l WHERE l.project_id = p._id AND l.user_id = $1) AS liked_by_user
          FROM PROJECTS AS p JOIN USERS AS u
          ON p.owner_id = u._id
          WHERE u._id = $1
          ORDER BY p.created_at DESC`;
          let response = await db.query(getUserProjectsQuery, [user_id]);
          console.log(` response of the getUserProjectsQuery is`, response.rows);
          return response.rows[0];
        }
        catch (error) {
          return `projectsController.getUserProjects: ERROR: ${error}`;
        }
      }
    },
    getLocalProjects: {
      type: new GraphQLList(ProjectType),
      description: "get all projects from a city",
      args: {
        user_id: { type: GraphQLNonNull(GraphQLInt) },
        city: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, { city }) => {
        try {
          let getLocalProjectsQuery = `
          SELECT p.*, u.city, u.first_name, u.last_name, u.email,
          EXISTS (SELECT * FROM likes l WHERE l.project_id = p._id AND l.user_id = $1) AS liked_by_user
          FROM projects p INNER JOIN users u ON p.owner_id = u._id
          WHERE u.city = $2 ORDER BY p.created_at;`;
          let response = await db.query(getLocalProjectsQuery, [user_id, city]);
          console.log(`response of the getLocalProjectsQuery is`, response.rows);
          return response.rows[0];
        }
        catch (error) {
          return `projectsController.getLocalProjects: ERROR: ${error}`;
        }
      }
    },
    getFolloweesProjects: {
      type: new GraphQLList(ProjectType),
      description: "get all projects from a person the user follows",
      args: {
        user_id: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent, { city }) => {
        try {
          let getFolloweesProjectsQuery = `
          SELECT p.*, u.city, u.first_name, u.last_name, u.email,
          EXISTS (SELECT * FROM likes l WHERE l.project_id = p._id AND l.user_id = $1) AS liked_by_user
          FROM PROJECTS p
          INNER JOIN users u ON p.owner_id = u._id
          WHERE p.owner_id IN (
            SELECT f.followee_id FROM FOLLOWEE_FOLLOWER AS f
            WHERE f.follower_id = $1)
          ORDER BY p.created_at DESC`;
          let response = await db.query(getFolloweesProjectsQuery, [user_id]);
          console.log(`response of the getFolloweesProjectsQuery is`, response.rows);
          return response.rows[0];
        }
        catch (error) {
          return `projectsController.getFolloweesProjects: ERROR: ${error}`;
        }
      }
    }

  })
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  // mutation:
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3002, () => console.log("projects API Server Running..."));
