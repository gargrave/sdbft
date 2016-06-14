import {combineReducers} from 'redux';
import user from './authReducer';
import friends from './friendsReducer';
import articles from './articlesReducer';

const rootReducer = combineReducers({
  user,
  friends,
  articles
});

export default rootReducer;
