import { connect } from 'react-redux';
import { ActionCreators as undoActions } from 'redux-undo';
import LinearSystemEditor from './LinearSystemEditor';
import {
  getEquationCount,
  getVariableCount,
  getPrimarySystemIsValid
} from '../selectors/primarySystem';
import {
  getSystem,
  getSolution,
  getLastActionForSystem,
  getHasPast,
  getHasFuture
} from '../selectors/system';
import {
  equationCountUpdate,
  variableCountUpdate
} from '../actions/primarySystem';
import { solveSystem } from '../actions/system';

function mapStateToProps (state) {
  return {
    equationCount: getEquationCount(state),
    variableCount: getVariableCount(state),
    primarySystemIsValid: getPrimarySystemIsValid(state),
    system: getSystem(state),
    solution: getSolution(state),
    lastActionForSystem: getLastActionForSystem(state),
    hasPast: getHasPast(state),
    hasFuture: getHasFuture(state)
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onEquationCountChange: count => dispatch(equationCountUpdate(count)),
    onVariableCountChange: count => dispatch(variableCountUpdate(count)),
    onGoBack: () => dispatch(undoActions.undo()),
    onGoForward: () => dispatch(undoActions.redo()),
    onRequestSolution: () => dispatch(solveSystem())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinearSystemEditor);
