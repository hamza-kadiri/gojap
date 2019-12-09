"""Dict of possible messages."""

socket_messages = {
    #   CLIENTS ---> SERVER
  # master -> table users
  'START_COMMAND': 'Start Command',
  'END_COMMAND': 'End Command',
  'NEXT_ITEM': 'Next Item',
  # user -> table
  'CHOOSE_ITEM': 'Choose Item',
  # user -> jap
  'JOIN_JAP': 'Join Jap',
  'LEAVE_JAP': 'Leave Jap',
  'SEND_EVENT': 'Send Event',
  'JOIN_TABLE': 'Join Table',

  #   CLIENTS <---> SERVER

  #   SERVER ---> CLIENTS
  # specific table
  'COMMAND_STARTED': 'Command Started',
  'ITEM_CHANGED': 'Item changed',
  'COMMAND_ENDED': 'Command Ended',
  'ITEM_CHOSEN': 'Item Chosen',
  # all jap members
  'USER_LEFT_JAP': 'User Left Jap',
  'NEW_EVENT': 'New Event',
  'USER_JOINED_TABLE': 'User Joined Table',
  'USER_JOINED_JAP': 'User Joined Jap',
}