export const EQUATION_COUNT_UPDATE = '@@gauss/EQUATION_COUNT_UPDATE';
export const VARIABLE_COUNT_UPDATE = '@@gauss/VARIABLE_COUNT_UPDATE';
export const COEFFICIENT_UPDATE = '@@gauss/COEFFICIENT_UPDATE';
export const CONSTANT_UPDATE = '@@gauss/CONSTANT_UPDATE';

export const equationCountUpdate = equationCount => ({
  type: EQUATION_COUNT_UPDATE,
  equationCount
});

export const variableCountUpdate = variableCount => ({
  type: VARIABLE_COUNT_UPDATE,
  variableCount
});

export const coefficientUpdate = (rowIndex, dimensionIndex, coefficient) => ({
  type: COEFFICIENT_UPDATE,
  rowIndex,
  dimensionIndex,
  coefficient
});

export const constantUpdate = (rowIndex, constant) => ({
  type: CONSTANT_UPDATE,
  rowIndex,
  constant
});
