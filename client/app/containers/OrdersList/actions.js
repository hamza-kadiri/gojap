/*
 *
 * OrdersList actions
 *
 */

import MESSAGES from 'utils/socketMessages';
import {
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR,
  CHANGE_ORDER_QUANTITY_SUCCESS,
} from './constants';

export function loadOrders() {
  return {
    type: LOAD_ORDERS,
  };
}
export function ordersLoaded(orders) {
  return {
    type: LOAD_ORDERS_SUCCESS,
    orders: orders.results,
  };
}

export function ordersLoadingError(error) {
  return {
    type: LOAD_ORDERS_ERROR,
    error,
  };
}

export function changeOrderQuantity({ itemId, individual }) {
  return {
    type: MESSAGES.CHOOSE_ITEM,
    itemId,
    individual,
  };
}

export function changedOrderQuantity({ itemId, individual, accumulated }) {
  return {
    type: CHANGE_ORDER_QUANTITY_SUCCESS,
    itemId,
    individual,
    accumulated,
  };
}
