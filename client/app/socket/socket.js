import io from 'socket.io-client';
import { SOCKET_URL, MESSAGES } from './constants';

class SocketClient {
  constructor() {
    this.socket = io(SOCKET_URL);

    // Default events
    this.socket.on('connect', this.onConnect);
    this.socket.on('disconnect', this.onDisconnect);
    this.socket.on(MESSAGES.USER_JOINED_JAP, data =>
      this.handlers.userJoinedJapHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.socket.on(MESSAGES.USER_LEFT_JAP, data =>
      this.handlers.userLeftJapHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.socket.on(MESSAGES.USER_JOINED_TABLE, data =>
      this.handlers.userJoinedTableHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.socket.on(MESSAGES.COMMAND_STARTED, data =>
      this.handlers.commandStartedHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.socket.on(MESSAGES.COMMAND_ENDED, data =>
      this.handlers.commandEndedHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.socket.on(MESSAGES.ITEM_CHANGED, data =>
      this.handlers.itemChangedHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.socket.on(MESSAGES.ITEM_CHOSEN, data =>
      this.handlers.itemChosenHandlers.forEach(fn => {
        fn(data);
      })
    );
    this.handlers = {
      userJoinedJapHandlers: [],
      userLeftJapHandlers: [],
      userJoinedTableHandlers: [],
      commandStartedHandlers: [],
      itemChangedHandlers: [],
      commandEndedHandlers: [],
      itemChosenHandlers: [],
      newEventHandlers: [],
    };
    return this;
  }

  onConnect = () => {
    console.log(`Connection successfull to ${SOCKET_URL}`);
  };

  onDisconnect = () => {
    console.log(`Just disconnected of ${SOCKET_URL}`);
  };

  emitMessage = (type, message) => {
    console.log(`message with type ${type} and content ${message} emitted`);
    this.socket.emit(type, message);
  };

  subscribeToEvent = (eventName, handler, subscriber) => {
    switch (eventName) {
      case MESSAGES.USER_JOINED_JAP:
        this.handlers.userJoinedJapHandlers.push(handler);
        break;
      case MESSAGES.USER_LEFT_JAP:
        this.handlers.userLeftJapHandlers.push(handler);
        break;
      case MESSAGES.USER_JOINED_TABLE:
        this.handlers.userJoinedTableHandlers.push(handler);
        break;
      case MESSAGES.COMMAND_STARTED:
        this.handlers.commandStartedHandlers.push(handler);
        break;
      case MESSAGES.COMMAND_ENDED:
        this.handlers.commandEndedHandlers.push(handler);
        break;
      case MESSAGES.ITEM_CHANGED:
        this.handlers.itemChangedHandlers.push(handler);
        break;
      case MESSAGES.ITEM_CHOSEN:
        this.handlers.itemChosenHandlers.push(handler);
        break;
      case MESSAGES.NEW_EVENT:
        this.handlers.newEventHandlers.push(handler);
        break;
      default:
        console.log(
          `Component [${subscriber}] attempted to subscribe to unexpected event [${eventName}].`
        );
    }
    // console.log(`Component [${subscriber}] subscribed to ${eventName}.`);
  };

  unsubscribeToEvent = (eventName, handler, subscriber) => {
    switch (eventName) {
      case MESSAGES.USER_JOINED_JAP:
        this.handlers.userJoinedJapHandlers = this.handlers.userJoinedJapHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.USER_LEFT_JAP:
        this.handlers.userLeftJapHandlers = this.handlers.userLeftJapHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.USER_JOINED_TABLE:
        this.handlers.userJoinedTableHandlers = this.handlers.userJoinedTableHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.COMMAND_STARTED:
        this.handlers.commandStartedHandlers = this.handlers.commandStartedHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.COMMAND_ENDED:
        this.handlers.commandEndedHandlers = this.handlers.commandEndedHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.ITEM_CHANGED:
        this.handlers.itemChangedHandlers = this.handlers.itemChangedHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.ITEM_CHOSEN:
        this.handlers.itemChosenHandlers = this.handlers.itemChosenHandlers.filter(
          fn => fn !== handler
        );
        break;
      case MESSAGES.NEW_EVENT:
        this.handlers.newEventHandlers = this.handlers.newEventHandlers.filter(
          fn => fn !== handler
        );
        break;
      default:
        console.log(
          `Component [${subscriber}] attempted to unsubscribe to unexpected event [${eventName}].`
        );
    }
    // console.log(`Component [${subscriber}] unsubscribed to ${eventName}.`);
  };
}
export default SocketClient;
