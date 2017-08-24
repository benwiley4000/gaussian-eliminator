import React, { Component } from 'react';

class ConstantEditor extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    this.props.onChange(e.target.value);
  }

  render () {
    return (
      <input
        className="form-control constant"
        pattern="[0-9]*"
        type="number"
        value={this.props.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default ConstantEditor;
