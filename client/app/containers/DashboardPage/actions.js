/*
 *
 * DashboardPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_STATS,
  GET_STATS_ERROR,
  GET_STATS_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getStats() {
  return {
    type: GET_STATS,
  };
}

export function getStatsError(err) {
  return {
    type: GET_STATS_ERROR,
    err,
  };
}

export function getStatsSuccess(stats) {
  return {
    type: GET_STATS_SUCCESS,
    stats,
  };
}
