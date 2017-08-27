import { linearsystems, linearequations } from 'pure-linear-algebra';
import { PRIMARY_SYSTEM_UPDATE } from '../actions/primarySystem';
import zeroArray from '../utils/zeroArray';

const defaultState = {
  equationCount: 2,
  variableCount: 2,
  system: new linearsystems.LinearSystem([
    new linearequations.LinearEquation(zeroArray(2), 0),
    new linearequations.LinearEquation(zeroArray(2), 0)
  ])
};

function primarySystem (state = defaultState, action) {
  switch (action.type) {
    case PRIMARY_SYSTEM_UPDATE:
      return action.systemState;
    default:
      return state;
  }
}

export default primarySystem;
