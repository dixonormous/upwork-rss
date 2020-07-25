const { gql } = require('apollo-server');

const typeDefs = gql`
  # Queries
  type Query {
    posts: [Post]
    post(id: ID!): Post
  }
  type Post {
    id: ID!
    link: String!
    pubDate: String!
    content: String!
    title: String!
    favorited: Boolean!
  }

  # Mutations
  type Mutation {
    deletePost(id: ID!): Boolean
    favoritePost(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };
