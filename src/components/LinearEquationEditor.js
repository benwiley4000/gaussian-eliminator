import React, { Component } from 'react';
import VariableEditor from './VariableEditor';
import ConstantEditor from './ConstantEditor';
import { linearequations } from 'pure-linear-algebra';

class LinearEquationEditor extends Component {
  constructor (props) {
    super(props);

    this.state = {
      equation: props.equation
    };

    this.handleCoefficientUpdate = this.handleCoefficientUpdate.bind(this);
    this.handleConstantUpdate = this.handleConstantUpdate.bind(this);
  }

  handleCoefficientUpdate (dimensionIndex, coefficient) {
    const { coefficients, constant } = this.state.equation;
    const newCoefficients = coefficients.slice();
    newCoefficients[dimensionIndex] = coefficient;
    this.setState({
      equation: new linearequations.LinearEquation(newCoefficients, constant)
    });
  }

  handleConstantUpdate (constant) {
    const { coefficients } = this.state.equation;
    this.setState({
      equation: new linearequations.LinearEquation(coefficients, constant)
    });
  }

  render () {
    const { equation: { coefficients, constant } } = this.state;
    return (
      <div className="row linear-equation align-items-center">
        {coefficients.reduce((memo, coefficient, index) => {
          memo.push(
            <VariableEditor
              key={`var-${index}`}
              value={coefficient}
              dimensionIndex={index}
              totalDimensions={coefficients.length}
              onUpdate={this.handleCoefficientUpdate}
            />
          );
          memo.push(
            <span className="operator" key={`op-${index}`}>
              {index + 1 < coefficients.length ? '+' : '='}
            </span>
          );
          return memo;
        }, [])}
        <ConstantEditor value={constant} onUpdate={this.handleConstantUpdate} />
      </div>
    );
  }
}

export default LinearEquationEditor;
