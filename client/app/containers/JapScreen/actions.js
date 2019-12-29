/*
 *
 * JapScreen actions
 *
 */

import { TOGGLE_RECAP, CHANGE_CURRENT_ITEM } from './constants';

export function toggleRecap(boolean) {
  return {
    type: TOGGLE_RECAP,
    payload: boolean,
  };
}

export function changeCurrentItem(itemIndex) {
  return {
    type: CHANGE_CURRENT_ITEM,
    payload: itemIndex,
  };
}
