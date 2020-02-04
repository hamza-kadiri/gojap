/*
 *
 * LoginContainer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOGIN, LOGIN_SUCCESS } from './constants';

export const initialState = {
  login: {
    username: null,
    id: null,
    achievements: null,
    avatar_url: null,
    phone: null,
    email: null,
    calorie: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
const loginContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOGIN:
        break;
      case LOGIN_SUCCESS:
        draft.login = action.user;
        break;
    }
  });

export default loginContainerReducer;
