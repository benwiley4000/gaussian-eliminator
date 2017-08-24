import { connect } from 'react-redux';
import LinearEquationEditor from './LinearEquationEditor';
import { coefficientUpdate, constantUpdate } from '../actions/primarySystem';

function mapDispatchToProps (dispatch, { rowIndex }) {
  return {
    onCoefficientChange: (dimensionIndex, coefficient) => {
      dispatch(coefficientUpdate(rowIndex, dimensionIndex, coefficient));
    },
    onConstantChange: constant => dispatch(constantUpdate(rowIndex, constant))
  };
}

export default connect(null, mapDispatchToProps)(LinearEquationEditor);
