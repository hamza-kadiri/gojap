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
  JOINED_TABLE,
  CHANGE_ORDER_QUANTITY_SUCCESS,
} from './constants';

export const initialState = {
  order: { currentItem: { index: 1 } },
  ordersList: ordersListInitialState,
  recap: { recapOpen: false },
};

/* eslint-disable default-case, no-param-reassign */
const orderReducer = (state = initialState.order, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_ORDER:
        draft.currentItem = { index: 0 };
        draft.currentCommandId = 1;
        break;
      case JOINED_TABLE:
        draft.currentItem = { index: action.index, itemId: action.itemId };
        draft.currentCommandId = action.commandId;
        break;
      case CHANGE_CURRENT_ITEM_SUCCESS:
        draft.currentItem = { index: action.index, itemId: action.itemId };
        draft.currentCommandId = action.commandId;
        break;
      case CHANGE_ORDER_QUANTITY_SUCCESS:
        draft.currentItem = {
          itemId: action.itemId,
          index: action.index,
          individual: action.individual,
          accumulated: action.accumulated,
        };
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
