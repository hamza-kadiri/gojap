/* eslint-disable indent */
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
  CHANGE_ORDER_QUANTITY_SUCCESS,
} from './constants';

export const initialState = { orders: [], loading: true, error: false };

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
      case CHANGE_ORDER_QUANTITY_SUCCESS:
        draft.orders = state.orders;
        console.log(action.itemId);
        draft.orders[action.itemId] = {
          ...draft.orders[action.itemId],
          individual: action.individual,
          accumulated: action.accumulated,
        };
        break;
    }
  });

export default ordersListReducer;
