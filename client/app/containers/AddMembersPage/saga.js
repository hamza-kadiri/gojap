import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { LOAD_USERS, ADD_MEMBERS_TO_JAP } from './constants';
import { loadUsersSuccess, loadUsersError } from './actions';

/**
 * Japs request/response handler
 */
export function* loadUsers() {
  const requestURL = 'user/all';

  try {
    // Call our request helper (see 'utils/request')
    const users = yield call(request, api, requestURL);
    yield put(loadUsersSuccess(users));
  } catch (err) {
    yield put(loadUsersError(err));
  }
}

export function* addMembersToJap(action) {
  const { members, japEventId } = action.payload;
  const requestURL = `jap_event/add_members/${japEventId}`;

  const newMembers = [];
  members.forEach(member => {
    newMembers.push(member.id);
  });

  const body = { members: newMembers };

  try {
    yield call(request, api.post, requestURL, { json: body });
  } catch (err) {
    yield put(loadUsersError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* japsData() {
  yield takeLatest(LOAD_USERS, loadUsers);
  yield takeLatest(ADD_MEMBERS_TO_JAP, addMembersToJap);
}
