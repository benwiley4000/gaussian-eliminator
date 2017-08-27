import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

class VariableEditor extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf([''])
    ]).isRequired,
    dimensionIndex: PropTypes.number.isRequired,
    totalDimensions: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const { onChange, dimensionIndex } = this.props;
    onChange(dimensionIndex, e.target.value && Number(e.target.value));
  }

  render () {
    const { value, dimensionIndex, totalDimensions, disabled } = this.props;
    return (
      <div className="input-group variable">
        <input
          className="form-control"
          pattern="[0-9]*"
          type="number"
          value={value}
          disabled={disabled}
          onChange={this.handleChange}
        />
        <span className="input-group-addon">
          <var>{dimensionIndexToSymbol(dimensionIndex, totalDimensions)}</var>
        </span>
      </div>
    );
  }
}

export default VariableEditor;
