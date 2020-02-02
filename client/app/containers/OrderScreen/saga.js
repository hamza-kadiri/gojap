import { take, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  makeSelectJapId,
  makeSelectUsername,
  makeSelectUserId,
  makeSelectTableId,
} from 'containers/User/selectors';
import MESSAGES from 'utils/socketMessages';
import { makeSelectCurrentCommandId } from './selectors';
import { START_ORDER } from './constants';
import { changedCurrentItem } from './actions';
import { changedOrderQuantity } from '../OrdersList/actions';

function connect(username, userId, japId, tableId) {
  const socket = io(process.env.SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit(MESSAGES.JOIN_TABLE, {
        username,
        user_id: userId,
        jap_id: japId,
        table_id: 1,
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

export function* writeNextItem(socket) {
  while (true) {
    const { payload } = yield take(MESSAGES.NEXT_ITEM);
    const username = yield select(makeSelectUsername());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    socket.emit(MESSAGES.NEXT_ITEM, {
      username,
      jap_id: japId,
      table_id: 1,
      is_jap_master: true,
      item_id: payload,
    });
  }
}

export function* writeChangeQuantity(socket) {
  while (true) {
    const { itemId, individual, accumulated } = yield take(
      MESSAGES.CHOOSE_ITEM
    );
    const username = yield select(makeSelectUsername());
    const userId = yield select(makeSelectUserId());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    const commandId = yield select(makeSelectCurrentCommandId());
    socket.emit(MESSAGES.CHOOSE_ITEM, {
      username,
      user_id: userId,
      jap_id: japId,
      command_id: commandId,
      table_id: 1,
      item_id: itemId,
      individual,
      accumulated,
    });
  }
}

export function* subscribe(socket) {
  return eventChannel(emit => {
    const updateItem = data => emit(changedCurrentItem(data));
    const updateOrderQuantity = data => {
      console.log(data);
      emit(
        changedOrderQuantity(data.item_id, data.individual, data.accumulated)
      );
    };
    socket.on(MESSAGES.ITEM_CHANGED, updateItem);
    socket.on(MESSAGES.USER_JOINED_TABLE, data => console.log(data));
    socket.on(MESSAGES.ITEM_CHOSEN, updateOrderQuantity);
    return () => {};
  });
}
// Individual exports for testing
export function* OrderScreenSaga() {
  const username = yield select(makeSelectUsername());
  const userId = yield select(makeSelectUserId());
  const japId = yield select(makeSelectJapId());
  const tableId = yield select(makeSelectTableId());
  const socket = yield call(connect, username, userId, japId, tableId);
  yield fork(read, socket);
  yield fork(writeNextItem, socket);
  yield fork(writeChangeQuantity, socket);
}

export default function* watchOrderScreen() {
  yield takeLatest(START_ORDER, OrderScreenSaga);
}
