import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { LOAD_JAPS } from './constants';
import { japsLoaded, japLoadingError } from './actions';

/**
 * Japs request/response handler
 */
export function* getJaps() {
  // Select username from store

  const requestURL = 'jap_event/all';

  try {
    // Call our request helper (see 'utils/request')
    const japs = yield call(request, api, requestURL);
    yield put(japsLoaded(japs));
  } catch (err) {
    yield put(japLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* japsData() {
  // Watches for LOAD_JAPS actions and calls getJapswhen one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_JAPS, getJaps);
}
