import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function statusReducer(state = initialState.status, action) {
  let status = Object.assign({}, state);
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      status.loggedIn = true;
      status.needFriendsApiRefresh = true;
      return status;

    case types.LOGOUT_SUCCESS:
      status.loggedIn = false;
      return status;

    case types.FETCH_FRIENDS_BEGIN:
    case types.FETCH_FRIENDS_SUCCESS:
    case types.FETCH_FRIENDS_ERROR:
      status.needFriendsApiRefresh = false;
      return status;

    default:
      return status;
  }
}
