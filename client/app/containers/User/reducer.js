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
  user: {
    username: null,
    id: null,
    achievements: null,
    avatar_url: null,
    phone: null,
    email: null,
    calorie: null,
  },
  japId: '',
  tableId: '',
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
        break;
      case LOGIN_ERROR:
        draft.loginLoading = false;
        draft.error = action.error;
        break;
      case CHANGE_JAP_ID:
        draft.japId = action.id;
        break;
      case CHANGE_TABLE_ID:
        draft.tableId = action.id;
        break;
      case CHANGE_IS_EMPEROR:
        draft.isEmperor = action.boolean;
        break;
      case LOGOUT:
        draft.user = initialState.user;
        draft.japId = initialState.japId;
        draft.tableId = initialState.ustableIder;
        draft.isEmperor = false;
        break;
    }
  });

export default userReducer;
