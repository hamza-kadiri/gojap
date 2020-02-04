/*
 *
 * JoinTable actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_TABLES,
  GET_TABLES_SUCCESS,
  GET_TABLES_ERROR,
  JOIN_TABLE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getTables() {
  return {
    type: GET_TABLES,
  };
}

export function getTablesSuccess(tables) {
  return {
    type: GET_TABLES_SUCCESS,
    tables,
  };
}

export function getTablesError(err) {
  return {
    type: GET_TABLES_ERROR,
    err,
  };
}

export function joinTable(tableId) {
  return {
    type: JOIN_TABLE,
    tableId,
  };
}
