// import { take, call, put, select } from 'redux-saga/effects';
import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { makeSelectJapId } from 'containers/User/selectors';

import { GET_JAP } from './constants';
import { getJapSuccess, getJapError } from './actions';

export function* getJap() {
  // Select username from store
  const id = makeSelectJapId();
  const requestURL = `jap_event/event/${id}`;

  try {
    // Call our request helper (see 'utils/request')
    const jap = yield call(request, api, requestURL);
    yield put(getJapSuccess(jap));
  } catch (err) {
    yield put(getJapError(err));
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
  yield takeLatest(GET_JAP, getJap);
}
