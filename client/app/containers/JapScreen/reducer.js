/*
 *
 * JapScreen reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_JAP,
  GET_JAP_SUCCESS,
  GET_JAP_ERROR,
  CHANGE_JAP_MEMBERS,
} from './constants';

export const initialState = {
  error: null,
  jap: null,
};

/* eslint-disable default-case, no-param-reassign */
const japScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_JAP:
        draft.error = null;
        draft.jap = null;
        draft.table = null;
        break;
      case GET_JAP_SUCCESS:
        draft.jap = action.jap_event;
        draft.table = action.table;
        break;
      case GET_JAP_ERROR:
        draft.error = action.error;
        break;
      case CHANGE_JAP_MEMBERS:
        draft.onlineMembers = action.payload.members;
        draft.lastMember = action.payload.new_member;
    }
  });

export default japScreenReducer;
