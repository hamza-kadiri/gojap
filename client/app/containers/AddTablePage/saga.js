import { takeLatest, call, put, select } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { makeSelectUserId, makeSelectJapId } from 'containers/User/selectors';
import history from 'utils/history';
import { ADD_TABLE } from './constants';
import { addTableError } from './actions';

export function* addTable() {
  const requestURL = `table`;
  const userId = yield select(makeSelectUserId());
  const japEventId = yield select(makeSelectJapId());

  const body = { user_id: userId, jap_event_id: japEventId };

  try {
    yield call(request, api.post, requestURL, { json: body });
    history.goBack();
  } catch (err) {
    yield put(addTableError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* addTableSaga() {
  yield takeLatest(ADD_TABLE, addTable);
}
