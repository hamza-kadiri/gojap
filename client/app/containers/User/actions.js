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
} from './constants';

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSucess(user) {
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
