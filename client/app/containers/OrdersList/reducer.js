/*
 *
 * OrdersList reducer
 *
 */
import produce from 'immer';
import {
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const ordersListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_ORDERS:
        draft.loading = true;
        draft.error = false;
        draft.orders = [];
        break;

      case LOAD_ORDERS_SUCCESS:
        draft.orders = action.orders;
        draft.loading = false;
        break;

      case LOAD_ORDERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default ordersListReducer;
