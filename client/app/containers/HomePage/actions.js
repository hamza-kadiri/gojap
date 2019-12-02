/*
 * Homepage Actions
 *
 */

import { LOAD_JAPS, LOAD_JAPS_SUCCESS, LOAD_JAPS_ERROR } from './constants';

export function loadJaps() {
  return {
    type: LOAD_JAPS,
  };
}

export function japsLoaded(japs) {
  return {
    type: LOAD_JAPS_SUCCESS,
    japs,
  };
}

export function japLoadingError(error) {
  return {
    type: LOAD_JAPS_ERROR,
    error,
  };
}
