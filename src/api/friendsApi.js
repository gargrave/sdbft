import firebase from '../firebaseApi';

const REF = firebase.database().ref('friends');

const getUrlFor = function(obj) {
  return firebase.database().ref(`friends/${obj.id}`);
};

class FriendsApi {
  static createFriend(friend) {
    return new Promise((resolve, reject) => {
      let newFriend = REF.push();
      newFriend.set(friend, err => {
        if (err) {
          reject(err);
        } else {
          REF.limitToLast(1).once('value', snapshot => {
            resolve(snapshot.val());
          });
        }
      });
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
