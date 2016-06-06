import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function friendsReducer(state = initialState.friends, action) {
  switch (action.type) {
    case types.FETCH_FRIENDS_SUCCESS:
      return action.friends;

    case types.SAVE_FRIEND_SUCCESS:
      return state;

    case types.SAVE_FRIEND_ERROR:
      return state;

    case types.DELETE_FRIEND_SUCCESS:
      return state;

    case types.DELETE_FRIEND_ERROR:
      return state;

    default:
      return state;
  }
}
