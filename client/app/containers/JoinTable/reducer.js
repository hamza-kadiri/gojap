/*
 *
 * JoinTable reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_TABLES,
  GET_TABLES_SUCCESS,
  GET_TABLES_ERROR,
} from './constants';

export const initialState = {
  tables: [],
};

/* eslint-disable default-case, no-param-reassign */
const joinTableReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_TABLES:
        draft.error = null;
        break;
      case GET_TABLES_SUCCESS:
        draft.tables = action.tables;
        break;
      case GET_TABLES_ERROR:
        draft.error = action.err;
        break;
    }
  });

export default joinTableReducer;
