import { createSelector } from 'reselect';
import { linearsystems, linearequations } from 'pure-linear-algebra';
import { getPrimarySystemState } from './base';

export const getPrimarySystem = createSelector(
  [getPrimarySystemState],
  primarySystemState => primarySystemState.system
);

export const getPrimarySystemIsValid = createSelector(
  [getPrimarySystem],
  primarySystem => {
    try {
      const system = new linearsystems.LinearSystem(
        primarySystem.equations.map(({ coefficients, constant }) =>
          new linearequations.Hyperplane(coefficients, constant)
        )
      );
    } catch (e) {
      return false;
    }
    return true;
  }
);

export const getEquationCount = createSelector(
  [getPrimarySystemState],
  primarySystemState => primarySystemState.equationCount
);

export const getVariableCount = createSelector(
  [getPrimarySystemState],
  primarySystemState => primarySystemState.variableCount
);
