import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function friendsReducer(state = initialState.friends, action) {
  switch (action.type) {
    case types.FETCH_FRIENDS_SUCCESS:
      return action.friends;

    case types.CREATE_FRIEND_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.friend)
      ];

    default:
      return state;
  }
}
