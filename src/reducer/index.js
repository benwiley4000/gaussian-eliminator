import { combineReducers } from 'redux';
import { enableBatching } from 'redux-batched-actions';
import primarySystem from './primarySystem';
import system from './system';

const reducer = combineReducers({
  primarySystem,
  system
});

export default enableBatching(reducer);
