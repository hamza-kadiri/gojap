/*
 *
 * NewJapPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  CREATE_JAP_EVENT,
  GET_JAP_PLACES,
  GET_JAP_PLACES_SUCCESS,
  GET_JAP_PLACES_ERROR,
  CREATE_JAP_EVENT_SUCCESS,
  CREATE_JAP_EVENT_ERROR,
} from './constants';

export const initialState = {
  japPlaces: [],
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const newJapPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CREATE_JAP_EVENT:
        break;
      case CREATE_JAP_EVENT_SUCCESS:
        break;
      case CREATE_JAP_EVENT_ERROR:
        draft.error = action.err;
        break;
      case GET_JAP_PLACES:
        draft.error = null;
        break;
      case GET_JAP_PLACES_SUCCESS:
        draft.japPlaces = action.japPlaces.jap_places;
        break;
      case GET_JAP_PLACES_ERROR:
        draft.error = action.err;
        break;
    }
  });

export default newJapPageReducer;
