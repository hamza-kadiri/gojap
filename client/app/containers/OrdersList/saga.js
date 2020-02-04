import { takeLatest, call, put } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import { LOAD_MENU } from './constants';
import { menuLoaded, menuLoadingError } from './actions';
import { START_ORDER } from '../OrderScreen/constants';

/**
 * Menu request/response handler
 */
export function* getMenu(action) {
  const requestUrl = `jap_place/menu/${action.japPlaceId}`;

  try {
    // Call our request helper (see 'utils/request')
    const menu = yield call(request, api, requestUrl);
    yield put(menuLoaded(menu));
  } catch (err) {
    yield put(menuLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* ordersData() {
  yield takeLatest(LOAD_MENU, getMenu);
  yield takeLatest(START_ORDER, getMenu);
}
