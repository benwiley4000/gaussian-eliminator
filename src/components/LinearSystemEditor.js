import React, { Component } from 'react';
import LinearEquationEditorContainer from './LinearEquationEditorContainer';

function getRange (min, max) {
  const range = Array(max - min + 1);
  for (let n = min; n <= max; n++) {
    range[n - min] = <option key={n} value={n}>{n}</option>;
  }
  return range;
}

const equationCountMin = 2;
const equationCountMax = 100;
const variableCountMin = 2;
const variableCountMax = 100;

const equationCountRange = getRange(equationCountMin, equationCountMax);
const variableCountRange = getRange(variableCountMin, variableCountMax);

class LinearSystemEditor extends Component {
  constructor (props) {
    super(props);
    this.handleEquationCountChange = this.handleEquationCountChange.bind(this);
    this.handleVariableCountChange = this.handleVariableCountChange.bind(this);
  }

  handleEquationCountChange (e) {
    this.props.onEquationCountChange(Number(e.target.value));
  }

  handleVariableCountChange (e) {
    this.props.onVariableCountChange(Number(e.target.value));
  }

  render () {
    const { equationCount, variableCount, system } = this.props;
    return (
      <div className="row justify-content-center linear-system-container">
        <div className="col-12 size-selection">
          <div className="row justify-content-around">
            <label>
              Equations{' '}
              <select
                className="custom-select"
                value={equationCount}
                onChange={this.handleEquationCountChange}
              >
                {equationCountRange}
              </select>
            </label>
            <label>
              Variables{' '}
              <select
                className="custom-select"
                value={variableCount}
                onChange={this.handleVariableCountChange}
              >
                {variableCountRange}
              </select>
            </label>
          </div>
        </div>
        <div className="linear-system">
          {system.equations.map((equation, i) =>
            <LinearEquationEditorContainer key={i} rowIndex={i} equation={equation} />
          )}
        </div>
      </div>
    );
  }
}

export default LinearSystemEditor;
