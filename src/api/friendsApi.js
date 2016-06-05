import request from 'superagent';

const API_ROOT = 'http://api.ember-cli-101.com/api/friends';

class FriendsApi {
  // static fetchFriends() {
  //   return new Promise((resolve, reject) => {
  //     fetch(API_ROOT)
  //       .then(res => res.json())
  //       .then(json => {
  //         resolve(json);
  //       })
  //       .catch(err => reject(err));
  //   });
  // }

  static fetchFriends() {
    return new Promise((resolve, reject) => {
      request
        .get(API_ROOT)
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    });
  }
}

export default FriendsApi;

/*
 request
 .post('/api/pet')
 .send({ name: 'Manny', species: 'cat' })
 .set('X-API-Key', 'foobar')
 .set('Accept', 'application/json')
 .end(function(err, res){
 // Calling the end function will send the request
 });
 */
