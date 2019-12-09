/*
 *
 * OrdersList actions
 *
 */

import {
  LOAD_ORDERS,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_ERROR,
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
