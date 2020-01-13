import { take, call, put, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import { START_ORDER, MESSAGES } from './constants';
import { changedCurrentItem } from './actions';

function connect() {
  const socket = io(process.env.SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
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
    socket.emit(MESSAGES.NEXT_ITEM, {
      pseudo: 'smokoco',
      jap_id: 'oki',
      table_id: 'smoko_table',
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
export default function* OrderScreenSaga() {
  yield take(START_ORDER);
  const socket = yield call(connect);
  yield fork(read, socket);
  yield fork(write, socket);
}
