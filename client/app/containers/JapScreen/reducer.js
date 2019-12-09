/*
 *
 * JapScreen reducer
 *
 */
import produce from 'immer';
import { TOGGLE_RECAP } from './constants';

export const initialState = { recapOpen: false };

/* eslint-disable default-case, no-param-reassign */
const japScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_RECAP:
        draft.recapOpen = action.payload;
        break;
    }
  });

export default japScreenReducer;
