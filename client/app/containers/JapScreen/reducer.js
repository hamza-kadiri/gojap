/*
 *
 * JapScreen reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_JAP,
  GET_JAP_SUCCESS,
  GET_JAP_ERROR,
} from './constants';

export const initialState = {
  error: null,
  jap: null,
};

/* eslint-disable default-case, no-param-reassign */
const japScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_JAP:
        draft.error = null;
        draft.jap = null;
        break;
      case GET_JAP_SUCCESS:
        draft.jap = action.jap;
        break;
      case GET_JAP_ERROR:
        draft.error = action.error;
        break;
    }
  });

export default japScreenReducer;
