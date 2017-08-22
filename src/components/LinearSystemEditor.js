import React, { Component } from 'react';
import LinearEquationEditor from './LinearEquationEditor';

class LinearSystemEditor extends Component {
  render () {
    const { system: { equations } } = this.props;
    return (
      <div className="linear-system">
        {equations.map((equation, i) =>
          <LinearEquationEditor key={i} equation={equation} />
        )}
      </div>
    );
  }
}

export default LinearSystemEditor;
