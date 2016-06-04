import * as types from '../constants/actionTypes';
import {USE_MOCK_APIS} from '../constants/env';

import mockFriendsApi from '../api/mockFriendsApi';
import liveFriendsApi from '../api/friendsApi';

const API = USE_MOCK_APIS ? mockFriendsApi : liveFriendsApi;


function fetchFriendsSuccess(friends) {
  return {
    type: types.FETCH_FRIENDS_SUCCESS,
    friends
  };
}

export function fetchFriends() {
  return function(dispatch) {
    return API.fetchFriends()
      .then(res => {
        dispatch(fetchFriendsSuccess(res.friends));
      })
      .catch(err => {
        console.log(err);
        throw(err);
      });
  };
}
