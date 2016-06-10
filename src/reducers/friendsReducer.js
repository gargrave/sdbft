import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function friendsReducer(state = initialState.friends, action) {
  switch (action.type) {
    case types.FETCH_FRIENDS_SUCCESS:
      return action.friends;

    case types.SAVE_FRIEND_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.friend)
      ];

    case types.SAVE_FRIEND_ERROR:
      return state;


    case types.UPDATE_FRIEND_SUCCESS:
      return [
        ...state.filter(friend => friend.id !== action.friend.id),
        Object.assign({}, action.friend)
      ];

    case types.UPDATE_FRIEND_ERROR:
      return state;


    case types.DELETE_FRIEND_SUCCESS:
      return state.filter(friend => friend.id !== action.friendId);

    case types.DELETE_FRIEND_ERROR:
      return state;


    // clear friends array on logout
    case types.LOGOUT_SUCCESS:
      return [];


    default:
      return state;
  }
}
