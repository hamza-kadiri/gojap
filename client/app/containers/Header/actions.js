/*
 *
 * Header actions
 *
 */

import { CHANGE_TITLE, CHANGE_MORE_MENU, CHANGE_SUBTITLE } from './constants';

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    payload: title,
  };
}

export function changeSubtitle(subtitle) {
  return {
    type: CHANGE_SUBTITLE,
    payload: subtitle,
  };
}

export function changeMoreMenu(array) {
  return {
    type: CHANGE_MORE_MENU,
    payload: array,
  };
}
