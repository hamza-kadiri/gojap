/*
 *
 * DashboardPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_STATS,
  GET_STATS_ERROR,
  GET_STATS_SUCCESS,
} from './constants';

export const initialState = {
  stats: {}
};

/* eslint-disable default-case, no-param-reassign */
const dashboardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_STATS:
        draft.error = null;
        break;
      case GET_STATS_ERROR:
        draft.error = action.err;
        break;
      case GET_STATS_SUCCESS:
        draft.stats = action.stats.stats;
        break;
    }
  });

export default dashboardPageReducer;
