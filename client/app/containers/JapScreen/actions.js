/*
 *
 * JapScreen actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_JAP,
  GET_JAP_SUCCESS,
  GET_JAP_ERROR,
  CHANGE_JAP_MEMBERS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getJap(japId) {
  return {
    type: GET_JAP,
    japId,
  };
}
export function getJapSuccess(jap) {
  return {
    type: GET_JAP_SUCCESS,
    jap,
  };
}
export function getJapError(error) {
  return {
    type: GET_JAP_ERROR,
    error,
  };
}

export function changeJapMembers(jap) {
  return {
    type: CHANGE_JAP_MEMBERS,
    payload: jap,
  };
}
