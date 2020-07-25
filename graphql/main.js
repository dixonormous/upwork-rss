const { db } = require('../database');
const { sendEmail } = require('../sendgrid/sendEmail');

const POSTS = new Map();

class Post {
  constructor (data) { Object.assign(this, data) }

  get posts () {
    return [...POSTS.values()]
  }

};

const resolvers = {
  // Queries
  Query: {
    posts: () => POSTS.values(),
    post: (parent, { id }) => POSTS.get(id)
  },

  // Mutations
  Mutation: {
    deletePost: async (parent, { id }) => {
      if (!POSTS.has(id)) return false

      POSTS.delete(id)
      await deletePost(id)

      return true
    },
    favoritePost: async (parent, { id }) => {
      if (!POSTS.has(id)) return false

      await sendEmail()
      await saveFavorite(id)

      return true
    }
  }
};

// Delete post from Firebase
const deletePost = (id) => db.ref(`rssFeed/${id}`).remove();

// Save post as favorite
const saveFavorite = (id) => db.ref(`rssFeed/${id}`).update({ favorited: true })

// Fetch data to seed GraphQL API
const fetchData = () => {
  const data = [];
  return db.ref('rssFeed')
  .once('value', (snap) => {
    return snap.forEach((n) => {
      const id = n.key;
      const link = n.val().link;
      const title = n.val().title;
      const content = n.val().content;
      const pubDate = n.val().pubDate;
      const favorited = n.val().favorited || false;

      const post = { id, link, title, content, pubDate, favorited };
      POSTS.set(id, new Post(post))
    })
  })
  .then(() => console.log('Finished fetching data'))
  .catch(ignore => { })
}

module.exports = { fetchData, resolvers };
