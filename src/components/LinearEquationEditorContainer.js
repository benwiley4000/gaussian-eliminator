import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const LinearEquationEditorContainer = connect(
  null,
  mapDispatchToProps
)(LinearEquationEditor);

LinearEquationEditorContainer.propTypes = {
  ...LinearEquationEditorContainer.propTypes,
  rowIndex: PropTypes.number.isRequired
};

export default LinearEquationEditorContainer;
