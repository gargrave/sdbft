import {combineReducers} from 'redux';
import user from './authReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  user,
  friends
});

export default rootReducer;
