import { takeLatest, call, put, select } from 'redux-saga/effects';
import { makeSelectUserId } from 'containers/User/selectors';
import request, { api } from 'utils/request';
import { GET_STATS } from './constants';
import { getStatsSuccess, getStatsError } from './actions';

export function* getStats() {
  const userId = yield select(makeSelectUserId());
  const requestURL = `user/stats/${userId}`;

  try {
    const japPlaces = yield call(request, api, requestURL);
    yield put(getStatsSuccess(japPlaces));
  } catch (err) {
    yield put(getStatsError(err));
  }
}

// Individual exports for testing
export default function* getStatsSaga() {
  yield takeLatest(GET_STATS, getStats);
}
