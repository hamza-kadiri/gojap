/*
 *
 * OrderScreen reducer
 *
 */
import produce from 'immer';
import OrderListReducer, {
  initialState as ordersListInitialState,
} from 'containers/OrdersList/reducer';
import { combineReducers } from 'redux';

import {
  TOGGLE_RECAP,
  CHANGE_CURRENT_ITEM_SUCCESS,
  START_ORDER,
} from './constants';

export const initialState = {
  order: { currentItem: { index: 0 } },
  ordersList: ordersListInitialState,
  recap: { recapOpen: false },
};

/* eslint-disable default-case, no-param-reassign */
const orderReducer = (state = initialState.order, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_ORDER:
        draft.currentItem = { index: 0 };
        break;
      case CHANGE_CURRENT_ITEM_SUCCESS:
        draft.currentItem = { index: action.itemId };
        draft.currentCommandId = action.commandId;
        break;
    }
  });

const recapOpenReducer = (state = initialState.recap, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_RECAP:
        draft.recapOpen = action.payload;
        break;
    }
  });

const OrderScreenReducer = combineReducers({
  order: orderReducer,
  ordersList: OrderListReducer,
  recap: recapOpenReducer,
});
export default OrderScreenReducer;
