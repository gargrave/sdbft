import * as types from '../constants/actionTypes';
import initialState from './initialState';

function buildUserData(user) {
  return {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    isAnonymous: user.isAnonymous,
    photoURL: user.photoURL
  };
}

export default function friendsReducer(state = initialState.user, action) {
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      return buildUserData(action.user);

    case types.LOGOUT_SUCCESS:
      return {};

    default:
      return state;
  }
}
