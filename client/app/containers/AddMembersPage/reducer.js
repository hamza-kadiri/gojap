/*
 *
 * AddMembersPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_USERS_SUCCESS,
  LOAD_USERS_ERROR,
  LOAD_USERS,
} from './constants';

export const initialState = {
  users: [],
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const addMembersPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USERS:
        draft.error = false;
        draft.loading = true;
        break;
      case LOAD_USERS_SUCCESS:
        draft.users = action.payload;
        draft.loading = false;
        draft.error = false;
        break;
      case LOAD_USERS_ERROR:
        draft.error = action.payload;
        draft.loading = false;
        draft.users = [];
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default addMembersPageReducer;
