/*
 *
 * ProfilePage actions
 *
 */

import { DEFAULT_ACTION, GET_USER_STATS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getUserStats() {
  return {
    type: GET_USER_STATS,
  };
}

export function getUserStatsSuccess(stats) {
  return {
    type: GET_USER_STATS,
  };
}

export function getUserStats() {
  return {
    type: GET_USER_STATS,
  };
}
