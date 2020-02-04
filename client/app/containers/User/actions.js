/*
 *
 * User actions
 *
 */

import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  CHANGE_JAP_ID,
  CHANGE_TABLE_ID,
  LOGOUT,
} from './constants';

export function login(username) {
  return {
    type: LOGIN,
    payload: {
      username,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function changeJapId(id) {
  return {
    type: CHANGE_JAP_ID,
    id,
  };
}

export function changeTableId(id) {
  return {
    type: CHANGE_TABLE_ID,
    id,
  };
}
