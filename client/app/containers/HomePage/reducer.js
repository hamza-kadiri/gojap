/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import { LOAD_JAPS, LOAD_JAPS_ERROR, LOAD_JAPS_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  error: false,
  japs: [],
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_JAPS:
        draft.loading = true;
        draft.error = false;
        draft.japs = false;
        break;

      case LOAD_JAPS_SUCCESS:
        draft.japs = action.japs.businesses;
        draft.loading = false;
        break;

      case LOAD_JAPS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });
export default homePageReducer;
