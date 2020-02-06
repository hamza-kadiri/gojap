import { take, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  makeSelectJapId,
  makeSelectUsername,
  makeSelectUserId,
  makeSelectTableId,
  makeSelectIsEmperor,
} from 'containers/User/selectors';
import MESSAGES from 'utils/socketMessages';
import request, { api } from 'utils/request';

import { makeSelectCurrentCommandId } from './selectors';
import { START_ORDER } from './constants';
import {
  changedCurrentItem,
  joinedTable,
  changedOrderQuantity,
  initializeOrderQuantity,
} from './actions';

function connect(username, userId, japId, tableId) {
  const socket = io(process.env.SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit(MESSAGES.JOIN_JAP, {
        username,
        user_id: userId,
        jap_event_id: japId,
        table_id: tableId,
        is_jap_master: true,
      });
      socket.emit(MESSAGES.JOIN_TABLE, {
        username,
        user_id: userId,
        jap_event_id: japId,
        table_id: tableId,
        is_jap_master: true,
      });
      socket.emit(MESSAGES.JOIN_COMMAND, {
        username,
        user_id: userId,
        jap_event_id: japId,
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
    const isEmperor = yield select(makeSelectIsEmperor());
    const username = yield select(makeSelectUsername());
    const userId = yield select(makeSelectUserId());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    const commandId = yield select(makeSelectCurrentCommandId());
    if (isEmperor) {
      socket.emit(MESSAGES.NEXT_ITEM, {
        username,
        user_id: userId,
        isEmperor,
        command_id: commandId,
        jap_id: japId,
        table_id: tableId,
        is_jap_master: true,
        index: payload,
      });
    }
  }
}

export function* writeChangeQuantity(socket) {
  while (true) {
    const { itemId, index, individual, accumulated } = yield take(
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
      table_id: tableId,
      item_id: itemId,
      index,
      individual,
      accumulated,
    });
  }
}

export function* subscribe(socket) {
  const userId = yield select(makeSelectUserId());
  return eventChannel(emit => {
    const updateItem = data => {
      emit(changedCurrentItem(data));
      emit(changedOrderQuantity(data, userId));
    };
    const updateOrderQuantity = data => {
      emit(changedOrderQuantity(data, userId));
    };
    const userJoinedTable = data => {
      emit(joinedTable(data));
      emit(changedOrderQuantity(data, userId));
    };
    socket.on(MESSAGES.ITEM_CHANGED, updateItem);
    socket.on(MESSAGES.COMMAND_STARTED, data => userJoinedTable(data));
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

  const requestUrl = `command/table/${tableId}`;
  const response = yield call(request, api, requestUrl);
  if (response && response.command) {
    const summary = {};
    response.command.forEach(comm => {
      summary[comm.item_id] = {};
      summary[comm.item_id].itemId = comm.item_id;
      summary[comm.item_id].accumulated = 0;
      comm.users.forEach(user => {
        summary[comm.item_id].accumulated += user.order_amount;
        summary[comm.item_id].individual =
          user.user && user.user.id === userId ? user.order_amount : 0;
      });
    });
    yield put(initializeOrderQuantity(summary));
  }
}

export default function* watchOrderScreen() {
  yield takeLatest(START_ORDER, OrderScreenSaga);
}
