import {combineReducers} from 'redux';
import status from './statusReducer';
import api from './apiReducer';
import user from './authReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  status,
  api,
  user,
  friends
});

export default rootReducer;
