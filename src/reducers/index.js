import {combineReducers} from 'redux';
import api from './apiReducer';
import user from './authReducer';
import friends from './friendsReducer';
import articles from './articlesReducer';

const rootReducer = combineReducers({
  api,
  user,
  friends,
  articles
});

export default rootReducer;
