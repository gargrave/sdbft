import firebase from '../utils/firebase/firebase';
import auth from '../utils/firebase/firebaseAuth';

const DB = firebase.database();

const getUrlFor = function(user, obj) {
  return DB.ref(`friends/${user.uid}/${obj.id}`);
};

class FriendsApi {
  static createFriend(friend) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        // get the path to this user's 'friends' storage
        let dbRef = DB.ref(`friends/${auth.user().uid}`);
        let newFriend = dbRef.push();

        newFriend.set(friend, err => {
          if (err) {
            reject(err);
          } else {
            dbRef.limitToLast(1).once('value', snapshot => {
              resolve(snapshot.val());
            });
          }
        });
      } else {
        // not logged in; reject immediately
        reject('Not logged in');
      }
    });
  }

  static updateFriend(friend) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let friendUrl = getUrlFor(auth.user(), friend);
        // make sure we don't send the friend with an id field, since the server already knows it
        if (friend.hasOwnProperty('id')) {
          delete friend.id;
        }

        friendUrl.update(friend, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } else {
        // not logged in; reject immediately
        reject('Not logged in');
      }
    });
  }

  static deleteFriend(friend) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let friendUrl = getUrlFor(auth.user(), friend);

        friendUrl.remove()
          .then(function() {
            resolve();
          })
          .catch(function(err) {
            reject(err);
          });
      } else {
        // not logged in; reject immediately
        reject('Not logged in');
      }
    });
  }
}

export default FriendsApi;
