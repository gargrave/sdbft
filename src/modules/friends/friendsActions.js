import * as types from '../../constants/actionTypes';
import {USE_MOCK_APIS} from '../../constants/env';
import {fbToArray} from '../../utils/firebase/firebaseUtils';

import mockFriendsApi from './mockFriendsApi';
import liveFriendsApi from './friendsApi';


const API = USE_MOCK_APIS ? mockFriendsApi : liveFriendsApi;

function fetchFriendsSuccess(friends) {
  return {
    type: types.FETCH_FRIENDS_SUCCESS,
    friends
  };
}

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

function deleteFriendSuccess() {
  return {
    type: types.DELETE_FRIEND_SUCCESS
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
export function updateFriends(friends) {
  return function(dispatch) {
    dispatch(fetchFriendsSuccess(fbToArray(friends)));
  };
}

export function saveFriend(friend) {
  return function(dispatch) {
    return API.createFriend(friend)
      .then(res => {
        dispatch(saveFriendSuccess(fbToArray(res)));
      })
      .catch(err => {
        dispatch(saveFriendError());
        throw(err);
      });
  };
}

export function updateFriend(friend) {
  return function(dispatch) {
    return API.updateFriend(friend)
      .then(res => {
        dispatch(saveFriendSuccess(fbToArray(res)));
      })
      .catch(err => {
        dispatch(saveFriendError());
        throw(err);
      });
  };
}

export function deleteFriend(friend) {
  return function(dispatch) {
    return API.deleteFriend(friend)
      .then(res => {
        dispatch(deleteFriendSuccess());
      })
      .catch(err => {
        dispatch(deleteFriendError());
        throw(err);
      });
  };
}
