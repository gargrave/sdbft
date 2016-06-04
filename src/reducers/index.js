import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  fuelSavings,
  friends
});

export default rootReducer;
