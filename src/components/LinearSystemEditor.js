import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { linearsystems } from 'pure-linear-algebra';
import classNames from 'classnames';
import LinearEquationEditorContainer from './LinearEquationEditorContainer';

function getRange (min, max) {
  const range = Array(max - min + 1);
  for (let n = min; n <= max; n++) {
    range[n - min] = <option key={n} value={n}>{n}</option>;
  }
  return range;
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

const equationCountMin = 2;
const equationCountMax = 100;
const variableCountMin = 2;
const variableCountMax = 100;

const equationCountRange = getRange(equationCountMin, equationCountMax);
const variableCountRange = getRange(variableCountMin, variableCountMax);

class LinearSystemEditor extends Component {
  static propTypes = {
    equationCount: PropTypes.number.isRequired,
    variableCount: PropTypes.number.isRequired,
    primarySystemIsValid: PropTypes.bool.isRequired,
    system: PropTypes.instanceOf(linearsystems.LinearSystem).isRequired,
    solution: PropTypes.shape({
      solutionType: PropTypes.oneOf(['single', 'infinite', 'none']).isRequired,
      solution: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number.isRequired),
        PropTypes.instanceOf(linearsystems.Parameterization)
      ])
    }),
    hasPast: PropTypes.bool.isRequired,
    hasFuture: PropTypes.bool.isRequired,
    onEquationCountChange: PropTypes.func.isRequired,
    onVariableCountChange: PropTypes.func.isRequired,
    onGoBack: PropTypes.func.isRequired,
    onGoForward: PropTypes.func.isRequired,
    onRequestSolution: PropTypes.func.isRequired
  };

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

  getSolutionString () {
    const { solution } = this.props;
    if (!solution) {
      return '';
    }
    switch (solution.solutionType) {
      case 'none':
        return 'There is no solution to this system.';
      case 'infinite':
        return solution.solution.toString();
      case 'single':
        return solution.solution.map((c, i) =>
          `${dimensionIndexToSymbol(i, solution.solution.length)} = ${c}`
        ).join('\n');
    }
  }

  render () {
    const {
      equationCount,
      variableCount,
      primarySystemIsValid,
      system,
      solution,
      hasPast,
      hasFuture,
      onGoBack,
      onGoForward,
      onRequestSolution
    } = this.props;
    console.log(this.getSolutionString())
    return (
      <div className="row justify-content-center linear-system-container">
        <div className="col-12 size-selection">
          <div className="row justify-content-center">
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
            <LinearEquationEditorContainer
              key={i}
              rowIndex={i}
              equation={equation}
            />
          )}
        </div>
        {!primarySystemIsValid &&
          <div className="col-12 invalid-notice">
            <span>
              Enter a valid system of non-zero equations to begin solving.
            </span>
          </div>}
        {primarySystemIsValid &&
          <div className="col-12 solver-nav">
            <div className="row justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!hasPast}
                onClick={onGoBack}
              >
                Back
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!hasFuture}
                onClick={onGoForward}
              >
                Forward
              </button>
              <button
                type="button"
                className={classNames('btn', {
                  'btn-primary': !solution,
                  'btn-success': solution
                })}
                disabled={solution}
                onClick={onRequestSolution}
              >
                Solve
              </button>
            </div>
          </div>}
        {solution &&
          <div className="col-12 solution">
            <span>{this.getSolutionString()}</span>
          </div>}
      </div>
    );
  }
}

export default LinearSystemEditor;
