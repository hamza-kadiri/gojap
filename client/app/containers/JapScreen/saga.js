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
import { changeTableId } from 'containers/User/actions';
import history from 'utils/history';
import {
  GET_JAP,
  GET_JAP_SUCCESS,
  REDIRECT_TO_ORDER_SCREEN,
} from './constants';
import { getJapSuccess, getJapError, changeJapMembers } from './actions';

function connect(userId, japId) {
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
  return eventChannel(dispatch => {
    const userJoinedJap = data => {
      console.log('joinedJap');
      console.log(data);
      dispatch(changeJapMembers(data));
    };
    const userJoinedTable = data => {
      console.log('joinedTable');
      console.log(data);
      dispatch(changeTableId(data.table_id));
    };
    const redirectUser = data => {
      console.log(history.location.pathname.split('/order'));
      if (history.location.pathname.split('/order').length == 1) {
        history.push(`/order/${data.table_id}`);
      }
    };
    socket.on(MESSAGES.USER_JOINED_JAP, userJoinedJap);
    socket.on(MESSAGES.USER_JOINED_TABLE, userJoinedTable);
    socket.on(MESSAGES.COMMAND_STARTED, redirectUser);
    return () => {};
  });
}

export function* getJap({ japId }) {
  const requestURL = `jap_event/event/${japId}`;

  try {
    // Call our request helper (see 'utils/request')
    const jap = yield call(request, api, requestURL);
    yield put(getJapSuccess(jap));
  } catch (err) {
    yield put(getJapError(err));
  }
}

export function* joinJapTableOnTableSuccess(socket) {
  while (true) {
    const { payload } = yield take(JOIN_TABLE_SUCCESS);
    const userId = yield select(makeSelectUserId());
    const japId = yield select(makeSelectJapId());
    const tableId = yield select(makeSelectTableId());
    socket.emit(MESSAGES.JOIN_TABLE, {
      user_id: userId,
      jap_event_id: japId,
      table_id: tableId,
    });
  }
}

export function* joinJapEvent(socket) {
  while (true) {
    const { payload } = yield take(GET_JAP_SUCCESS);
    const userId = yield select(makeSelectUserId());
    const japId = yield select(makeSelectJapId());
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
  const userId = yield select(makeSelectUserId());
  const japId = yield select(makeSelectJapId());
  const socket = yield call(connect, userId, japId);
  yield fork(read, socket);
  yield fork(joinJapEvent, socket);
  yield fork(joinJapTableOnTableSuccess, socket);
  yield fork(startCommand, socket);
}

/**
 * Root saga manages watcher lifecycle
 */

export default function* watchJapScreen() {
  yield takeLatest(GET_JAP, getJap);
  yield takeLatest(GET_JAP, japEventFlow);
}
