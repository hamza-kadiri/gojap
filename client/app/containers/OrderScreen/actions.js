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
  JOINED_TABLE,
  CHANGE_ORDER_QUANTITY_SUCCESS,
  INITIALIZE_ORDER_QUANTITIES,
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

export function joinedTable(data) {
  return {
    type: JOINED_TABLE,
    itemId: data.current_command.item_id,
    index: data.index,
    commandId: data.current_command.id,
  };
}

export function changedCurrentItem(data) {
  return {
    type: CHANGE_CURRENT_ITEM_SUCCESS,
    itemId: data.item_id,
    index: data.index,
    commandId: data.command_id,
  };
}

export function startOrder(japPlaceId) {
  return {
    type: START_ORDER,
    japPlaceId,
  };
}

export function changedOrderQuantity(
  { item_id, index, accumulated, command_id, summary },
  userId
) {
  const userCommand = summary.users.filter(
    command => command.user.id === userId
  )[0];
  const individual = userCommand ? userCommand.order_amount : 0;
  return {
    type: CHANGE_ORDER_QUANTITY_SUCCESS,
    itemId: item_id,
    index,
    commandId: command_id,
    accumulated,
    individual,
  };
}

export function initializeOrderQuantity(commandSummary) {
  return {
    type: INITIALIZE_ORDER_QUANTITIES,
    commandSummary,
  };
}
