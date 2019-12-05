import io from 'socket.io-client';
import config from '../config/config';

class SocketClient {
  constructor() {
    this.socket = io(config.socket_url);
    this.socket.on('connect', () => {
      console.log('connected lol');
      this.socket.emit('my event', { data: "I'm connected!" });
    });
  }
}

const socketClient = new SocketClient();

export default socketClient;
