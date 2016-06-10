import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function ajaxReducer(state = initialState.ajax, action) {
  let ajax = Object.assign({}, ajax);
  switch (action.type) {

    case types.AUTH_AJAX_START:
      ajax.authApiWorking = true;
      return ajax;

    case types.AUTH_AJAX_END:
      ajax.authApiWorking = false;
      return ajax;

    default:
      return ajax;
  }
}
