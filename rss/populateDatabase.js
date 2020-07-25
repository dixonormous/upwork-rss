let Parser = require('rss-parser');
let parser = new Parser();
const { db } = require('../database');

const url = 'https://www.upwork.com/ab/feed/jobs/rss?q=nodejs&sort=recency&securityToken=b6b11d18a40da0dd8e4c05ea5b2b38829204ae930c6a79f02d3cf649d70c249ec1ea7491b7d447c3dbfef36c03d31047de66deddedfe18bcd6313a4db94c6456'

// Iterate over database to ensure data isn't written twice
const populateDatabase = () => {
  const sanitizedData = [];

  db.ref('rssFeed')
  .once('value', (snap) => {
    return snap.forEach((n) => {
      const key = n.key;
      const title = n.val().title; // Title shouldn't change, using this as source of truth
      sanitizedData.push({ key, title });
    });
    return sanitizedData.sort((a,b) => a.title - b.title);
  })
  .then(() => {
    return rssFeed(sanitizedData);
  });
};

const rssFeed = async (sanitizedData) => {
  const feedData = [];

  const { items } = await parser.parseURL(url)
  .catch((e) => console.log(e));
  
  await items.sort((a,b) => a.title - b.title);

  items.forEach(({ title, link, pubDate, content }, i) => {
    if (sanitizedData.length > 0) {
      if (title !== sanitizedData[i].title) {
        return db.ref('rssFeed')
        .push({ title, link, pubDate, content, favorited: false })
        .catch(ignore => {  })
      }
    } else {
      return db.ref('rssFeed')
      .push({ title, link, pubDate, content, favorited: false })
      .catch(ignore => {  })
    }
  });
};

module.exports = { populateDatabase };
