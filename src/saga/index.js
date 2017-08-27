import { all } from 'redux-saga/effects';
import primarySystem from './primarySystem';

export default function* rootSaga () {
  yield all([
    primarySystem()
  ]);
};
