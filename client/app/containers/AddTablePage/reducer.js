/*
 *
 * AddTablePage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ADD_TABLE, ADD_TABLE_ERROR } from './constants';

export const initialState = {
  error: null,
};

/* eslint-disable default-case, no-param-reassign */
const addTablePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ADD_TABLE:
        draft.error = null;
        break;
      case ADD_TABLE_ERROR:
        draft.error = action.err;
        break;
    }
  });

export default addTablePageReducer;
