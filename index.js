const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers, fetchData } = require('./graphql');
const { startDatabase } = require('./rss');
require('dotenv').config();

const intervalTime = 1; // Time in minutes

startDatabase(intervalTime);

async function InitApp(){
  await fetchData();
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen()
    .then(({ url }) => console.log(`🚀  Server ready at ${url}`));
};

InitApp();
