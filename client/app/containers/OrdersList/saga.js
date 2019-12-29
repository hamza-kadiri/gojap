import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_ORDERS } from './constants';
import { ordersLoaded, ordersLoadingError } from './actions';

/**
 * Orders request/response handler
 */
export function* getOrders() {
  // Select username from store

  const requestUrl =
    'https://api.unsplash.com/search/photos/?client_id=75ed61a96d5bcfb22dd5f0f4c3b083a2c0fcd3969b5509b0b1d435aaa32bc3a3&query=sushi&per_page=30';

  try {
    // Call our request helper (see 'utils/request')
    const orders = yield call(request, requestUrl, {});
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
}
