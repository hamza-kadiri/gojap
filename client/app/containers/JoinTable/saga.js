import { takeLatest, call, put, select } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { makeSelectJapId, makeSelectUserId } from 'containers/User/selectors';

import { GET_TABLES, JOIN_TABLE } from './constants';
import {
  getTablesSuccess,
  getTablesError,
  joinTableError,
  joinTableSuccess,
} from './actions';

export function* getTables() {
  const japId = yield select(makeSelectJapId());
  const requestUrl = `jap_event/table/${japId}`;

  try {
    // Call our request helper (see 'utils/request')
    const tables = yield call(request, api, requestUrl);
    yield put(getTablesSuccess(tables));
  } catch (err) {
    yield put(getTablesError(err));
  }
}

export function* joinTable(action) {
  const { tableId } = action;
  const userId = yield select(makeSelectUserId());
  const requestUrl = `table/add_members/${tableId}`;

  const body = { user_ids: [userId] };

  try {
    const response = yield call(request, api.post, requestUrl, { json: body });
    yield put(joinTableSuccess(response));
  } catch (err) {
    yield put(joinTableError(err));
  }
}

// Individual exports for testing
export default function* membersListSaga() {
  yield takeLatest(GET_TABLES, getTables);
  yield takeLatest(JOIN_TABLE, joinTable);
}
