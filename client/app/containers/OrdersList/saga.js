import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { LOAD_ORDERS } from './constants';
import { ordersLoaded, ordersLoadingError } from './actions';
import { START_ORDER } from '../JapScreen/constants';

/**
 * Orders request/response handler
 */
export function* getOrders() {
  // Select username from store

  const requestUrl = 'orders';
  console.log(request);

  try {
    // Call our request helper (see 'utils/request')
    const orders = yield call(request, api, requestUrl, {});
    yield put(ordersLoaded(orders));
  } catch (err) {
    yield put(ordersLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ordersData() {
  yield takeLatest(LOAD_ORDERS, getOrders);
  yield takeLatest(START_ORDER, getOrders);
}
