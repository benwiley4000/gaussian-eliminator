import { linearsystems, linearequations } from 'pure-linear-algebra';
import { all, takeEvery, select, call, put } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { ActionCreators as undoActions } from 'redux-undo';
import {
  EQUATION_COUNT_UPDATE,
  VARIABLE_COUNT_UPDATE,
  COEFFICIENT_UPDATE,
  CONSTANT_UPDATE,
  primarySystemUpdate,
} from '../actions/primarySystem';
import { getPrimarySystemState } from '../selectors/base';
import zeroArray from '../utils/zeroArray';

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

export function primarySystemReducer (state, action) {
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

function* primarySystem (action) {
  const primarySystemState = yield select(getPrimarySystemState);
  const newSystemState = yield call(
    primarySystemReducer,
    primarySystemState,
    action
  );
  yield put(batchActions([
    primarySystemUpdate(newSystemState),
    undoActions.clearHistory()
  ]));
}

export default function* () {
  yield all([
    takeEvery(EQUATION_COUNT_UPDATE, primarySystem),
    takeEvery(VARIABLE_COUNT_UPDATE, primarySystem),
    takeEvery(COEFFICIENT_UPDATE, primarySystem),
    takeEvery(CONSTANT_UPDATE, primarySystem)
  ]);
};
