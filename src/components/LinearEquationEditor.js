import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { linearequations } from 'pure-linear-algebra';
import VariableEditor from './VariableEditor';
import ConstantEditor from './ConstantEditor';

class LinearEquationEditor extends Component {
  static propTypes = {
    equation: PropTypes.instanceOf(linearequations.LinearEquation).isRequired,
    onCoefficientChange: PropTypes.func.isRequired,
    onConstantChange: PropTypes.func.isRequired
  };

  render () {
    const {
      equation: { coefficients, constant },
      onCoefficientChange,
      onConstantChange
    } = this.props;
    return (
      <div className="row linear-equation align-items-center">
        {coefficients.reduce((memo, coefficient, index) => {
          memo.push(
            <VariableEditor
              key={`var-${index}`}
              value={coefficient}
              dimensionIndex={index}
              totalDimensions={coefficients.length}
              onChange={onCoefficientChange}
            />
          );
          memo.push(
            <span className="operator" key={`op-${index}`}>
              {index + 1 < coefficients.length ? '+' : '='}
            </span>
          );
          return memo;
        }, [])}
        <ConstantEditor value={constant} onChange={onConstantChange} />
      </div>
    );
  }
}

export default LinearEquationEditor;
