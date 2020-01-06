/*
 *
 * NewJapPage actions
 *
 */

import {
  POST_JAP_EVENT_REQUEST,
  POST_JAP_EVENT_SUCCESS,
  POST_JAP_EVENT_ERROR,
} from './constants';

export function postJapEventRequest(japinfos) {
  return {
    type: POST_JAP_EVENT_REQUEST,
    payload: japinfos,
  };
}

export function postJapEventSuccess() {
  return {
    type: POST_JAP_EVENT_SUCCESS,
  };
}

export function postJapEventError(error) {
  return {
    type: POST_JAP_EVENT_ERROR,
    payload: error,
  };
}
