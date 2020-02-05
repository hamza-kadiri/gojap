/*
 *
 * AddMembersPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_USERS,
  ADD_MEMBERS_TO_JAP,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  ADD_MEMBERS_TO_JAP_SUCCESS,
  ADD_MEMBERS_TO_JAP_ERROR,
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

export function addMembersToJap(members, japEventId) {
  return {
    type: ADD_MEMBERS_TO_JAP,
    payload: {
      members,
      japEventId,
    },
  };
}

export function addMembersToJapSuccess(members) {
  return {
    type: ADD_MEMBERS_TO_JAP_SUCCESS,
    members,
  };
}
export function addMembersToJapError(error) {
  return {
    type: ADD_MEMBERS_TO_JAP_ERROR,
    error,
  };
}
