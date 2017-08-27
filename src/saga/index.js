import { all } from 'redux-saga/effects';
import primarySystem from './primarySystem';
import system from './system';

export default function* rootSaga () {
  yield all([
    primarySystem(),
    system()
  ]);
};
