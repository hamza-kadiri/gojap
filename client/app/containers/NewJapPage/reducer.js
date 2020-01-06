/*
 *
 * NewJapPage reducer
 *
 */
import produce from 'immer';
import {
  POST_JAP_EVENT_REQUEST,
  POST_JAP_EVENT_SUCCESS,
  POST_JAP_EVENT_ERROR,
} from './constants';

export const initialState = {
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const newJapPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case POST_JAP_EVENT_REQUEST:
        draft.error = false;
        break;
      case POST_JAP_EVENT_SUCCESS:
        break;
      case POST_JAP_EVENT_ERROR:
        draft.error = action.payload;
        break;
    }
  });

export default newJapPageReducer;
