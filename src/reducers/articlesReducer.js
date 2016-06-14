import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function articlesReducer(state = initialState.articles, action) {
  switch (action.type) {

    // clear the list when a new fetch call begins
    case types.FETCH_ARTICLES_BEGIN:
      return [];

    case types.FETCH_ARTICLES_SUCCESS:
      return action.articles;

    case types.FETCH_ARTICLES_ERROR:
      return state;


    // successful article save should add the new article to the local list
    case types.SAVE_ARTICLE_SUCCESS:
      return [
        ...state,
        action.article
      ];


    case types.SAVE_ARTICLE_ERROR:
      return state;


    // successful article update should replace the local copy of the original article
    case types.UPDATE_ARTICLE_SUCCESS:
      return [
        ...state.filter(article => article.id !== action.article.id),
        Object.assign({}, action.article)
      ];

    case types.UPDATE_ARTICLE_ERROR:
      return state;


    // successful article deletion needs to remove our local copy
    case types.DELETE_ARTICLE_SUCCESS:
      return state.filter(article => article.id !== action.articleId);

    case types.DELETE_ARTICLE_ERROR:
      return state;


    // clear articles array on logout
    case types.LOGOUT_SUCCESS:
      return [];


    default:
      return state;
  }
}
