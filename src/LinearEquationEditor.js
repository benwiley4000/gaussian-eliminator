import React, { Component } from 'react';

const numberSubscriptOffset = 8272;

function numberToSubscript (num) {
  return Array.prototype.reduce.call(num.toString(), (acc, digit) => {
    return acc + (
      isNaN(digit)
        ? digit
        : String.fromCharCode(digit.charCodeAt(0) + numberSubscriptOffset)
    );
  }, '');
}

function dimensionIndexToSymbol (index, totalDimensions) {
  if (totalDimensions > 3) {
    return `x${numberToSubscript(index + 1)}`;
  }
  switch (index) {
    case 0:
      return 'x';
    case 1:
      return 'y';
    case 2:
      return 'z';
  }
}

class LinearEquationEditor extends Component {
  render() {
    const { equation: { coefficients, constant } } = this.props;
    return (
      <div className="row linear-equation align-items-center">
        {coefficients.reduce((memo, coefficient, index) => {
          memo.push(
            <div className="input-group variable" key={`var-${index}`}>
              <input className="form-control" pattern="[0-9]*" type="number" defaultValue={coefficient} />
              <span className="input-group-addon">
                <var>{dimensionIndexToSymbol(index, coefficients.length)}</var>
              </span>
            </div>
          );
          memo.push(
            <span className="operator" key={`op-${index}`}>
              {index + 1 < coefficients.length ? '+' : '='}
            </span>
          );
          return memo;
        }, [])}
        <input className="form-control constant" pattern="[0-9]*" type="number" defaultValue={constant} />
      </div>
    );
  }
}

export default LinearEquationEditor;
