import React, { Component } from 'react';
import LinearEquationEditor from './LinearEquationEditor';
import { linearsystems, linearequations } from 'pure-linear-algebra';

function getRange (min, max) {
  const range = Array(max - min + 1);
  for (let n = min; n <= max; n++) {
    range[n - min] = <option key={n} value={n}>{n}</option>;
  }
  return range;
}

function zeroArray (size) {
  const array = Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = 0;
  }
  return array;
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

    this.state = {
      equationCount: equationCountMin,
      variableCount: variableCountMin,
      system: new linearsystems.LinearSystem([
        new linearequations.LinearEquation(zeroArray(2), 0),
        new linearequations.LinearEquation(zeroArray(2), 0)
      ])
    };

    this.handleEquationCountChange = this.handleEquationCountChange.bind(this);
    this.handleVariableCountChange = this.handleVariableCountChange.bind(this);
    this.handleEquationUpdate = this.handleEquationUpdate.bind(this);
  }

  handleEquationCountChange (e) {
    const newEquationCount = Number(e.target.value);
    const { equationCount, variableCount, system } = this.state;
    const difference = newEquationCount - equationCount;
    if (difference === 0) {
      return;
    }
    this.setState({
      equationCount: newEquationCount,
      system: new linearsystems.LinearSystem(
        difference < 0
          ? system.equations.slice(0, newEquationCount)
          : system.equations.concat(zeroArray(difference).map(() =>
            new linearequations.LinearEquation(zeroArray(variableCount), 0)
          ))
      )
    });
  }

  handleVariableCountChange (e) {
    const newVariableCount = Number(e.target.value);
    const { variableCount, system } = this.state;
    const difference = newVariableCount - variableCount;
    if (difference === 0) {
      return;
    }
    this.setState({
      variableCount: newVariableCount,
      system: new linearsystems.LinearSystem(
        system.equations.map(({ coefficients, constant }) =>
          new linearequations.LinearEquation(
            difference < 0
              ? coefficients.slice(0, newVariableCount)
              : coefficients.concat(zeroArray(difference)),
            constant
          )
        )
      )
    });
  }

  handleEquationUpdate (rowIndex, equation) {
    const newEquations = this.state.system.equations.slice();
    newEquations[rowIndex] = equation;
    this.setState({
      system: new linearsystems.LinearSystem(newEquations)
    });
  }

  render () {
    return (
      <div className="row justify-content-center linear-system-container">
        <div className="col-12 size-selection">
          <div className="row justify-content-around">
            <label>
              Equations{' '}
              <select
                className="custom-select"
                onChange={this.handleEquationCountChange}
              >
                {equationCountRange}
              </select>
            </label>
            <label>
              Variables{' '}
              <select
                className="custom-select"
                onChange={this.handleVariableCountChange}
              >
                {variableCountRange}
              </select>
            </label>
          </div>
        </div>
        <div className="linear-system">
          {this.state.system.equations.map((equation, i) =>
            <LinearEquationEditor
              key={i}
              rowIndex={i}
              equation={equation}
              onUpdate={this.handleEquationUpdate}
            />
          )}
        </div>
      </div>
    );
  }
}

export default LinearSystemEditor;
