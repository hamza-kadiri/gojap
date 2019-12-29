/*
 *
 * JapScreen reducer
 *
 */
import produce from 'immer';
import { TOGGLE_RECAP, CHANGE_CURRENT_ITEM } from './constants';

export const initialState = { recapOpen: false, currentItem: 0 };

/* eslint-disable default-case, no-param-reassign */
const japScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_RECAP:
        draft.recapOpen = action.payload;
        break;
      case CHANGE_CURRENT_ITEM:
        draft.currentItem = action.payload;
        break;
    }
  });

export default japScreenReducer;
