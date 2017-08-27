import { combineReducers } from 'redux';
import primarySystem from './primarySystem';
import system from './system';

const reducer = combineReducers({
  primarySystem,
  system
});

export default reducer;
