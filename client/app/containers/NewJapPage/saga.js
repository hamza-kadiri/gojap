import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { POST_JAP_EVENT_REQUEST } from './constants';
import { postJapEventSuccess, postJapEventError } from './actions';
// Individual exports for testing

export function* postJapEvent() {
  const requestURL = 'japs';

  try {
    // call the right path with data to create a dev event
    yield call(request, requestURL);
    yield put(postJapEventSuccess());
  } catch (err) {
    yield put(postJapEventError(err));
  }
}

export default function* newJapPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(POST_JAP_EVENT_REQUEST, postJapEvent);
}
