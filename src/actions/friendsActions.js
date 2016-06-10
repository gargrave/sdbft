import * as types from '../constants/actionTypes';
import {USE_MOCK_APIS} from '../constants/env';

import mockFriendsApi from '../api/mockFriendsApi';
import liveFriendsApi from '../api/friendsApi';

const API = USE_MOCK_APIS ? mockFriendsApi : liveFriendsApi;


function friendsAjaxStart() {
  return {
    type: types.FRIENDS_AJAX_START
  };
}

function friendsAjaxEnd() {
  return {
    type: types.FRIENDS_AJAX_END
  };
}


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
    dispatch(friendsAjaxStart());
    return API.fetchFriends()
      .then(res => {
        dispatch(fetchFriendsSuccess(res.data));
        dispatch(friendsAjaxEnd());
      }, err => {
        dispatch(fetchFriendsError());
        dispatch(friendsAjaxEnd());
        throw Error(err);
      });
  };
}

export function saveFriend(friend) {
  return function(dispatch) {
    dispatch(friendsAjaxStart());
    return API.saveFriend(friend)
      .then(res => {
        dispatch(saveFriendSuccess(res));
        dispatch(friendsAjaxEnd());
      }, err => {
        dispatch(saveFriendError());
        dispatch(friendsAjaxEnd());
        throw Error(err);
      });
  };
}

export function updateFriend(friend) {
  return function(dispatch) {
    dispatch(friendsAjaxStart());
    return API.updateFriend(friend)
      .then(res => {
        dispatch(updateFriendSuccess(res));
        dispatch(friendsAjaxEnd());
      })
      .catch(err => {
        dispatch(updateFriendError());
        dispatch(friendsAjaxEnd());
        throw(err);
      });
  };
}

export function deleteFriend(friendId) {
  return function(dispatch) {
    dispatch(friendsAjaxStart());
    return API.deleteFriend(friendId)
      .then(res => {
        dispatch(deleteFriendSuccess(friendId));
        dispatch(friendsAjaxEnd());
      })
      .catch(err => {
        dispatch(deleteFriendError());
        dispatch(friendsAjaxEnd());
        throw(err.message);
      });
  };
}
