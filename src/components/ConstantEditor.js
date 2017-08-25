import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ConstantEditor extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

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
