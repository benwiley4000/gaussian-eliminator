import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { linearsystems } from 'pure-linear-algebra';
import './Home.css';
import LinearSystemEditorContainer from './LinearSystemEditorContainer';

function actionMessage (action) {
  switch (action.type) {
    case linearsystems.systemstore.actions.SWAP_ROWS:
      return `Swap rows ${action.rowIndexA} and ${action.rowIndexB}`;
    case linearsystems.systemstore.actions.SCALAR_MULTIPLY_ROW:
      return `Muliply row ${action.rowIndex} by ${action.scalar}`;
    case linearsystems.systemstore.actions.ADD_ROW_MULTIPLE_TO_ANOTHER:
      return (
        `Add row ${action.srcRowIndex} multiplied by ${action.scalar} ` +
        `to row ${action.destRowIndex}`
      );
    default:
      return null;
  }
}

class Home extends Component {
  static propTypes = {
    lastActionForSystem: PropTypes.shape({
      type: PropTypes.oneOf(
        Object.keys(linearsystems.systemstore.actions)
          .map(k => linearsystems.systemstore.actions[k])
          .filter(action => typeof action === 'string')
      )
    })
  };

  render () {
    const { lastActionForSystem } = this.props;
    return (
      <div className="Eliminator">
        <div className="Eliminator-header">
          <h1>The Gaussian Eliminator</h1>
        </div>
        <div className="Eliminator-body container">
          <div className="row justify-content-center">
            <h4 className="col-12 prompt">
              {lastActionForSystem
                && actionMessage(lastActionForSystem)
                || 'Enter a linear system to solve'}
            </h4>
            <LinearSystemEditorContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
