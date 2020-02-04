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
import { makeSelectJapId, makeSelectUserId } from 'containers/User/selectors';
import MESSAGES from 'utils/socketMessages';
import { JOIN_TABLE_SUCCESS } from 'containers/JoinTable/constants';
import { GET_JAP } from './constants';
import { getJapSuccess, getJapError, changeJapMembers } from './actions';

function connect(userId, japId) {
  const socket = io(process.env.SOCKET_URL);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit(MESSAGES.JOIN_JAP, {
        user_id: userId,
        jap_event_id: japId,
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

export function* subscribe(socket) {
  return eventChannel(dispatch => {
    const userJoinedJap = data => {
      console.log('joinedJap');
      dispatch(changeJapMembers(data));
      // emit(changedOrderQuantity(data, userId));
    };
    socket.on(MESSAGES.USER_JOINED_JAP, userJoinedJap);
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
    const tableId = 1;
    console.log('emitting');
    socket.emit(MESSAGES.JOIN_TABLE, {
      user_id: userId,
      jap_id: japId,
      table_id: tableId,
    });
  }
}

export function* joinJap() {}

export function* japEventFlow() {
  const userId = yield select(makeSelectUserId());
  const japId = yield select(makeSelectJapId());
  const socket = yield call(connect, userId, japId);
  const task = yield fork(read, socket);
  yield fork(joinJapTableOnTableSuccess, socket);
}

/**
 * Root saga manages watcher lifecycle
 */

export default function* watchJapScreen() {
  yield takeLatest(GET_JAP, getJap);
  yield takeLatest(GET_JAP, japEventFlow);
}
