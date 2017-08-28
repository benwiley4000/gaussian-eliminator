import { linearsystems } from 'pure-linear-algebra';
import undoable from 'redux-undo';
import { defaultState as defaultSystemState } from './primarySystem';
import { PRIMARY_SYSTEM_UPDATE } from '../actions/primarySystem';

const defaultState = {
  system: defaultSystemState.system,
  action: null
};

function system (state = defaultState, action) {
  switch (action.type) {
    case PRIMARY_SYSTEM_UPDATE:
      return {
        system: action.systemState.system,
        action: null
      };
    default: {
      const newSystem = linearsystems.systemstore.reducer(state.system, action);
      return state.system === newSystem ? state : {
        system: newSystem,
        action
      };
    }
  }
}

export default undoable(system);
