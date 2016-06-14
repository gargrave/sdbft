import firebase from '../firebase/firebase';
import auth from '../firebase/firebaseAuth';


const MODULE_NAME = 'articles';
const DB = firebase.database();

const getUrlFor = function(user, obj) {
  return DB.ref(`${MODULE_NAME}/${user.uid}/${obj.id}`);
};

class ArticlesApi {
  static fetchArticlesForFriend(friendId) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let dbRef = DB.ref(`${MODULE_NAME}/${auth.user().uid}/${friendId}`);
        dbRef.once('value')
          .then(snapshot => {
            resolve(snapshot.val());
          });
      }
      else {
        // not logged in; reject immediately
        reject('Not logged in');
      }
    });
  }

  static createArticle(article) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        // get the path to this user's 'articles' storage
        let dbRef = DB.ref(`${MODULE_NAME}/${auth.user().uid}`);
        let newArticle = dbRef.push();

        newArticle.set(article, err => {
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

  static updateArticle(article) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let articleUrl = getUrlFor(auth.user(), article);
        // make sure we don't send the article with an id field, since the server already knows it
        if (article.hasOwnProperty('id')) {
          delete article.id;
        }

        articleUrl.update(article, err => {
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

  static deleteArticle(article) {
    return new Promise((resolve, reject) => {
      if (auth.isLoggedIn()) {
        let articleUrl = getUrlFor(auth.user(), article);

        articleUrl.remove()
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

export default ArticlesApi;
