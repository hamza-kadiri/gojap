const MESSAGES = {
  // CLIENTS ---> SERVER
  // master -> table users
  START_COMMAND: 'start_command',
  END_COMMAND: 'end_command',
  NEXT_ITEM: 'next_item',
  // user -> table
  CHOOSE_ITEM: 'choose_item',
  // user -> jap
  JOIN_JAP: 'join_jap',
  LEAVE_JAP: 'leave_jap',
  SEND_EVENT: 'send_event',
  JOIN_TABLE: 'join_table',
  JOIN_COMMAND: 'join_command',

  //   CLIENTS <---> SERVER

  //   SERVER ---> CLIENTS
  // specific table
  COMMAND_STARTED: 'command_started',
  ITEM_CHANGED: 'item_changed',
  COMMAND_ENDED: 'command_ended',
  ITEM_CHOSEN: 'item_chosen',
  // all jap members
  USER_LEFT_JAP: 'user_left_jap',
  NEW_EVENT: 'new_event',
  USER_JOINED_TABLE: 'user_joined_table',
  USER_JOINED_JAP: 'user_joined_jap',
  DISCONECT: 'disconnect',
};

export default MESSAGES;
