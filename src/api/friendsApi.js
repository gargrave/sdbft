import firebase from '../utils/firebase/firebase';
import auth from '../utils/firebase/firebaseAuth';

const DB = firebase.database();

const getUrlFor = function(obj) {
  return firebase.database().ref(`friends/${obj.id}`);
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
    let friendUrl = getUrlFor(friend);
    return new Promise((resolve, reject) => {
      friendUrl.update(friend, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static deleteFriend(friend) {
    let friendUrl = getUrlFor(friend);
    return new Promise((resolve, reject) => {
      friendUrl.remove()
        .then(function() {
          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    });
  }
}

export default FriendsApi;
