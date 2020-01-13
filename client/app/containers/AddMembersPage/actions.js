/*
 *
 * AddMembersPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_USERS,
  ADD_MEMBER_TO_JAP,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadUsers() {
  return {
    type: LOAD_USERS,
  };
}

export function loadUsersSuccess(users) {
  return {
    type: LOAD_USERS_SUCCESS,
    payload: users,
  };
}

export function loadUsersError(error) {
  return {
    type: LOAD_USERS_ERROR,
    payload: error,
  };
}

export function addMemberToJap(memberId, japEventId) {
  return {
    type: ADD_MEMBER_TO_JAP,
    payload: {
      memberId,
      japEventId,
    },
  };
}
