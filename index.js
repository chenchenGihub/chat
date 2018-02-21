import { AppRegistry } from 'react-native';
import storage  from './src/storage/store.js';
import io from 'socket.io-client'
import DeviceInfo from 'react-native-device-info';
const socket = io('ws://192.168.1.104:8088')

global.storage=storage;
global.socket=socket;

import App from './App';

AppRegistry.registerComponent('chat', () => App);
