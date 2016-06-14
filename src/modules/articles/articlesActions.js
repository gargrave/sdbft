import * as types from '../../constants/actionTypes';
import {USE_MOCK_APIS} from '../../constants/env';
import {fbToArray} from '../firebase/firebaseUtils';

import mockArticlesApi from './mockArticlesApi';
import liveArticlesApi from './articlesApi';


const API = USE_MOCK_APIS ? mockArticlesApi : liveArticlesApi;

function articlesAjaxStart() {
  return {
    type: types.ARTICLES_AJAX_START
  };
}

function articlesAjaxEnd() {
  return {
    type: types.ARTICLES_AJAX_END
  };
}


/* fetch actions */
function fetchArticlesBegin() {
  return {
    type: types.FETCH_ARTICLES_BEGIN
  };
}

function fetchArticlesSuccess(articles) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    articles
  };
}

function fetchArticlesError(error) {
  return {
    type: types.FETCH_ARTICLES_ERROR,
    error
  };
}


/* save actions */
function saveArticleSuccess(article) {
  return {
    type: types.SAVE_ARTICLE_SUCCESS,
    article
  };
}

function saveArticleError() {
  return {
    type: types.SAVE_ARTICLE_ERROR
  };
}


/* update article actions */
function updateArticleSuccess(article) {
  return {
    type: types.UPDATE_ARTICLE_SUCCESS,
    article
  };
}

function updateArticleError() {
  return {
    type: types.UPDATE_ARTICLE_ERROR
  };
}


/* delete article actions */
function deleteArticleSuccess(articleId) {
  return {
    type: types.DELETE_ARTICLE_SUCCESS,
    articleId
  };
}
function deleteArticleError() {
  return {
    type: types.DELETE_ARTICLE_ERROR
  };
}

/*=============================================
 = Action Creators
 =============================================*/
export function fetchArticlesForFriend(friendId) {
  return function(dispatch) {
    dispatch(articlesAjaxStart());
    dispatch(fetchArticlesBegin());
    return API.fetchArticlesForFriend(friendId)
      .then(res => {
        dispatch(fetchArticlesSuccess(fbToArray(res)));
        dispatch(articlesAjaxEnd());
      }, err => {
        dispatch(fetchArticlesError());
        dispatch(articlesAjaxEnd());
        throw Error(err);
      });
  };
}
