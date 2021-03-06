import * as types from '../constants/actionTypes';
import initialState from './initialState';


export default function apiReducer(state = initialState.api, action) {
  let api = Object.assign({}, state);
  switch (action.type) {

    case types.AUTH_AJAX_START:
      api.authApiWorking = true;
      return api;

    case types.AUTH_AJAX_END:
      api.authApiWorking = false;
      return api;


    case types.FRIENDS_AJAX_START:
      api.friendsApiWorking = true;
      return api;

    case types.FRIENDS_AJAX_END:
      api.friendsApiWorking = false;
      return api;


    case types.ARTICLES_AJAX_START:
      api.articlesApiWorking = true;
      return api;

    case types.ARTICLES_AJAX_END:
      api.articlesApiWorking = false;
      return api;


    default:
      return api;
  }
}
