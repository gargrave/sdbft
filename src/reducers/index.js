import {combineReducers} from 'redux';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  friends
});

export default rootReducer;
