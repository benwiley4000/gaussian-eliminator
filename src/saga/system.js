import { linearsystems } from 'pure-linear-algebra';
import { takeEvery, select, call, put } from 'redux-saga/effects';
import { batchActions } from 'redux-batched-actions';
import { SOLVE_SYSTEM } from '../actions/system';
import { getSystem } from '../selectors/system';

function* system (action) {
  const system = yield select(getSystem);
  const { actions } = yield call(
    linearsystems.solveByGaussianElimination,
    system
  );
  yield put(batchActions(actions));
}

export default function* () {
  yield takeEvery(SOLVE_SYSTEM, system);
};
