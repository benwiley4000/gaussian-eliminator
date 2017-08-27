import { createSelector } from 'reselect';
import { linearsystems } from 'pure-linear-algebra';
import { getSystemState } from './base';
import { getPrimarySystemIsValid } from './primarySystem';

export const getSystem = createSelector(
  [getSystemState],
  systemState => systemState.present
);

export const getSolution = createSelector(
  [getPrimarySystemIsValid, getSystem],
  (primarySystemIsValid, system) => (
    primarySystemIsValid && linearsystems.systemIsInRref(system)
      ? linearsystems.solveRrefByGaussianElimination(system)
      : null
  )
);

export const getHasPast = createSelector(
  [getSystemState],
  systemState => Boolean(systemState.past.length)
);

export const getHasFuture = createSelector(
  [getSystemState],
  systemState => Boolean(systemState.future.length)
);
