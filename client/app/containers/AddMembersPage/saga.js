import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { LOAD_USERS } from './constants';
import { loadUsersSuccess, loadUsersError } from './actions';

/**
 * Japs request/response handler
 */
export function* loadUsers() {
  const requestURL = 'user/all';

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, api, requestURL);
    yield put(loadUsersSuccess(users));
  } catch (err) {
    yield put(loadUsersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* japsData() {
  yield takeLatest(LOAD_USERS, loadUsers);
}