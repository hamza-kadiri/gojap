import { takeLatest, call, put } from 'redux-saga/effects';
import { LOAD_JAPS } from 'containers/HomePage/constants';
import { japsLoaded, japLoadingError } from 'containers/HomePage/actions';
import request from 'utils/request';

/**
 * Github japs request/response handler
 */
export function* getJaps() {
  // Select username from store

  const requestURL =
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=japonais a volonté&locale=fr_FR&latitude=48.754190&longitude=2.301974&radius=5000&categories=japanese&sort_by=distance';

  try {
    // Call our request helper (see 'utils/request')
    const japs = yield call(request, requestURL, {
      headers: new Headers({
        Authorization:
          'Bearer 9QUr4h4dpmNRs42nScaTD3bRZMnVvSV9oMqQ5moZZ3deAcpHC2ccuwhEdQnxTwBeby9ezCADeZEYV7tsCmTxZm3csDIM5NFisjxizCr8k36hJCi2xJGKXnCTjzvkXXYx',
        'Access-Control-Allow-Origin': '*',
      }),
    });
    yield put(japsLoaded(japs));
  } catch (err) {
    yield put(japLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* japsData() {
  // Watches for LOAD_JAPS actions and calls getJapswhen one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_JAPS, getJaps);
}
