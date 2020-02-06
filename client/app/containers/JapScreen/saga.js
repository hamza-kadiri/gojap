import {
  takeLatest,
  call,
  put,
  select,
  take,
  fork,
  cancel,
} from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  makeSelectJapId,
  makeSelectUserId,
  makeSelectTableId,
} from 'containers/User/selectors';
import MESSAGES from 'utils/socketMessages';
import { JOIN_TABLE_SUCCESS } from 'containers/JoinTable/constants';
import {
  changeTableId,
  changeJapId,
  changeIsEmperor,
} from 'containers/User/actions';
import history from 'utils/history';
import {
  GET_JAP,
  GET_JAP_SUCCESS,
  REDIRECT_TO_ORDER_SCREEN,
} from './constants';
import {
  getJapSuccess,
  getJapError,
  changeJapMembers,
  changeTableMembers,
  getJap as refreshJap,
} from './actions';

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

export function* subscribe(socket) {
  const userId = yield select(makeSelectUserId());
  return eventChannel(emit => {
    const userJoinedJap = data => {
      emit(changeJapMembers(data));
    };
    const userJoinedTable = data => {
      emit(changeTableMembers(data));
      emit(changeTableId(data.table_id));
    };
    const redirectUser = data => {
      if (history.location.pathname.split('/order').length === 1) {
        history.push(`/order/${data.table_id}`);
      }
    };
    const userLeftJap = data => {
      if (data.user_id === userId) {
        history.push('/');
      }
    };
    socket.on(MESSAGES.USER_LEFT_JAP, userLeftJap);
    socket.on(MESSAGES.USER_JOINED_JAP, userJoinedJap);
    socket.on(MESSAGES.USER_JOINED_TABLE, userJoinedTable);
    socket.on(MESSAGES.COMMAND_STARTED, redirectUser);
    return () => {};
  });
}

export function* getJap({ japId }) {
  const userId = yield select(makeSelectUserId());
  const requestURL = `jap_event/table/${japId}/${userId}`;

  try {
    // Call our request helper (see 'utils/request')
    const jap = yield call(request, api, requestURL);
    yield put(getJapSuccess(jap));
    yield put(changeJapId(jap.jap_event.id));
    yield put(changeTableId(jap.table ? jap.table.id : null));
    yield put(changeIsEmperor(jap.table ? jap.table.is_emperor : false));
  } catch (err) {
    yield put(getJapError(err));
  }
}

export function* joinJapTableOnTableSuccess(socket) {
  while (true) {
    const { table } = yield take(JOIN_TABLE_SUCCESS);
    const tableId = table.id;
    const userId = yield select(makeSelectUserId());
    const japId = yield select(makeSelectJapId());
    socket.emit(MESSAGES.JOIN_TABLE, {
      user_id: userId,
      jap_event_id: japId,
      table_id: tableId,
    });
  }
}

export function* joinJapEventAndTable(socket) {
  while (true) {
    const { jap_event } = yield take(GET_JAP_SUCCESS);
    const japId = jap_event.id;
    const userId = yield select(makeSelectUserId());
    socket.emit(MESSAGES.JOIN_JAP, {
      user_id: userId,
      jap_event_id: japId,
    });
  }
}

export function* startCommand(socket) {
  while (true) {
    const { payload } = yield take(REDIRECT_TO_ORDER_SCREEN);
    const userId = yield select(makeSelectUserId());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    history.push(`/order/${tableId}`);
    socket.emit(MESSAGES.START_COMMAND, {
      user_id: userId,
      jap_event_id: japId,
      table_id: tableId,
    });
  }
}

export function* japEventFlow() {
  const socket = yield call(connect);

  yield fork(read, socket);
  yield fork(joinJapEventAndTable, socket);
  yield fork(joinJapTableOnTableSuccess, socket);
  yield fork(startCommand, socket);
  yield fork(leaveJap, socket);
}

export function* leaveJap(socket) {
  yield take(MESSAGES.LEAVE_JAP);

  const userId = yield select(makeSelectUserId());
  const tableId = yield select(makeSelectTableId());
  const japId = yield select(makeSelectJapId());
  socket.emit(MESSAGES.LEAVE_JAP, {
    user_id: userId,
    jap_event_id: japId,
    table_id: tableId,
  });
}

/**
 * Root saga manages watcher lifecycle
 */

export default function* watchJapScreen() {
  yield takeLatest(GET_JAP, getJap);
  yield takeLatest(GET_JAP, japEventFlow);
}
