import {combineReducers} from 'redux';
import status from './statusReducer';
import user from './authReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  status,
  user,
  friends
});

export default rootReducer;
