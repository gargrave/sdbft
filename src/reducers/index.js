import {combineReducers} from 'redux';
import status from './statusReducer';
import ajax from './ajaxReducer';
import user from './authReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  status,
  ajax,
  user,
  friends
});

export default rootReducer;
