import { takeLatest, call, put, select } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import moment from 'moment';

import { makeSelectUserId } from 'containers/User/selectors';
import { CREATE_JAP_EVENT, GET_JAP_PLACES } from './constants';

import {
  getJapPlacesSuccess,
  getJapPlacesError,
  createJapEventSuccess,
  createJapEventError,
} from './actions';

/**
 * Japs request/response handler
 */
export function* createJap(action) {
  // Select username from store

  const { name, description, date, japPlace } = action.payload;
  console.log(action);
  const requestURL = 'jap_event';
  const userId = yield select(makeSelectUserId());
  console.log('SAGA');
  console.log(userId);
  const body = {
    event_name: name,
    description,
    date: moment(date).format(),
    jap_place_id: japPlace,
    created_by: userId,
  };

  try {
    yield call(request, api.post, requestURL, { json: body });
    yield put(createJapEventSuccess());
  } catch (err) {
    yield put(createJapEventError(err));
  }
}

export function* getJapPlaces() {
  const requestURL = 'jap_place/all';

  try {
    const japPlaces = yield call(request, api, requestURL);
    console.log(japPlaces);
    yield put(getJapPlacesSuccess(japPlaces));
  } catch (err) {
    yield put(getJapPlacesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchSaga() {
  yield takeLatest(CREATE_JAP_EVENT, createJap);
  yield takeLatest(GET_JAP_PLACES, getJapPlaces);
}
