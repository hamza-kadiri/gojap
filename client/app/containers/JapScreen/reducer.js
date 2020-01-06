/*
 *
 * JapScreen reducer
 *
 */
import produce from 'immer';
import { TOGGLE_RECAP, CHANGE_CURRENT_ITEM_SUCCESS } from './constants';

export const initialState = { recapOpen: false, currentItem: { index: 0 } };

/* eslint-disable default-case, no-param-reassign */
const japScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_RECAP:
        draft.recapOpen = action.payload;
        break;
      case CHANGE_CURRENT_ITEM_SUCCESS:
        draft.currentItem = { index: action.payload };
        break;
    }
  });

export default japScreenReducer;
