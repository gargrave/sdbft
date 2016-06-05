import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyAWsrE-syng6ke3fM52YBf7WvioVvKIiTA",
  authDomain: "react-test-5db9f.firebaseapp.com",
  databaseURL: "https://react-test-5db9f.firebaseio.com",
  storageBucket: "react-test-5db9f.appspot.com"
});

let database = firebase.database();

export default {
  db: database
};
