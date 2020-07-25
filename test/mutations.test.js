const { ApolloServer, gql } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const { fetchData, resolvers, typeDefs } = require('../graphql');

it('Should update post when favorited', async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  const { query, mutate } = createTestClient(server);

  await fetchData();

  const GET_RANDOM_POST = gql`
    query {
      posts {
        id
      }
    }
  `;

  const { data } = await query({ query: GET_RANDOM_POST });

  const ranNum = Math.floor(Math.random() * data.posts.length);

  const randomId = data.posts[ranNum].id;

  const FAVORITE_POST = gql`
    mutation {
      favoritePost(id: "${randomId}")
    }
  `;

  const result = await mutate({ mutation: FAVORITE_POST });

  const favoritePost = result.data.favoritePost;

  expect(favoritePost).toBe(true);
});
