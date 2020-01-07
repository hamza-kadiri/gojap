"""Dict of possible messages."""

socket_messages = {
    #   CLIENTS ---> SERVER
  # master -> table users
  'START_COMMAND': 'start_command',
  'END_COMMAND': 'end_command',
  'NEXT_ITEM': 'next_item',
  # user -> table
  'CHOOSE_ITEM': 'choose_item',
  # user -> jap
  'JOIN_JAP': 'join_jap',
  'LEAVE_JAP': 'leave_jap',
  'SEND_EVENT': 'send_event',
  'JOIN_TABLE': 'join_table',

  #   CLIENTS <---> SERVER

  #   SERVER ---> CLIENTS
  # specific table
  'COMMAND_STARTED': 'command_started',
  'ITEM_CHANGED': 'item_changed',
  'COMMAND_ENDED': 'Command Ended',
  'ITEM_CHOSEN': 'Item Chosen',
  # all jap members
  'USER_LEFT_JAP': 'User Left Jap',
  'NEW_EVENT': 'New Event',
  'USER_JOINED_TABLE': 'User Joined Table',
  'USER_JOINED_JAP': 'User Joined Jap',
}