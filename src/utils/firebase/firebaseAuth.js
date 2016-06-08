import firebase from 'firebase';

const auth = firebase.auth();

export default {
  /**
   * Returns the current user; will be null if not logged in
   * @returns {firebase.User|null}
   */
  user() {
    return auth.currentUser;
  },

  isLoggedIn() {
    return auth.currentUser !== null;
  },

  /**
   * Attempts to create a new user on Firebase
   * with the specified email and password.
   * @param email
   * @param pass
   */
  newUserWithEmail(email, pass) {
    return auth.createUserWithEmailAndPassword(email, pass);
  },

  signInWithEmail(email, pass) {
    return auth.signInWithEmailAndPassword(email, pass);
  },

  signOut() {
    return auth.signOut();
  }
};
