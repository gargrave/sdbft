/* eslint-disable no-undef */
let user = undefined;

const setUser = function(userData) {
  user = {
    id: userData._id,
    email: userData.email,
    emailVerified: userData.emailVerified,
    username: userData.username,
    displayName: userData.displayName,
    profileImg: userData.profileImg,
    dt_update: userData.dt_update,
    dt_create: userData.dt_create
  };
};

const clearUser = function() {
  user = undefined;
};

export default {
  init() {
    return this.user();
  },

  isLoggedIn() {
    return user !== undefined;
  },

  user() {
    return new Promise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        Stamplay.User.currentUser()
          .then(res => {
            setUser(res.user);
            resolve(user);
          }, err => {
            reject(err);
          });
      }
    });
  },

  logout() {
    return new Promise((resolve, reject) => {
      if (!this.isLoggedIn()) {
        resolve();
      } else {
        Stamplay.User.logout(true, () => {
          clearUser();
          resolve();
        });
      }
    });
  },

  login(credentials) {
    return new Promise((resolve, reject) => {
      Stamplay.User.login(credentials)
        .then(res => {
          setUser(res);
          resolve(user);
        }, err => {
          reject(err.message);
        });
    });
  },

  createUser(credentials) {
    // http://docs.stamplay.com/?app=s4p4ubv04xaj-auth-test&lang=javascript#signup
    console.log('createUser not implemented');
  }
};
