import { AppRegistry } from 'react-native';
import storage  from './src/storage/store.js';

import DeviceInfo from 'react-native-device-info';
import io from 'socket.io-client';
const socket = io('ws://192.168.0.100:8088',{
transports: ['websocket'] 
});

global.storage=storage;
global.socket=socket;

import App from './App';

AppRegistry.registerComponent('chat', () => App);
