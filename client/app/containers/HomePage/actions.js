/*
 * Homepage Actions
 *
 */

import {
  LOAD_JAPS,
  LOAD_JAPS_SUCCESS,
  LOAD_JAPS_ERROR,
  LOAD_PAST_JAPS,
  LOAD_PAST_JAPS_SUCCESS,
  LOAD_PAST_JAPS_ERROR,
} from './constants';

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

export function loadPastJaps() {
  return {
    type: LOAD_PAST_JAPS,
  };
}

export function pastJapsLoaded(pastJaps) {
  return {
    type: LOAD_PAST_JAPS_SUCCESS,
    pastJaps,
  };
}

export function pastJapsLoadingError(error) {
  return {
    type: LOAD_PAST_JAPS_ERROR,
    error,
  };
}
