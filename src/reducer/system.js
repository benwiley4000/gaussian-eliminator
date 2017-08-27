import { linearsystems } from 'pure-linear-algebra';
import { defaultState as defaultSystemState } from './primarySystem';
import { PRIMARY_SYSTEM_UPDATE } from '../actions/primarySystem';

function system (state = defaultSystemState.system, action) {
  switch (action.type) {
    case PRIMARY_SYSTEM_UPDATE:
      return action.systemState.system;
    default:
      return linearsystems.systemstore.reducer(state, action);
  }
}

export default system;
