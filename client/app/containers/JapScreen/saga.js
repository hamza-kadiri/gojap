import { take, call, put, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import { CHANGE_CURRENT_ITEM, MESSAGES } from './constants';
import { changeCurrentItem } from './actions';

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
  console.log(channel);
  while (true) {
    const action = yield take(channel);
    console.log('action', action);
    yield put(action);
  }
}

export function* write(socket) {
  while (true) {
    const { msg } = yield take(CHANGE_CURRENT_ITEM);
    console.log('saga title', msg);
    socket.emit(MESSAGES.NEXT_ITEM, {
      pseudo: 'smokoco',
      jap_id: 'oki',
      table_id: 'smoko_table',
      is_jap_master: true,
      item_id: 'pneu',
    });
  }
}

export function* subscribe(socket) {
  return eventChannel(emit => {
    const update = todos => {
      console.log('listened data', todos);
      return emit(changeCurrentItem(todos));
    };
    console.log('socket listening on item changed');
    socket.on(MESSAGES.ITEM_CHANGED, update);
    return () => {};
  });
}
// Individual exports for testing
export default function* japScreenSaga() {
  yield take(CHANGE_CURRENT_ITEM);
  const socket = yield call(connect);
  yield fork(read, socket);
  yield fork(write, socket);
}
