/*
 *
 * Header reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import { CHANGE_TITLE, CHANGE_SUBTITLE, CHANGE_MORE_MENU } from './constants';

export const initialState = {
  currentKey: '/',
  title: '',
  subtitle: '',
  moreMenu: [],
};

/* eslint-disable default-case, no-param-reassign */
const headerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOCATION_CHANGE:
        return {
          ...initialState,
          currentKey: action.payload.location.pathname.split('/')[1] || '/',
        };
      case CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case CHANGE_SUBTITLE:
        draft.subtitle = action.payload;
        break;
      case CHANGE_MORE_MENU:
        draft.moreMenu = action.payload;
        break;
    }
  });

export default headerReducer;
