import * as types from '../constants/actionTypes';


function loginSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    user
  };
}

function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS
  };
}

export function userLoggedIn(user) {
  return function(dispatch) {
    dispatch(loginSuccess(user));
  };
}

export function userLoggedOut() {
  return function(dispatch) {
    dispatch(logoutSuccess());
  };
}
