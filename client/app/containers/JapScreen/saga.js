import { take, call, put, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  START_ORDER,
  CHANGE_CURRENT_ITEM_SUCCESS,
  MESSAGES,
} from './constants';
import { changedCurrentItem } from './actions';

function connect() {
  const socket = io(process.env.SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
      console.log('Socket connected');
    });
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  console.log('channel', channel);
  while (true) {
    const action = yield take(channel);
    console.log('action', action);
    yield put(action);
  }
}

export function* write(socket) {
  while (true) {
    const { payload } = yield take(MESSAGES.NEXT_ITEM);
    console.log('saga title', payload);
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
    const update = todos => {
      console.log('listened data', todos);
      return emit(changedCurrentItem(todos.index));
    };
    console.log('socket listening on item changed');
    socket.on(MESSAGES.ITEM_CHANGED, update);
    return () => {};
  });
}
// Individual exports for testing
export default function* japScreenSaga() {
  yield take(START_ORDER);
  const socket = yield call(connect);
  yield fork(read, socket);
  yield fork(write, socket);
}
