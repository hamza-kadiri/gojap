import { take, takeEvery, call, put, fork, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  makeSelectJapId,
  makeSelectUsername,
  makeSelectTableId,
} from 'containers/User/selectors';
import { START_ORDER, MESSAGES } from './constants';
import { changedCurrentItem } from './actions';

function connect(username, japId, tableId) {
  const socket = io(process.env.SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit(MESSAGES.JOIN_TABLE, {
        pseudo: username,
        jap_id: japId,
        table_id: tableId,
        is_jap_master: true,
      });
      resolve(socket);
    });
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export function* write(socket) {
  while (true) {
    const { payload } = yield take(MESSAGES.NEXT_ITEM);
    const username = yield select(makeSelectUsername());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    socket.emit(MESSAGES.NEXT_ITEM, {
      pseudo: username,
      jap_id: japId,
      table_id: tableId,
      is_jap_master: true,
      item_id: 'pneu',
      index: payload,
    });
  }
}

export function* subscribe(socket) {
  return eventChannel(emit => {
    const update = data => emit(changedCurrentItem(data.index));
    socket.on(MESSAGES.ITEM_CHANGED, update);
    return () => {};
  });
}
// Individual exports for testing
export function* OrderScreenSaga() {
  const username = yield select(makeSelectUsername());
  const japId = yield select(makeSelectJapId());
  const tableId = yield select(makeSelectTableId());
  const socket = yield call(connect, username, japId, tableId);
  yield fork(read, socket);
  yield fork(write, socket);
}

export default function* watchOrderScreen() {
  yield takeEvery(START_ORDER, OrderScreenSaga);
}
