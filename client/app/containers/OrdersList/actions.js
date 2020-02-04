/*
 *
 * OrdersList actions
 *
 */

import MESSAGES from 'utils/socketMessages';
import { LOAD_MENU, LOAD_MENU_SUCCESS, LOAD_MENU_ERROR } from './constants';

export function loadMenu(japPlaceId) {
  return {
    type: LOAD_MENU,
    japPlaceId,
  };
}
export function menuLoaded(menu) {
  return {
    type: LOAD_MENU_SUCCESS,
    menu,
  };
}

export function menuLoadingError(error) {
  return {
    type: LOAD_MENU_ERROR,
    error,
  };
}

export function changeOrderQuantity(itemId, index, individual, accumulated) {
  return {
    type: MESSAGES.CHOOSE_ITEM,
    itemId,
    individual,
    accumulated,
    index,
  };
}
