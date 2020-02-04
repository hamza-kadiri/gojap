/*
 *
 * LoginContainer actions
 *
 */

import { DEFAULT_ACTION, LOGIN, LOGIN_ERROR, LOGIN_SUCCESS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function login(username) {
  return {
    type: LOGIN,
    payload: {
      username,
    },
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function LoginError(err) {
  return {
    type: LOGIN_ERROR,
    err,
  };
}
