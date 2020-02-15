import { takeLatest, call, put, select } from 'redux-saga/effects';
import request, { api } from 'utils/request';
import moment from 'moment';
import history from 'utils/history';
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
  const requestURL = 'jap_event';
  const userId = yield select(makeSelectUserId());
  const body = {
    event_name: name,
    description,
    date: moment(date).format(),
    jap_place_id: japPlace,
    creator_id: userId,
  };

  try {
    yield call(request, api.post, requestURL, { json: body });
    yield put(createJapEventSuccess());
    history.goBack();
  } catch (err) {
    yield put(createJapEventError(err));
  }
}

export function* getJapPlaces() {
  const requestURL = 'jap_place/all';

  try {
    const japPlaces = yield call(request, api, requestURL);
    yield put(getJapPlacesSuccess(japPlaces));
  } catch (err) {
    yield put(getJapPlacesError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchNewJapPage() {
  yield takeLatest(GET_JAP_PLACES, getJapPlaces);
  yield takeLatest(CREATE_JAP_EVENT, createJap);
}
