import { connect } from 'react-redux';
import LinearSystemEditor from './LinearSystemEditor';
import {
  equationCountUpdate,
  variableCountUpdate
} from '../actions/primarySystem';

function mapStateToProps (state) {
  return {
    ...state.primarySystem,
    system: state.system,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    onEquationCountChange: count => dispatch(equationCountUpdate(count)),
    onVariableCountChange: count => dispatch(variableCountUpdate(count))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LinearSystemEditor);
