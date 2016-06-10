import * as types from '../constants/actionTypes';
import {USE_MOCK_APIS} from '../constants/env';

import mockFriendsApi from '../api/mockFriendsApi';
import liveFriendsApi from '../api/friendsApi';

const API = USE_MOCK_APIS ? mockFriendsApi : liveFriendsApi;


/* fetch friends actions */
function fetchFriendsBegin() {
  return {
    type: types.FETCH_FRIENDS_BEGIN
  };
}

function fetchFriendsSuccess(friends) {
  return {
    type: types.FETCH_FRIENDS_SUCCESS,
    friends
  };
}

function fetchFriendsError(error) {
  return {
    type: types.FETCH_FRIENDS_ERROR,
    error
  };
}


/* save friend actions */
function saveFriendSuccess(friend) {
  return {
    type: types.SAVE_FRIEND_SUCCESS,
    friend
  };
}

function saveFriendError() {
  return {
    type: types.SAVE_FRIEND_ERROR
  };
}


/* update friend actions */
function updateFriendSuccess(friend) {
  return {
    type: types.UPDATE_FRIEND_SUCCESS,
    friend
  };
}

function updateFriendError() {
  return {
    type: types.UPDATE_FRIEND_ERROR
  };
}


/* delete friend actions */
function deleteFriendSuccess(friendId) {
  return {
    type: types.DELETE_FRIEND_SUCCESS,
    friendId
  };
}
function deleteFriendError() {
  return {
    type: types.DELETE_FRIEND_ERROR
  };
}


/*=============================================
 = Thunk Action Creators
 =============================================*/
export function fetchFriends() {
  return function(dispatch) {
    dispatch(fetchFriendsBegin());
    return API.fetchFriends()
      .then(res => {
        dispatch(fetchFriendsSuccess(res.data));
      }, err => {
        dispatch(fetchFriendsError());
        throw Error(err);
      });
  };
}

export function saveFriend(friend) {
  return function(dispatch) {
    return API.saveFriend(friend)
      .then(res => {
        dispatch(saveFriendSuccess(res));
      }, err => {
        dispatch(saveFriendError());
        throw Error(err);
      });
  };
}

export function updateFriend(friend) {
  return function(dispatch) {
    return API.updateFriend(friend)
      .then(res => {
        dispatch(updateFriendSuccess(res));
      })
      .catch(err => {
        dispatch(updateFriendError());
        throw(err);
      });
  };
}

export function deleteFriend(friendId) {
  return function(dispatch) {
    return API.deleteFriend(friendId)
      .then(res => {
        dispatch(deleteFriendSuccess(friendId));
      })
      .catch(err => {
        dispatch(deleteFriendError());
        throw(err.message);
      });
  };
}
