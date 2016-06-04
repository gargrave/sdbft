const API_ROOT = 'http://api.ember-cli-101.com/api/friends';

class FriendsApi {
  static fetchFriends() {
    return new Promise((resolve, reject) => {
      fetch(API_ROOT)
        .then(res => res.json())
        .then(json => {
          resolve(json);
        })
        .catch(err => reject(err));
    })
  }
}

export default FriendsApi;
