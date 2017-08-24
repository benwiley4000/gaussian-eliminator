import { linearsystems, linearequations } from 'pure-linear-algebra';
import {
  EQUATION_COUNT_UPDATE,
  VARIABLE_COUNT_UPDATE,
  COEFFICIENT_UPDATE,
  CONSTANT_UPDATE
} from '../actions/primarySystem';

function zeroArray (size) {
  const array = Array(size);
  for (let i = 0; i < size; i++) {
    array[i] = 0;
  }
  return array;
}

const defaultState = {
  equationCount: 2,
  variableCount: 2,
  system: new linearsystems.LinearSystem([
    new linearequations.LinearEquation(zeroArray(2), 0),
    new linearequations.LinearEquation(zeroArray(2), 0)
  ])
};

function equation (state, action, equationIndex) {
  if (action.rowIndex !== equationIndex) {
    return state;
  }
  switch (action.type) {
    case COEFFICIENT_UPDATE:
      return new linearequations.LinearEquation(state.coefficients.map((c, i) =>
        action.dimensionIndex === i ? action.coefficient : c
      ), state.constant);
    case CONSTANT_UPDATE:
      return new linearequations.LinearEquation(
        state.coefficients,
        action.constant
      );
    default:
      return state;
  }
}

function primarySystem (state = defaultState, action) {
  switch (action.type) {
    case EQUATION_COUNT_UPDATE: {
      const newEquationCount = action.equationCount;
      const { equationCount, variableCount, system } = state;
      const difference = newEquationCount - equationCount;
      if (difference === 0) {
        return state;
      }
      return {
        ...state,
        equationCount: newEquationCount,
        system: new linearsystems.LinearSystem(
          difference < 0
            ? system.equations.slice(0, newEquationCount)
            : system.equations.concat(zeroArray(difference).map(() =>
              new linearequations.LinearEquation(zeroArray(variableCount), 0)
            ))
        )
      };
    }
    case VARIABLE_COUNT_UPDATE: {
      const newVariableCount = action.variableCount;
      const { variableCount, system } = state;
      const difference = newVariableCount - variableCount;
      if (difference === 0) {
        return state;
      }
      return {
        ...state,
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
      };
    }
    case COEFFICIENT_UPDATE:
    case CONSTANT_UPDATE:
      return {
        ...state,
        system: new linearsystems.LinearSystem(
          state.system.equations.map((eq, i) => equation(eq, action, i))
        )
      };
    default:
      return state;
  }
}

export default primarySystem;
