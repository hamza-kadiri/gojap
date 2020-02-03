/*
 *
 * NewJapPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CREATE_JAP_EVENT,
  GET_JAP_PLACES,
  GET_JAP_PLACES_SUCCESS,
  GET_JAP_PLACES_ERROR,
  CREATE_JAP_EVENT_SUCCESS,
  CREATE_JAP_EVENT_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function getJapPlaces() {
  return {
    type: GET_JAP_PLACES,
  };
}
export function getJapPlacesSuccess(japPlaces) {
  return {
    type: GET_JAP_PLACES_SUCCESS,
    japPlaces,
  };
}
export function getJapPlacesError(err) {
  return {
    type: GET_JAP_PLACES_ERROR,
    err,
  };
}
export function createJapEvent(name, description, date, japPlace) {
  return {
    type: CREATE_JAP_EVENT,
    payload: {
      name,
      description,
      date,
      japPlace,
    },
  };
}
export function createJapEventSuccess() {
  return {
    type: CREATE_JAP_EVENT_SUCCESS,
  };
}
export function createJapEventError(err) {
  return {
    type: CREATE_JAP_EVENT_ERROR,
    err,
  };
}
