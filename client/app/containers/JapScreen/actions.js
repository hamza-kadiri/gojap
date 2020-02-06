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
  CHANGE_TABLE_MEMBERS,
  REDIRECT_TO_ORDER_SCREEN,
} from './constants';
import MESSAGES from '../../utils/socketMessages';

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
export function getJapSuccess({ jap_event, table }) {
  return {
    type: GET_JAP_SUCCESS,
    jap_event,
    table,
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

export function changeTableMembers(table) {
  return {
    type: CHANGE_TABLE_MEMBERS,
    payload: table,
  };
}

export function leaveJap() {
  return {
    type: MESSAGES.LEAVE_JAP,
  };
}

export function startCommand() {
  return { type: REDIRECT_TO_ORDER_SCREEN };
}
