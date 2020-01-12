/*
 *
 * Header actions
 *
 */

import { CHANGE_TITLE, CHANGE_MORE_MENU } from './constants';

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    payload: title,
  };
}

export function changeMoreMenu(array) {
  return {
    type: CHANGE_MORE_MENU,
    payload: array,
  };
}
