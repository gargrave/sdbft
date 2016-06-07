import firebase from 'firebase';

import * as actions from '../../actions/authActions';

const auth = firebase.auth();

export default {
  isLoggedIn() {
    return auth.currentUser !== null;
  },

  newUserWithEmail(email, pass) {
    console.log('newUserWithEmail');
    auth.createUserWithEmailAndPassword(email, pass)
      .catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log('error: ' + errorMessage);
      });
  },

  signInWithEmail(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass);
  },

  signOut() {
    return auth.signOut();
  }
};
