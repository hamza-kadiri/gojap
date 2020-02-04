/* eslint-disable indent */
/*
 *
 * OrdersList reducer
 *
 */
import produce from 'immer';
import { LOAD_MENU, LOAD_MENU_SUCCESS, LOAD_MENU_ERROR } from './constants';

export const initialState = {
  menu: { items: [] },
  loading: true,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const ordersListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MENU:
        draft.loading = true;
        draft.error = false;
        draft.menu = [];
        break;

      case LOAD_MENU_SUCCESS:
        draft.menu = action.menu;
        draft.loading = false;
        break;

      case LOAD_MENU_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default ordersListReducer;
