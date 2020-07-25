const firebase = require('firebase/app');
require('firebase/database');

var config = {
  apiKey: "AIzaSyBN7MlmYrWYEuExsIur3R-jv33l6ZDnzMs",
  authDomain: "devtracker-e70e1.firebaseapp.com",
  databaseURL: "https://devtracker-e70e1.firebaseio.com",
  projectId: "devtracker-e70e1",
  storageBucket: "devtracker-e70e1.appspot.com",
  messagingSenderId: "239362403832",
  appId: "1:239362403832:web:cf037aa23e51901e7fba0d"
};

firebase.initializeApp(config);

const db = firebase.database();

module.exports = { db };
