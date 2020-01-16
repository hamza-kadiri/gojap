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
};

/* eslint-disable default-case, no-param-reassign */
const addMembersPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USERS:
        draft.error = null;
        break;
      case LOAD_USERS_SUCCESS:
        draft.users = action.payload;
        break;
      case LOAD_USERS_ERROR:
        draft.error = action.payload;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default addMembersPageReducer;
