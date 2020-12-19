import { takeEvery, put, select } from 'redux-saga/effects';
import { delay } from '../utils/utils';
import { createBlockArray } from '../utils/utils';
import {
  RUN_TIMER_SAGA,
  SET_BLOCK_NUMBER,
  SET_BLOCK_ARRAY
 } from '../types';

//This function recursively calls itself with a 5 second delay.
function* runTimerSaga() {
  console.log('start')
  const web3 = yield select(state => state.web3);
  yield delay(5000);

  const blockNumber = yield web3.eth.getBlockNumber();
  yield put({ type: SET_BLOCK_NUMBER, payload: blockNumber });

  const blockArray = createBlockArray(blockNumber);
  yield put({ type: SET_BLOCK_ARRAY, payload: blockArray });
  console.log('finish')

  let isPaused = yield select(state => state.isPaused);
  if(isPaused) return;

  yield put({ type: RUN_TIMER_SAGA });
};

export function* watchRunTimerSaga() {
  yield takeEvery(RUN_TIMER_SAGA, runTimerSaga);
};