/*
 *
 * User reducer
 *
 */
import produce from 'immer';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHANGE_TABLE_ID,
  CHANGE_JAP_ID,
} from './constants';

export const initialState = {
  user: {
    username:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
  },
  japId: '',
  tableId: '',
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        draft.user = action.user;
        break;
      case LOGIN_ERROR:
        draft.error = action.error;
        break;
      case CHANGE_JAP_ID:
        draft.japId = action.id;
        break;
      case CHANGE_TABLE_ID:
        draft.tableId = action.id;
        break;
    }
  });

export default userReducer;
