import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';

import history from 'utils/history';
import { loginSuccess, loginError } from './actions';
import { LOGIN } from './constants';
/**
 * Log in response handler
 */
export function* login(action) {
  // Select username from store
  const { username } = action.payload;
  const requestURL = 'auth/login';
  const body = { username };

  try {
    const user = yield call(request, api.post, requestURL, { json: body });
    yield put(loginSuccess(user));
    history.push('/');
  } catch (err) {
    yield put(loginError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchSaga() {
  yield takeLatest(LOGIN, login);
}
