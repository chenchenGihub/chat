import { AppRegistry } from 'react-native';
import storage  from './src/storage/store.js';

import DeviceInfo from 'react-native-device-info';
import io from 'socket.io-client';
import { port } from './src/utils/dev';

const socket = io(`ws://${port}`,{
transports: ['websocket'] 
});

global.storage=storage;
global.socket=socket;

import App from './App';

AppRegistry.registerComponent('chat', () => App);
