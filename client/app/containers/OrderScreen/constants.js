/*
 *
 * OrderScreen constants
 *
 */

export const TOGGLE_RECAP = 'app/OrderScreen/TOGGLE_RECAP';
export const START_ORDER = 'app/OrderScreen/START_ORDER';
export const CHANGE_CURRENT_ITEM_SUCCESS =
  'app/OrderScreen/CHANGE_CURRENT_ITEM_SUCCESS';
export const LOAD_ORDERS = 'app/OrderScreen/LOAD_ORDERS';
export const LOAD_ORDERS_SUCCESS = 'app/OrderScreen/LOAD_SUCCESS';
export const LOAD_ORDERS_ERROR = 'app/OrderScreen/LOAD_ERROR';

export const MESSAGES = {
  //   CLIENTS ---> SERVER
  // master -> table users
  START_COMMAND: 'Start Command',
  END_COMMAND: 'End Command',
  NEXT_ITEM: 'Next Item',
  // user -> table
  CHOOSE_ITEM: 'Choose Item',
  // user -> jap
  JOIN_JAP: 'Join Jap',
  LEAVE_JAP: 'Leave Jap',
  SEND_EVENT: 'Send Event',
  JOIN_TABLE: 'Join Table',

  //   CLIENTS <---> SERVER

  //   SERVER ---> CLIENTS
  // specific table
  COMMAND_STARTED: 'Command Started',
  ITEM_CHANGED: 'Item changed',
  COMMAND_ENDED: 'Command Ended',
  ITEM_CHOSEN: 'Item Chosen',
  // all jap members
  USER_LEFT_JAP: 'User Left Jap',
  NEW_EVENT: 'New Event',
  USER_JOINED_TABLE: 'User Joined Table',
  USER_JOINED_JAP: 'User Joined Jap',
};
