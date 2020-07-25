const { populateDatabase } = require('./populateDatabase');
const { fetchData } = require('../graphql');

const startDatabase = (t) => {
  const interval = t ? t * 60000 : 60000; // Defaulting to 1 minute if no specified time

  setInterval(() => {
    // populateDatabase();
    fetchData();
  }, interval)
};

module.exports = { startDatabase };
