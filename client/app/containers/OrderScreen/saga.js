import { take, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  makeSelectJapId,
  makeSelectUsername,
  makeSelectTableId,
} from 'containers/User/selectors';
import MESSAGES from 'utils/socketMessages';
import { START_ORDER } from './constants';
import { changedCurrentItem } from './actions';
import { changedOrderQuantity } from '../OrdersList/actions';

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

export function* writeNextItem(socket) {
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

export function* writeChangeQuantity(socket) {
  while (true) {
    const { itemId, individual, accumulated } = yield take(
      MESSAGES.CHOOSE_ITEM
    );
    const username = yield select(makeSelectUsername());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    socket.emit(MESSAGES.CHOOSE_ITEM, {
      pseudo: username,
      jap_id: japId,
      table_id: tableId,
      item_id: itemId,
      individual,
      accumulated,
    });
  }
}

export function* subscribe(socket) {
  return eventChannel(emit => {
    const updateItem = data => emit(changedCurrentItem(data.index));
    const updateOrderQuantity = data =>
      emit(
        changedOrderQuantity(data.itemId, data.individual, data.accumulated)
      );
    socket.on(MESSAGES.ITEM_CHANGED, updateItem);
    socket.on(MESSAGES.USER_JOINED_TABLE, data => console.log(data));
    socket.on(MESSAGES.ITEM_CHOSEN, updateOrderQuantity);
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
  yield fork(writeNextItem, socket);
  yield fork(writeChangeQuantity, socket);
}

export default function* watchOrderScreen() {
  yield takeLatest(START_ORDER, OrderScreenSaga);
}
