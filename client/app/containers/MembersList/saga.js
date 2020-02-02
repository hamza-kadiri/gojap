import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { LOAD_MEMBERS } from './constants';
import { membersLoaded, membersLoadingError } from './actions';

export function* getMembers() {
  const requestUrl = 'user/all';

  try {
    // Call our request helper (see 'utils/request')
    const members = yield call(request, api, requestUrl, {});
    yield put(membersLoaded(members));
  } catch (err) {
    yield put(membersLoadingError(err));
  }
}

// Individual exports for testing
export default function* membersListSaga() {
  yield takeLatest(LOAD_MEMBERS, getMembers);
}
