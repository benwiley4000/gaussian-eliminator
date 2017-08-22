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

class VariableEditor extends Component {
  constructor (props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate (e) {
    const { onUpdate, dimensionIndex } = this.props;
    onUpdate(dimensionIndex, e.target.value);
  }

  render () {
    const { value, dimensionIndex, totalDimensions } = this.props;
    return (
      <div className="input-group variable">
        <input
          className="form-control"
          pattern="[0-9]*"
          type="number"
          value={value}
          onChange={this.handleUpdate}
        />
        <span className="input-group-addon">
          <var>{dimensionIndexToSymbol(dimensionIndex, totalDimensions)}</var>
        </span>
      </div>
    );
  }
}

export default VariableEditor;
