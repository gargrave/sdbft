import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function statusReducer(state = initialState.status, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {

    case types.LOGIN_SUCCESS:
      newState.needFriendsApiRefresh = true;
      return newState;

    case types.FETCH_FRIENDS_BEGIN:
    case types.FETCH_FRIENDS_SUCCESS:
    case types.FETCH_FRIENDS_ERROR:
      newState.needFriendsApiRefresh = false;
      return newState;

    default:
      return state;
  }
}
