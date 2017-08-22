import React, { Component } from 'react';

class ConstantEditor extends Component {
  constructor (props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate (e) {
    this.props.onUpdate(e.target.value);
  }

  render () {
    return (
      <input
        className="form-control constant"
        pattern="[0-9]*"
        type="number"
        value={this.props.value}
        onChange={this.handleUpdate}
      />
    );
  }
}

export default ConstantEditor;
