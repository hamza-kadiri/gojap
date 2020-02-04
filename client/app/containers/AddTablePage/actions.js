/*
 *
 * AddTablePage actions
 *
 */

import { DEFAULT_ACTION, ADD_TABLE, ADD_TABLE_ERROR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function addTable() {
  return {
    type: ADD_TABLE,
  };
}

export function addTableError(err) {
  return {
    type: ADD_TABLE_ERROR,
    err,
  };
}
