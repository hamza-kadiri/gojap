/*
 *
 * MembersList reducer
 *
 */
import produce from 'immer';
import {
  LOAD_MEMBERS,
  LOAD_MEMBERS_SUCCESS,
  LOAD_MEMBERS_ERROR,
} from './constants';

export const initialState = { members: [], loading: true, error: false };

/* eslint-disable default-case, no-param-reassign */
const membersListReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MEMBERS:
        draft.loading = true;
        draft.error = false;
        draft.members = [];
        break;

      case LOAD_MEMBERS_SUCCESS:
        draft.members = action.members;
        draft.loading = false;
        break;

      case LOAD_MEMBERS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default membersListReducer;
