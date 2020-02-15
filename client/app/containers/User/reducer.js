/*
 *
 * User reducer
 *
 */
import produce from 'immer';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CHANGE_TABLE_ID,
  CHANGE_JAP_ID,
  CHANGE_IS_EMPEROR,
  LOGOUT,
} from './constants';

export const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  japId: JSON.parse(localStorage.getItem('japId')) || null,
  tableId: JSON.parse(localStorage.getItem('tableId')) || null,
  isEmperor: JSON.parse(localStorage.getItem('isEmperor')) || false,
  error: false,
  loginLoading: false,
  loginError: false,
};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.loginLoading = true;
        draft.loginError = false;
        break;
      case LOGIN_SUCCESS:
        draft.user = action.user;
        draft.loginLoading = false;
        draft.loginError = false;
        localStorage.setItem('user', JSON.stringify(action.user));
        break;
      case LOGIN_ERROR:
        draft.loginLoading = false;
        draft.error = action.error;
        break;
      case CHANGE_JAP_ID:
        draft.japId = action.id;
        localStorage.setItem('japId', JSON.stringify(action.id));
        break;
      case CHANGE_TABLE_ID:
        draft.tableId = action.id;
        localStorage.setItem('tableId', JSON.stringify(action.id));
        break;
      case CHANGE_IS_EMPEROR:
        draft.isEmperor = action.boolean;
        localStorage.setItem('isEmperor', JSON.stringify(action.boolean));
        break;
      case LOGOUT:
        draft.user = null;
        draft.japId = initialState.japId;
        draft.tableId = initialState.tableId;
        draft.isEmperor = false;
        break;
    }
  });

export default userReducer;
