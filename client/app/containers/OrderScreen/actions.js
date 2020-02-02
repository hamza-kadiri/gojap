/*
 *
 * OrderScreen actions
 *
 */

import MESSAGES from 'utils/socketMessages';
import {
  TOGGLE_RECAP,
  START_ORDER,
  CHANGE_CURRENT_ITEM_SUCCESS,
} from './constants';

export function toggleRecap(boolean) {
  return {
    type: TOGGLE_RECAP,
    payload: boolean,
  };
}

export function changeCurrentItem(item) {
  return {
    type: MESSAGES.NEXT_ITEM,
    payload: item,
  };
}

export function changedCurrentItem(data) {
  return {
    type: CHANGE_CURRENT_ITEM_SUCCESS,
    itemId: data.item_id,
    commandId: data.command_id,
  };
}

export function startOrder(bool) {
  return {
    type: START_ORDER,
    payload: bool,
  };
}
