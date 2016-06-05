import fb from '../firebaseApi';


class FriendsApi {
  static fetchFriends() {
    return new Promise((resolve, reject) => {
      fb.db.ref('friends').on('value', snapshot => {
        resolve(snapshot.val());
      });
    });
  }

  static createFriend(payload) {
    return new Promise((resolve, reject) => {
      reject('Firebase creation not implemented.');
    });
  }
}

export default FriendsApi;
