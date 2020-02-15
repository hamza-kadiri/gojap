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
  loading: false,
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
        draft.japPlaces = [];
        draft.loading = true;
        draft.error = false;
        break;
      case GET_JAP_PLACES_SUCCESS:
        draft.japPlaces = action.japPlaces;
        draft.loading = false;
        draft.error = false;
        break;
      case GET_JAP_PLACES_ERROR:
        draft.japPlaces = [];
        draft.loading = false;
        draft.error = action.err;
        break;
    }
  });

export default newJapPageReducer;
